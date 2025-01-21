import {
  AdminHeader,
  Button,
  CheckboxButton,
  FileUpload,
  Input,
  Select,
} from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useGetAllPaymentMethodsSelector,
  useGetAllPetSelector,
  useGetPetInfoSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { getAllPaymentMethods } from "@/services/paymentMethods/paymentMethods";
import { addPet, deletePet, getAllPet, getPetInfo } from "@/services/pet/pet";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { InfoCard } from "../../components";
const initialValues = {
  name: "",
  type: "",
  breed: "",
  weight: "",
  vaccine_proof: "",
  paymentMethodId: "",
  photo: "",
};
const validationSchema = Yup.object({
  type: Yup.string().required("Required!"),
  breed: Yup.string().required("Required!"),
  weight: Yup.number().required("Required!"),
  vaccine_proof: Yup.number().required("Required!"),
});
const validationSchema2 = Yup.object({
  type: Yup.string().required("Required!"),
  breed: Yup.string().required("Required!"),
  weight: Yup.number().required("Required!"),
  paymentMethodId: Yup.number().required("Required!"),
  vaccine_proof: Yup.number().required("Required!"),
});
const PetManage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethodsState, setPaymentMethodsState] = useState([]);
  const dispatch = useAppDispatch();
  const res = useGetAllPetSelector();
  const { loading, data } = useGetAllAssetSelector();
  const paymentMethods = useGetAllPaymentMethodsSelector();
  const userInfo = useGetUserSelector();
  const petInfo = useGetPetInfoSelector();
  const onSubmit = (values, { resetForm }) => {
    dispatch(addPet(values));
    setMapPreview(null);
    setMapPreview2(null);
    setIsChecked(false);
    resetForm();
  };

  useEffect(() => {
    if (
      paymentMethods &&
      paymentMethods.data &&
      paymentMethods.data.length > 0
    ) {
      const temp = paymentMethods.data
        .filter((item) => {
          if (item.type === "Card") {
            return item;
          }
        })
        .map((elem) => {
          return {
            label: `End With ${elem.number}`,
            value: elem.paymentMethodId,
          };
        });
      setPaymentMethodsState(temp);
    }
  }, [paymentMethods]);

  useEffect(() => {
    dispatch(getAllPet());
    dispatch(getAllAsset());
    dispatch(getPetInfo());
    dispatch(getAllPaymentMethods());
  }, []);
  useScrollToTop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [mapPreview, setMapPreview] = useState(null);
  const [mapPreview2, setMapPreview2] = useState(null);
  const [petId, setPetId] = useState(null);

  const openModal = (id) => {
    setPetId(id);
    setIsModalOpen(true);
  };
  const openModal2 = (id) => {
    setPetId(id);
    setIsModalOpen2(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Pet Manager"} />
      <div className="w-full p-4 space-y-10">
        {res.loading ? (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : res?.data?.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-6 place-items-start">
            {res?.data?.map((item) => {
              return (
                <InfoCard
                  petId={petId}
                  itemPetId={item.petId}
                  closeModal={closeModal}
                  isModalOpen={isModalOpen}
                  isModalOpen2={isModalOpen2}
                  closeModal2={closeModal2}
                  onClick={() => {
                    Swal.fire({
                      title: "Are You Sure?",
                      showDenyButton: true,
                      confirmButtonText: "Ok",
                      denyButtonText: `Cancel`,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        dispatch(deletePet(item.petId));
                      }
                    });
                  }}
                  key={item.petId}
                  isCloseBtn={true}
                  title={item.type}
                  name={item.name}
                  asset={item.vaccine_proof}
                  photo={item.photo}
                  className={"flex justify-center items-center space-x-8"}
                >
                  {item.permit_number && (
                    <div className="bg-green-500 p-4 flex flex-col justify-center items-center text-white font-medium">
                      <p>Permit</p>
                      {item.permit_number}
                    </div>
                  )}
                  <ul className="md:list-disc">
                    <li>Breed- {item.breed} </li>
                    <li>Weight: {item.weight}lbs</li>
                    {item.vaccine_proof && (
                      <li
                        onClick={() => openModal(item.petId)}
                        className="underline cursor-pointer"
                      >
                        See Vaccine Proof
                      </li>
                    )}
                    {item.photo && (
                      <li
                        onClick={() => openModal2(item.petId)}
                        className="underline cursor-pointer"
                      >
                        See Pet Photo
                      </li>
                    )}
                  </ul>
                </InfoCard>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[20vh] flex justify-center items-center">
            {" "}
            No pet added yet...{" "}
          </div>
        )}
        <div className="space-y-5">
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add New Pet"}
          </Button>
          {showForm && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={
                userInfo && userInfo.data && userInfo.data.residentOfApt
                  ? validationSchema2
                  : validationSchema
              }
            >
              {({ setValues, setFieldValue, values, touched, errors }) => {
                useEffect(() => {
                  if (
                    userInfo &&
                    userInfo.data &&
                    userInfo.data.residentOfApt
                  ) {
                    setValues({
                      paymentMethodId: paymentMethodsState[0]?.value,
                    });
                  }
                }, []);
                return (
                  <Form className="space-y-5 border border-blue-600 p-4">
                    <div>
                      <h2 className="text-lg font-semibold flex justify-start items-center space-x-2">
                        <span>Pet Charge Details</span>
                      </h2>
                      <hr />
                    </div>
                    {petInfo &&
                      petInfo.data &&
                      Object.keys(petInfo.data).length > 0 && (
                        <ul className="list-disc px-4">
                          <li>
                            {" "}
                            Pet Rent(Monthly): $
                            {petInfo?.data?.pet_monthly_rent}
                            {"  (Applicable from Next Month)"}
                          </li>
                          <li>
                            {" "}
                            Pet Fee One-time (Non-Refundable): $
                            {petInfo?.data?.pet_one_time_fee}{" "}
                          </li>
                          <li>
                            {" "}
                            Pet Security Deposit (Refundable): $
                            {petInfo?.data?.pet_security_deposit}{" "}
                          </li>

                          {petInfo?.data?.prorated_range_text &&
                            petInfo?.data?.prorated_monthly_rent && (
                              <li>
                                {" "}
                                {petInfo?.data?.prorated_range_text}: $
                                {petInfo?.data?.prorated_monthly_rent}
                              </li>
                            )}
                          {petInfo?.data?.pet_policy_pdf && (
                            <li className="">
                              <a
                                target="_blank"
                                href={`${config.url.ASSET_URL}${petInfo?.data?.pet_policy_pdf?.link}`}
                                className="text-red-600 underline underline-offset-2"
                              >
                                View Pet Policy
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    <div className="md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                      <Input
                        label={"Pet Name (Optional)"}
                        placeholder={"Tommy"}
                        name={"name"}
                        className={"py-2 px-2 bg-white"}
                      />
                      <Select
                        name={"type"}
                        required={true}
                        label={"Pet Type"}
                        options={[
                          {
                            label: "Select Pet",
                            value: "",
                          },
                          {
                            value: "Dog",
                            label: "Dog",
                          },
                          {
                            value: "Cat",
                            label: "Cat",
                          },
                          {
                            value: "Others",
                            label: "Others",
                          },
                        ]}
                        className={"w-full px-2 py-2.5"}
                        parentClassName={"w-full px-0 py-0"}
                      />
                      <Input
                        required={true}
                        label={"Breed"}
                        placeholder={"Bulldog"}
                        name={"breed"}
                        className={"py-2 px-2 bg-white"}
                      />
                      <Input
                        required={true}
                        label={"Weight"}
                        placeholder={"20lbs"}
                        type="number"
                        name={"weight"}
                        className={"py-2 px-2 bg-white"}
                      />
                    </div>
                    <div className="w-full grid grid-cols-4 gap-6">
                      <FileUpload
                        label={"Pet Vaccine Photo"}
                        placeholder={
                          mapPreview ? "1 Photo Uploaded" : "Upload File"
                        }
                        required={true}
                        name="vaccine_proof"
                        data={data}
                        loading={loading}
                        touched={touched.vaccine_proof}
                        errors={errors.vaccine_proof}
                        id={"vaccine_proof"}
                        accept={"image/jpeg, image/png, image/jpg, image/webp"}
                        setPreview={setMapPreview}
                        setFieldValue={setFieldValue}
                        parentClassName={"w-full"}
                        className={"w-full pr-5"}
                      />
                      <FileUpload
                        label={"Pet Photo (Optional)"}
                        placeholder={
                          mapPreview2 ? "1 Photo Uploaded" : "Upload File"
                        }
                        name="photo"
                        data={data}
                        loading={loading}
                        touched={touched.photo}
                        errors={errors.photo}
                        id={"photo"}
                        accept={"image/jpeg, image/png, image/jpg, image/webp"}
                        setPreview={setMapPreview2}
                        setFieldValue={setFieldValue}
                        parentClassName={"w-full"}
                        className={"w-full pr-5 border-blue-600"}
                      />
                    </div>
                    <CheckboxButton
                      label="Accepts pet policy"
                      checked={isChecked ? true : false}
                      parentClassName={"pt-5"}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    {isChecked &&
                      (userInfo?.data?.residentOfApt ||
                        userInfo?.data?.singlePropertyId) && (
                        <div className="grid grid-cols-3 w-full">
                          {paymentMethodsState.length > 0 ? (
                            <div className="">
                              <label
                                className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*'] darkText`}
                              >
                                You Will Be Charged{" "}
                                <span className="text-red-600 dark:text-gray-100">
                                  $
                                  {(petInfo?.data?.pet_final_amount).toFixed(2)}{" "}
                                  (With Card Fee)
                                </span>
                              </label>
                              <Select
                                name={"paymentMethodId"}
                                options={[
                                  {
                                    label: "Select Card",
                                    value: "",
                                  },
                                  ...paymentMethodsState,
                                ]}
                                className={"py-2 md:py-2.5 px-2"}
                                parentClassName={"w-full px-0 py-0"}
                              />
                            </div>
                          ) : (
                            <Link
                              to={"/renteradmin/payment"}
                              className="underline text-blue-600"
                            >
                              {" "}
                              Add Payment Card{" "}
                            </Link>
                          )}
                        </div>
                      )}
                    <Button
                      type={"submit"}
                      disabled={!isChecked}
                      className={`px-7 xl:mx-0 mx-2 ${
                        isChecked
                          ? ""
                          : "bg-gray-400 cursor-not-allowed hover:bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900"
                      }`}
                    >
                      Add Now
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};
export default PetManage;
