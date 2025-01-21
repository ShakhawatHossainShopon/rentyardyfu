import {
  Button,
  CheckboxButton,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addOccupant } from "@/services/occupant/occupant";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const initialValues = {
  relation: "",
  middle_name: "",
  work: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  sex: "",
  marital_status: "",
  country_of_citizenship: "",
  ssn: "",
  contact_number: "",
  govt_issued_id_type: "",
  govt_issued_id_number: "",
  issuing_city_state: "",
  govt_id_photo: "",
};

const validationSchema = Yup.object({
  relation: Yup.string().required("Required!"),
  work: Yup.string().required("Required!"),
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  date_of_birth: Yup.string().required("Required!"),
  sex: Yup.string().required("Required!"),
  marital_status: Yup.string().required("Required!"),
  country_of_citizenship: Yup.string().required("Required!"),
  govt_issued_id_type: Yup.string().required("Required!"),
  govt_issued_id_number: Yup.string().required("Required!"),
  issuing_city_state: Yup.string().required("Required!"),
  govt_id_photo: Yup.string().required("Required!"),
});

export const AddDependent = () => {
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { countries } = useCountries();
  const [mapPreview, setMapPreview] = useState(null);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addOccupant({
        ...values,
        type: "Dependent",
        work: values.work === "Yes" ? true : false,
      })
    );
    resetForm();
    setMapPreview(null);
  };
  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values }) => {
        return (
          <Form className="space-y-5 p-2 md:p-0">
            <p className="text-red-500">
              {" "}
              Note: 18 or above dependent will be considered as Co-Applicant.
              Application fees might be applicable.
            </p>
            <div className="w-full md:flex justify-center items-center md:space-x-6">
              <Select
                name={"relation"}
                required={true}
                label={"Relation with the main applicant"}
                options={[
                  {
                    label: "Select relation",
                    value: "",
                  },
                  {
                    label: "Father",
                    value: "Father",
                  },
                  {
                    label: "Mother",
                    value: "Mother",
                  },
                  {
                    label: "Spouse",
                    value: "Spouse",
                  },
                  {
                    label: "Son",
                    value: "Son",
                  },
                  {
                    label: "Daughter",
                    value: "Daughter",
                  },
                  {
                    label: "Friend",
                    value: "Friend",
                  },
                  {
                    label: "Girl Friend",
                    value: "Girl Friend",
                  },
                  {
                    label: "Boy Friend",
                    value: "Boy Friend",
                  },
                  {
                    label: "Brother",
                    value: "Brother",
                  },
                  {
                    label: "Sister",
                    value: "Sister",
                  },
                  {
                    label: "Uncle",
                    value: "Uncle",
                  },
                  {
                    label: "Aunt",
                    value: "Aunt",
                  },
                  {
                    label: "Grand Father",
                    value: "Grand Father",
                  },
                  {
                    label: "Grand Mother",
                    value: "Grand Mother",
                  },
                  {
                    label: "Cousin",
                    value: "Cousin",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0 mt-3 md:mt-0"}
              />
              <Select
                name={"work"}
                required={true}
                label={"Does the occupant work"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Yes",
                    value: "Yes",
                  },
                  {
                    label: "No",
                    value: "No",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0 mt-3 md:mt-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                required={true}
                label={"First Name"}
                placeholder={"John"}
                name={"first_name"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Middle Name(Optional)"}
                placeholder={"Your middle name"}
                name={"middle_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Last Name"}
                placeholder={"Doe"}
                name={"last_name"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Datepicker
                required={true}
                parentClassName={"w-full md:px-0 md:py-0"}
                label={"Date of Birth"}
                name={"date_of_birth"}
                className={"py-2 px-2 border w-full bg-white"}
                value={values.date_of_birth}
                onChange={(e) => {
                  const date = formatDate(e);
                  setFieldValue("date_of_birth", date);
                }}
                setFieldValue={setFieldValue}
                touched={touched.date_of_birth}
                errors={errors.date_of_birth}
                maxDate={new Date()}
              />
              <Select
                name={"sex"}
                required={true}
                label={"Sex"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Others",
                    value: "Others",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"marital_status"}
                required={true}
                label={"Marital Status"}
                options={[
                  {
                    label: "Select Status",
                    value: "",
                  },
                  {
                    label: "Single",
                    value: "Single",
                  },
                  {
                    label: "Married",
                    value: "Married",
                  },
                  {
                    label: "Divorced",
                    value: "Divorced",
                  },
                  {
                    label: "Widowed",
                    value: "Widowed",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"country_of_citizenship"}
                required={true}
                label={"Country of Citizen"}
                options={[
                  {
                    label: "Select Citizen",
                    value: "",
                  },
                  ...countryOptions,
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                label={"Social Security Number(Optional)"}
                placeholder={"65745983"}
                name={"ssn"}
                className={"py-2 px-2 uppercase"}
              />
              <PhoneInput
                label={"Contact Number(Optional)"}
                placeholder={"234345983"}
                name={"contact_number"}
                className={"py-2 px-2"}
                type={"tel"}
                setFieldValue={setFieldValue}
                errors={
                  touched.contact_number && errors.contact_number ? true : false
                }
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"govt_issued_id_type"}
                required={true}
                label={"Select Govt. Issued ID Type"}
                options={[
                  {
                    label: "Select ID type",
                    value: "",
                  },
                  {
                    label: "Passport",
                    value: "Passport",
                  },
                  {
                    label: "Driver License",
                    value: "Driver License",
                  },
                  {
                    label: "State ID/Govt ID",
                    value: "State ID",
                  },
                  {
                    label: "Birth Certificate",
                    value: "Birth Certificate",
                  },
                  {
                    label: "Permanent Resident Card",
                    value: "Permanent Resident Card",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Govt. Issued ID Number"}
                placeholder={"4563223566"}
                name={"govt_issued_id_number"}
                className={"py-2 px-2 uppercase"}
              />
              <Input
                name={"issuing_city_state"}
                required={true}
                label={"Issuing Place(State/City)"}
                placeholder={"Texas"}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                required={true}
                label={"Upload Photo of that ID"}
                placeholder={
                  mapPreview
                    ? "1 Photo Uploaded"
                    : "Upload Image(.jpg, .png, .jpeg)"
                }
                name="govt_id_photo"
                data={data}
                loading={loading}
                touched={touched.govt_id_photo}
                errors={errors.govt_id_photo}
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
            <div className="md:flex md:flex-col justify-center items-start space-y-3 checkbox">
              <CheckboxButton
                className="md:text-sm text-xs dark:text-gray-200"
                label="Accept me as guarantor and responsible for paying this occupant's rent, all fees, and any damages or compensation."
                parentClassName={"pt-5"}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <Button
                className={`md:text-sm text-xs ${
                  isChecked
                    ? ""
                    : "bg-gray-400 cursor-not-allowed hover:bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900"
                }`}
                type={"submit"}
                disabled={!isChecked}
              >
                Add Dependent
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
