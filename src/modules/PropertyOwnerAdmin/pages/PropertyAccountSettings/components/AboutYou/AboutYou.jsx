import {
  Button,
  Datepicker,
  FileUpload,
  Input,
  PhoneInput,
  Select,
} from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addPoUser } from "@/services/user/user";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  former_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  identity_number: "",
  do_you_smoke: "",
  identity_issue_place: "",
  issuing_city_state: "",
  govt_issued_id_number: "",
  govt_issued_id_type: "",
  contact_number: "",
  govt_id_photo: "",
  sex: "",
  marital_status: "",
  country_of_citizenship: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  date_of_birth: Yup.string().required("Required!"),
  identity_number: Yup.string().required("Required!"),
  do_you_smoke: Yup.string().required("Required!"),
  govt_issued_id_number: Yup.string().required("Required!"),
  govt_issued_id_type: Yup.string().required("Required!"),
  contact_number: Yup.string().required("Required!"),
  govt_id_photo: Yup.string().required("Required!"),
  sex: Yup.string().required("Required!"),
  marital_status: Yup.string().required("Required!"),
  country_of_citizenship: Yup.string().required("Required!"),
});

export const AboutYou = ({ res }) => {
  const dispatch = useAppDispatch();
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const { countries } = useCountries();
  const [mapPreview, setMapPreview] = useState(null);
  const [disable, setDisable] = useState({
    first_name: false,
    former_name: false,
    middle_name: false,
    last_name: false,
    date_of_birth: false,
    identity_number: false,
    identity_issue_place: false,
    issuing_city_state: false,
    govt_issued_id_number: false,
    govt_issued_id_type: false,
    govt_id_photo: false,
    sex: false,
    country_of_citizenship: false,
  });

  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };

  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });

  const {
    first_name,
    former_name,
    middle_name,
    last_name,
    date_of_birth,
    do_you_smoke,
    identity_issue_place,
    issuing_city_state,
    govt_issued_id_number,
    govt_issued_id_type,
    contact_number,
    govt_id_photo,
    sex,
    marital_status,
    country_of_citizenship,
    identity_number,
  } = res;

  useEffect(() => {
    setDisable({
      first_name: first_name ? true : false,
      former_name: former_name ? true : false,
      middle_name: middle_name ? true : false,
      last_name: last_name ? true : false,
      date_of_birth: date_of_birth ? true : false,
      identity_number: identity_number ? true : false,
      identity_issue_place: identity_issue_place ? true : false,
      issuing_city_state: issuing_city_state ? true : false,
      govt_issued_id_number: govt_issued_id_number ? true : false,
      govt_issued_id_type: govt_issued_id_type ? true : false,
      govt_id_photo: govt_id_photo ? true : false,
      sex: sex ? true : false,
      country_of_citizenship: country_of_citizenship ? true : false,
    });
  }, [res]);

  const onSubmit = (values) => {
    dispatch(addPoUser(values));
  };

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, touched, values, setValues }) => {
        useEffect(() => {
          setMapPreview(govt_id_photo);
          setValues({
            first_name,
            former_name,
            middle_name,
            last_name,
            date_of_birth,
            identity_number,
            do_you_smoke,
            identity_issue_place,
            issuing_city_state,
            govt_issued_id_number,
            govt_issued_id_type,
            contact_number,
            govt_id_photo: govt_id_photo && govt_id_photo.assetId,
            sex,
            marital_status,
            country_of_citizenship,
          });
        }, [dispatch]);
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                required={true}
                disabled={disable.first_name ? true : false}
                label={"First Name"}
                placeholder={"John"}
                name={"first_name"}
                className={"py-2 px-2"}
              />
              <Input
                disabled={disable.middle_name ? true : false}
                label={"Middle Name(Optional)"}
                placeholder={"middle name"}
                name={"middle_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Last Name"}
                disabled={disable.last_name ? true : false}
                placeholder={"Doe"}
                name={"last_name"}
                className={"py-2 px-2"}
              />
            </div>

            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                label={"Former name(Optional)"}
                disabled={disable.former_name ? true : false}
                placeholder={"Write if you had one"}
                name={"former_name"}
                className={"py-2 px-2"}
              />

              <Datepicker
                required={true}
                parentClassName={"w-full px-0 py-0 bg-gray-50"}
                label={"Date of Birth"}
                name={"date_of_birth"}
                className={"py-2 px-2 border w-full bg-white"}
                value={values.date_of_birth}
                disabled={disable.date_of_birth ? true : false}
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
                disabled={disable.sex ? true : false}
                label={"Gender Identity"}
                options={[
                  {
                    label: "Choose Gender",
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Select
                name={"marital_status"}
                required={true}
                label={"Marital Status"}
                options={[
                  {
                    label: "Choose Status",
                    value: "Male",
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"country_of_citizenship"}
                required={true}
                disabled={disable.country_of_citizenship ? true : false}
                label={"Country of Citizen"}
                options={[
                  {
                    label: "Select Citizen",
                    value: "",
                  },
                  ...countryOptions,
                ]}
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />

              <Select
                name={"do_you_smoke"}
                required={true}
                label={"Do you Smoke"}
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
                  {
                    label: "Occasionally",
                    value: "Occasionally",
                  },
                ]}
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                required={true}
                disabled={disable.identity_number ? true : false}
                label={"Social Security Number (SSN)"}
                placeholder={"abcd1234"}
                name={"identity_number"}
                className={"py-2 px-2"}
                type={"text"}
              />
              <Input
                label={"Issuing Place Name(Optional)"}
                disabled={disable.identity_issue_place ? true : false}
                placeholder={"Texas City"}
                name={"identity_issue_place"}
                className={"py-2 px-2"}
              />
              <PhoneInput
                required={true}
                label={"Contact Number"}
                placeholder={"234345983"}
                names={"contact_number"}
                className={"py-2 px-2"}
                type={"tel"}
                errors={errors.contact_number}
                touched={touched.contact_number}
                setFieldValue={setFieldValue}
                value={values.contact_number}
              />
            </div>
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Select
                name={"govt_issued_id_type"}
                required={true}
                disabled={disable.govt_issued_id_type ? true : false}
                label={"State/Govt. Issued ID type"}
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
                    label: "State ID",
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
                className={"w-full border px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Enter Selected State/Govt. ID Number"}
                disabled={disable.govt_issued_id_number ? true : false}
                placeholder={"4563223566"}
                name={"govt_issued_id_number"}
                className={"py-2 px-2"}
                type={"text"}
              />

              <Input
                label={"Issuing Place Name(Optional)"}
                disabled={disable.issuing_city_state ? true : false}
                placeholder={"Texas"}
                name={"issuing_city_state"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                required={true}
                label={"Upload State/Govt. ID Photo"}
                placeholder={
                  mapPreview
                    ? "1 Photo Uploaded"
                    : "Upload State/Govt. ID Photo"
                }
                name="govt_id_photo"
                data={data}
                loading={loading}
                disable={disable.govt_id_photo ? true : false}
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
            <Button className={"md:text-sm text-xs"} type={"submit"}>
              Save Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
