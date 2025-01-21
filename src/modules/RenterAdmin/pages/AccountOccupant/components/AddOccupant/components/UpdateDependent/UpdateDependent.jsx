import {
  Button,
  CheckboxButton,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { updateOccupant } from "@/services/occupant/occupant";
import { formatDate, Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const initialValues = {
  type: "",
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
  type: Yup.string().required("Required!"),
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

export const UpdateDependent = ({ item }) => {
  const { countries } = useCountries();
  const {
    type,
    relation,
    middle_name,
    work,
    first_name,
    last_name,
    date_of_birth,
    sex,
    marital_status,
    country_of_citizenship,
    ssn,
    contact_number,
    govt_issued_id_type,
    govt_issued_id_number,
    issuing_city_state,
    govt_id_photo,
  } = item;
  const [mapPreview, setMapPreview] = useState(null);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      updateOccupant({
        ...values,
        work: values.work === "Yes" ? true : false,
        occupantId: item.occupantId,
      })
    );
    setMapPreview(null);
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
      {({ setFieldValue, touched, errors, values, setValues }) => {
        useEffect(() => {
          setMapPreview(govt_id_photo);
          setValues({
            type,
            relation,
            middle_name,
            work: work ? "Yes" : "No",
            first_name,
            last_name,
            date_of_birth,
            sex,
            marital_status,
            country_of_citizenship,
            ssn,
            contact_number,
            govt_issued_id_type,
            govt_issued_id_number,
            issuing_city_state,
            govt_id_photo:
              govt_id_photo && govt_id_photo.assetId && govt_id_photo.assetId,
          });
        }, []);
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6">
              <Select
                name={"type"}
                required={"true"}
                label={"Occupant Type"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Dependent",
                    value: "Dependent",
                  },
                  {
                    label: "Co-Applicant",
                    value: "Co-Applicant",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"relation"}
                required={true}
                label={"Relation with the main applicant"}
                options={[
                  {
                    label: "Select One",
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
                    label: "Girl/Boy Friend",
                    value: "Girl/Boy Friend",
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
                placeholder={"Write your first name"}
                name={"first_name"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Middle Name(Optional)"}
                placeholder={"Write your middle name"}
                name={"middle_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Last Name"}
                placeholder={"Write your last name"}
                name={"last_name"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-start items-center md:space-x-6 space-y-5 md:space-y-0">
              <Datepicker
                required={true}
                parentClassName={"w-full md:px-0 py-0"}
                label={"Date of Birth"}
                name={"date_of_birth"}
                className={"py-1.5 px-2 w-full bg-white"}
                value={values.date_of_birth}
                onChange={(e) => {
                  const date = formatDate(e);
                  setFieldValue("date_of_birth", date);
                }}
                setFieldValue={setFieldValue}
                touched={touched.date_of_birth}
                errors={errors.date_of_birth}
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
                    label: "Select One",
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
                label={"Social Security Number"}
                placeholder={"Enter Security Number"}
                name={"ssn"}
                className={"py-2 px-2"}
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
                    label: "Select One",
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
                    label: "State ID",
                    value: "State ID",
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
                className={"py-2 px-2"}
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
            <div className="md:flex justify-start items-center md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                required={true}
                label={"Upload Photo of that ID"}
                placeholder={"Upload File"}
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
              {mapPreview && (
                <div className="rounded-lg h-32 w-32 overflow-hidden border relative">
                  <LazyLoadImage
                    className="h-32 w-32 rounded-lg object-cover"
                    src={`${config.url.ASSET_URL}${mapPreview.link}`}
                    alt={`Preview`}
                    loading="lazy"
                  />
                  <button
                    onClick={() => {
                      setMapPreview(null);
                      setFieldValue("govt_id_photo", null);
                    }}
                    className="absolute cursor-pointer right-0 top-0 bg-white "
                  >
                    <Icons.Close />
                  </button>
                </div>
              )}
            </div>
            <div className="md:flex md:flex-col justify-center items-start space-y-3">
              <CheckboxButton
                className="md:text-sm text-xs"
                parentClassName={"py-2"}
                label="Accept me as guarantor and responsible for paying this occupant's rent, all fees, and any damages or compensation."
              />
              <Button className={"md:text-sm text-xs"} type={"submit"}>
                Update
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
