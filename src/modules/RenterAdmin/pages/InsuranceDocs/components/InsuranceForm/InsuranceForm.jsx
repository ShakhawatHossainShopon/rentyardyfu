import { Button, Datepicker, FileUpload, Input } from "@/components";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useGetInsuranceSelector,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { getInsurance, updateInsurance } from "@/services/insurance/insurance";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
const initialValues = {
  company: "",
  policy_number: "",
  policy_start_date: "",
  policy_expiry_date: "",
  doc_photo: "",
};
const validationSchema = Yup.object({
  company: Yup.string().required("Required!"),
  policy_number: Yup.string().required("Required!"),
  policy_start_date: Yup.string().required("Required!"),
  policy_expiry_date: Yup.string().required("Required!"),
  doc_photo: Yup.string().required("Required!"),
});
export const InsuranceForm = () => {
  const dispatch = useAppDispatch();
  const insurance = useGetInsuranceSelector();
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };
  const {
    company,
    policy_number,
    policy_start_date,
    policy_expiry_date,
    doc_photo,
  } = insurance.data;
  const onSubmit = (values) => {
    dispatch(updateInsurance(values));
  };
  const [mapPreview, setMapPreview] = useState(null);
  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
    dispatch(getInsurance());
  }, [dispatch]);
  if (insurance.loading) {
    return (
      <div className="w-full flex justify-center items-center h-[40vh]">
        <ClipLoader size={100} color="blue" />
      </div>
    );
  } else {
    return (
      <div className="md:border md:p-4">
        <div className="md:flex justify-between items-center">
          <h2 className="md:text-xl text-lg font-bold">Renter Insurance</h2>
        </div>
        <hr className="my-5 border-gray-200" />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, setValues, values, errors, touched }) => {
            useEffect(() => {
              setMapPreview(doc_photo);
              setValues({
                company,
                policy_number,
                policy_start_date,
                policy_expiry_date,
                doc_photo: doc_photo && doc_photo.assetId && doc_photo.assetId,
              });
            }, []);
            return (
              <Form className="space-y-5">
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Insurance Company"}
                    placeholder={"StateFarm"}
                    name={"company"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Policy Number"}
                    placeholder={"45785"}
                    name={"policy_number"}
                    className={"py-2 px-2 uppercase"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Datepicker
                    required={true}
                    parentClassName={"w-full md:px-0 py-0"}
                    label={"Policy Starting Date"}
                    name={"policy_start_date"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.policy_start_date}
                    onChange={(e) => {
                      setFieldValue("policy_start_date", e);
                    }}
                    setFieldValue={setFieldValue}
                    touched={touched.policy_start_date}
                    errors={errors.policy_start_date}
                    maxDate={new Date()}
                  />
                  <Datepicker
                    required={true}
                    parentClassName={"w-full md:px-0 py-0"}
                    label={"Policy Expiry Date"}
                    name={"policy_expiry_date"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.policy_expiry_date}
                    onChange={(e) => {
                      const date = formatDate(e);
                      setFieldValue("policy_expiry_date", date);
                    }}
                    setFieldValue={setFieldValue}
                    touched={touched.policy_expiry_date}
                    errors={errors.policy_expiry_date}
                    minDate={new Date()}
                  />
                </div>
                <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
                  <FileUpload
                    required={true}
                    label={"Upload Policy Photo"}
                    placeholder={
                      mapPreview ? "1 Photo Uploaded" : "Upload Policy Photo"
                    }
                    name="doc_photo"
                    data={data}
                    loading={loading}
                    touched={touched.doc_photo}
                    errors={errors.doc_photo}
                    id={"unit_image"}
                    accept={"image/jpeg, image/png, image/jpg, image/webp"}
                    setPreview={setMapPreview}
                    setFieldValue={setFieldValue}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                  />
                  {/* {mapPreview && (
                    <div className="mt-4">
                      <Button type="button" onClick={handleOpenUnitMap}>
                        View All
                      </Button>
                    </div>
                  )}
                  {mapPreview && (
                    <Modal
                      title="Uploaded Unit Map"
                      isOpen={isOpenUnitMap}
                      onClose={handleCloseUnitMap}
                      width="w-full"
                      height="md:h-screen"
                    >
                      <div className="rounded-lg max-w-96 overflow-hidden border relative">
                        <LazyLoadImage
                          className="w-full rounded-lg object-cover"
                          src={`${config.url.ASSET_URL}${mapPreview.link}`}
                          alt={`Preview`}
                          loading="lazy"
                        />
                        <button
                          onClick={() => {
                            setMapPreview(null);
                            setFieldValue("unit_image", null);
                          }}
                          className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                        >
                          <Icons.Close />
                        </button>
                      </div>
                    </Modal>
                  )} */}
                </div>
                <Button className={"md:text-sm text-xs"}>Save Insurance</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
};
