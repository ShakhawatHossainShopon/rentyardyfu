import {
  Button,
  FileUpload,
  Input,
  Modal,
  MultipleFileUpload,
  MultipleSelectParent,
  MultipleVideoUpload,
  PhoneInput,
  Select,
  TextArea,
} from "@/components";
import { SinglePdfUpload } from "@/components/SinglePdfUpload";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { addProperty } from "@/services/property/property";
import { Icons } from "@/utils";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-quill/dist/quill.snow.css";
import states from "states-us";
import * as Yup from "yup";
import { UploadCoverPhoto } from "../UploadCoverPhoto";

const initialValues = {
  name: "",
  unit: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  manager_name: "",
  contact_number: "",
  maintenance_period: "",
  contact_email: "",
  statement: "",
  payment: "",
  website: "",
  about_property: "",
  cover_image: "",
  listing_image: "",
  termination: "",
  termination_msg: "",
  termination_days: "",
  guest_parking: "",
  applicant_fee: "",
  co_applicant_fee: "",
  dependent_fee: "",
  office_opening_time: "",
  office_closing_time: "",
  office_working_days: [],
  tour_accept_hours: [],
  property_images: [],
  property_videos: [],
  tour_videos: [],
  arial_videos: [],
  accessibility: [
    {
      add: "",
    },
  ],
  late_fee: [
    {
      amount: "",
      based_on_term: "",
    },
  ],
  onetime_monthly: [
    {
      name: "",
      amount: "",
      based_on_term: "",
      refundable: "",
    },
  ],
  community_amenities: [
    {
      name: "",
    },
  ],
  lease_term: [
    {
      name: "",
      optional: "",
    },
  ],
  utilities: [
    {
      utility_type: "",
      provider: "",
    },
  ],
  parking: [
    {
      name: "",
      free_paid: "",
    },
  ],
  schools: [
    {
      type: "",
      name: "",
      distance: "",
    },
  ],
  transportation: [
    {
      type: "",
      transportation: "",
      stoppage: "",
    },
  ],
  document: [
    {
      type: "",
      name: "",
    },
  ],
  custom_policy: [
    {
      name: "",
      website: "",
      file: "",
    },
  ],
  pet_one_time_fee: "",
  pet_security_deposit: "",
  pet_monthly_rent: "",
  pet_max_weight: "",
  pet_policy_pdf: "",
};

const validationSchema = Yup.object({
  pet_one_time_fee: Yup.string().trim().required("Required!"),
  pet_security_deposit: Yup.string().trim().required("Required!"),
  pet_monthly_rent: Yup.string().trim().required("Required!"),
  maintenance_period: Yup.string().trim().required("Required!"),
  name: Yup.string().trim().required("Required!"),
  termination: Yup.string().trim().required("Required!"),
  termination_days: Yup.string().trim().required("Required!"),
  unit: Yup.number().required("Required!"),
  address: Yup.string().trim().required("Required!"),
  city: Yup.string().trim().required("Required!"),
  state: Yup.string().trim().required("Required!"),
  manager_name: Yup.string().trim().required("Required!"),
  zip: Yup.string().trim().required("Required!"),
  country: Yup.string().trim().required("Required!"),
  statement: Yup.string().trim().required("Required!"),
  payment: Yup.string().trim().required("Required!"),
  contact_number: Yup.string().trim().required("Required!"),
  contact_email: Yup.string().trim().email().required("Required!"),
  cover_image: Yup.string().required("Required!"),
  listing_image: Yup.string().required("Image Required!"),
  about_property: Yup.string().trim().required("Required!"),
  guest_parking: Yup.number().required("Required!"),
  applicant_fee: Yup.number().required("Required!"),
  co_applicant_fee: Yup.number().required("Required!"),
  dependent_fee: Yup.number().required("Required!"),
  office_opening_time: Yup.string().trim().required("Required!"),
  office_closing_time: Yup.string().trim().required("Required!"),
  office_working_days: Yup.array()
    .of(Yup.string())
    .required("required!")
    .min(1, "required!"),
  property_images: Yup.array()
    .of(Yup.string())
    .required("Image required!")
    .min(1, "Image required!"),
  onetime_monthly: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
      amount: Yup.string().trim().required("required"),
      based_on_term: Yup.string().trim().required("required"),
      refundable: Yup.string().trim().required("required"),
    })
  ),
  lease_term: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
      optional: Yup.string().trim().required("required"),
    })
  ),
  utilities: Yup.array().of(
    Yup.object().shape({
      utility_type: Yup.string().trim().required("required"),
      provider: Yup.string().trim().required("required"),
    })
  ),
  parking: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
      free_paid: Yup.string().trim().required("required"),
    })
  ),
  schools: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().trim().required("required"),
      name: Yup.string().trim().required("required"),
    })
  ),
  transportation: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().trim().required("required"),
      transportation: Yup.string().trim().required("required"),
    })
  ),
  accessibility: Yup.array().of(
    Yup.object().shape({
      add: Yup.string().trim().required("required"),
    })
  ),
  document: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
      type: Yup.string().trim().required("required"),
    })
  ),
  custom_policy: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
    })
  ),
});

export const AddProperty = ({ setShowForm }) => {
  const [petOnetimeRefund, setPetOnetimeRefund] = useState(false);
  const [petSecurityDepositRefund, setPetSecurityDepositRefund] =
    useState(false);
  const stateOptions = [
    {
      label: "Select State",
      value: "",
    },
    ...states.map((item) => {
      return { label: item.name, value: item.abbreviation };
    }),
  ];
  const [published, setPublished] = useState(null);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addProperty({
        ...values,
        published: published,
      })
    );
    resetForm();
    setShowForm(false);
    setCoverPhoto(null);
    setListCardImagePreview(null);
    setVideos([]);
    setVideos2([]);
    setVideos3([]);
    setPreviewUrls([]);
  };
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [listCardImagePreview, setListCardImagePreview] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videos2, setVideos2] = useState([]);
  const [videos3, setVideos3] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVideos, setisModalOpenVideos] = useState(false);
  const [isModalOpenVirtualTour, setisModalOpenVirtualTour] = useState(false);
  const [isModalArielViw, setisModalArielViw] = useState(false);
  const handleIsModalArielViw = () => {
    setisModalArielViw(true);
  };
  const closeIsModalArielViw = () => {
    setisModalArielViw(false);
  };
  const handleOpenModalVirtualTour = () => {
    setisModalOpenVirtualTour(true);
  };
  const handleCloseModalVirtualTour = () => {
    setisModalOpenVirtualTour(false);
  };
  const handleOpenModal = () => {
    setisModalOpenVideos(true);
  };
  const handleCloseModal = () => {
    setisModalOpenVideos(false);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="w-full space-y-10">
        <p className="bg-pink-50 text-sm md:text-base px-2 py-1 dark:bg-[#360000] darkText">
          Note: Firstly, Please add property details,{" "}
          <span className="font-semibold">Not Apartment</span> . You can add
          Apartment from left menu ‘Add Apartment’{" "}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, touched, errors, values }) => {
            const handleRemoveImage = (index) => {
              const newPreviews = [...previewUrls];
              newPreviews.splice(index, 1);
              setPreviewUrls(newPreviews);
              if (newPreviews.length === 0) {
                setFieldValue("property_images", []);
              }
              setFieldValue(
                "property_images",
                newPreviews.map((item) => item.assetId)
              );
            };

            const handleRemovePropertyVideo = (index) => {
              const newPreviews = [...videos];
              newPreviews.splice(index, 1);
              setVideos(newPreviews);
              if (newPreviews.length === 0) {
                setFieldValue("property_videos", []);
              }
              setFieldValue(
                "property_videos",
                newPreviews.map((item) => item.assetId)
              );
            };

            const handleRemoveTourVideo = (index) => {
              const newPreviews = [...videos2];
              newPreviews.splice(index, 1);
              setVideos2(newPreviews);
              setFieldValue(
                "tour_videos",
                newPreviews.map((item) => item.assetId)
              );
            };

            const handleRemoveArialVideo = (index) => {
              const newPreviews = [...videos3];
              newPreviews.splice(index, 1);
              setVideos3(newPreviews);
              setFieldValue(
                "arial_videos",
                newPreviews.map((item) => item.assetId)
              );
            };
            return (
              <Form className="space-y-5 pb-5">
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Property Name"}
                    placeholder={"Write Property Name"}
                    name={"name"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Total Unit"}
                    placeholder={"50"}
                    name={"unit"}
                    type={"number"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Property Street Address"}
                    placeholder={"4055 S Great SW Pkwy"}
                    name={"address"}
                    className={"py-2 px-2"}
                    parentClassName={"col-span-2"}
                  />
                  <Input
                    required={true}
                    label={"Property City"}
                    placeholder={"Texas"}
                    name={"city"}
                    className={"py-2 px-2"}
                    parentClassName={"col-span-1"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Select
                    name={"state"}
                    required={true}
                    label={"Property State"}
                    options={stateOptions}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Input
                    required={true}
                    label={"Property Zip Code"}
                    placeholder={"7333000"}
                    name={"zip"}
                    className={"py-2 px-2"}
                  />
                  <Select
                    name={"country"}
                    required={true}
                    label={"Property Country"}
                    options={[
                      {
                        label: "Select Country",
                        value: "",
                      },
                      {
                        label: "United States",
                        value: "United States",
                      },
                      {
                        label: "Canada",
                        value: "Canada",
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Property Manager Name"}
                    placeholder={"John Doe"}
                    name={"manager_name"}
                    className={"py-2 px-2"}
                  />
                  <PhoneInput
                    required={true}
                    label={"Property Contact Number"}
                    placeholder={"234345983"}
                    names={"contact_number"}
                    className={"py-2 px-2"}
                    type={"tel"}
                    errors={errors.contact_number}
                    touched={touched.contact_number}
                    setFieldValue={setFieldValue}
                    value={values.contact_number}
                  />
                  <Input
                    required={true}
                    label={"Property Contact Email"}
                    placeholder={"Example@test.com"}
                    name={"contact_email"}
                    type={"email"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Select
                    name={"statement"}
                    required={true}
                    label={"Statement Sending Date"}
                    options={[
                      {
                        label: "Select Date",
                        value: "",
                      },
                      {
                        label: "1st of Every Month",
                        value: "1st of Every Month",
                      },
                      {
                        label: "2nd of Every Month",
                        value: "2nd of Every Month",
                      },
                      {
                        label: "3rd of Every Month",
                        value: "3rd of Every Month",
                      },
                      {
                        label: "4th of Every Month",
                        value: "4th of Every Month",
                      },
                      {
                        label: "5th of Every Month",
                        value: "5th of Every Month",
                      },
                      {
                        label: "6th of Every Month",
                        value: "6th of Every Month",
                      },
                      {
                        label: "7th of Every Month",
                        value: "7th of Every Month",
                      },
                      {
                        label: "8th of Every Month",
                        value: "8th of Every Month",
                      },
                      {
                        label: "9th of Every Month",
                        value: "9th of Every Month",
                      },
                      {
                        label: "10th of Every Month",
                        value: "10th of Every Month",
                      },
                      {
                        label: "15th of Every Month",
                        value: "15th of Every Month",
                      },
                      {
                        label: "20th of Every Month",
                        value: "20th of Every Month",
                      },
                      {
                        label: "25th of Every Month",
                        value: "25th of Every Month",
                      },
                      {
                        label: "26th of Every Month",
                        value: "26th of Every Month",
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Select
                    name={"payment"}
                    required={true}
                    label={"Payment Due Date"}
                    options={[
                      {
                        label: "Select Date",
                        value: "",
                      },
                      {
                        label: "1st of Every Month",
                        value: "1st of Every Month",
                      },
                      {
                        label: "2nd of Every Month",
                        value: "2nd of Every Month",
                      },
                      {
                        label: "3rd of Every Month",
                        value: "3rd of Every Month",
                      },
                      {
                        label: "4th of Every Month",
                        value: "4th of Every Month",
                      },
                      {
                        label: "5th of Every Month",
                        value: "5th of Every Month",
                      },
                      {
                        label: "6th of Every Month",
                        value: "6th of Every Month",
                      },
                      {
                        label: "7th of Every Month",
                        value: "7th of Every Month",
                      },
                      {
                        label: "8th of Every Month",
                        value: "8th of Every Month",
                      },
                      {
                        label: "9th of Every Month",
                        value: "9th of Every Month",
                      },
                      {
                        label: "10th of Every Month",
                        value: "10th of Every Month",
                      },
                      {
                        label: "15th of Every Month",
                        value: "15th of Every Month",
                      },
                      {
                        label: "20th of Every Month",
                        value: "20th of Every Month",
                      },
                      {
                        label: "25th of Every Month",
                        value: "25th of Every Month",
                      },
                      {
                        label: "26th of Every Month",
                        value: "26th of Every Month",
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Select
                    name={"guest_parking"}
                    required={true}
                    label={"Guest Vehicle Permit Time"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "12hr",
                        value: 12,
                      },
                      {
                        label: "24hr",
                        value: 24,
                      },
                      {
                        label: "36hr",
                        value: 36,
                      },
                      {
                        label: "48hr",
                        value: 48,
                      },
                      {
                        label: "60hr",
                        value: 60,
                      },
                      {
                        label: "72hr",
                        value: 72,
                      },
                      {
                        label: "Not Available",
                        value: -1,
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <MultipleSelectParent
                    label={"Office Working Days"}
                    required={true}
                    name={"office_working_days"}
                    errors={errors.office_working_days}
                    touched={touched.office_working_days}
                    setFieldValue={setFieldValue}
                    options={[
                      {
                        label: "Monday",
                        value: "Monday",
                      },
                      {
                        label: "Tuesday",
                        value: "Tuesday",
                      },
                      {
                        label: "Wednesday",
                        value: "Wednesday",
                      },
                      {
                        label: "Thursday",
                        value: "Thursday",
                      },
                      {
                        label: "Friday",
                        value: "Friday",
                      },
                      {
                        label: "Saturday",
                        value: "Saturday",
                      },
                      {
                        label: "Sunday",
                        value: "Sunday",
                      },
                    ]}
                  />
                  <Select
                    name={"office_opening_time"}
                    required={true}
                    label={"Office Opening Time"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "6:00AM",
                        value: "6:00AM",
                      },
                      {
                        label: "6:30AM",
                        value: "6:30AM",
                      },
                      {
                        label: "7:00AM",
                        value: "7:00AM",
                      },
                      {
                        label: "7:30AM",
                        value: "7:30AM",
                      },
                      {
                        label: "8:00AM",
                        value: "8:00AM",
                      },
                      {
                        label: "8:30AM",
                        value: "8:30AM",
                      },
                      {
                        label: "9:00AM",
                        value: "9:00AM",
                      },
                      {
                        label: "9:30AM",
                        value: "9:30AM",
                      },
                      {
                        label: "10:00AM",
                        value: "10:00AM",
                      },
                      {
                        label: "10:30AM",
                        value: "10:30AM",
                      },
                      {
                        label: "11:00AM",
                        value: "11:00AM",
                      },
                      {
                        label: "11:30AM",
                        value: "11:30AM",
                      },
                      {
                        label: "12:00PM",
                        value: "12:00PM",
                      },
                      {
                        label: "12:30PM",
                        value: "12:30PM",
                      },
                      {
                        label: "1:00PM",
                        value: "1:00PM",
                      },
                      {
                        label: "1:30PM",
                        value: "1:30PM",
                      },
                      {
                        label: "2:00PM",
                        value: "2:00PM",
                      },
                      {
                        label: "2:30PM",
                        value: "2:30PM",
                      },
                      {
                        label: "3:00PM",
                        value: "3:00PM",
                      },
                      {
                        label: "3:30PM",
                        value: "3:30PM",
                      },
                      {
                        label: "4:00PM",
                        value: "4:00PM",
                      },
                      {
                        label: "4:30PM",
                        value: "4:30PM",
                      },
                      {
                        label: "5:00PM",
                        value: "5:00PM",
                      },
                      {
                        label: "5:30PM",
                        value: "5:30PM",
                      },
                      {
                        label: "6:00PM",
                        value: "6:00PM",
                      },
                      {
                        label: "6:30PM",
                        value: "6:30PM",
                      },
                      {
                        label: "7:00PM",
                        value: "7:00PM",
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Select
                    name={"office_closing_time"}
                    required={true}
                    label={"Office Closing Time"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "6:00AM",
                        value: "6:00AM",
                      },
                      {
                        label: "6:30AM",
                        value: "6:30AM",
                      },
                      {
                        label: "7:00AM",
                        value: "7:00AM",
                      },
                      {
                        label: "7:30AM",
                        value: "7:30AM",
                      },
                      {
                        label: "8:00AM",
                        value: "8:00AM",
                      },
                      {
                        label: "8:30AM",
                        value: "8:30AM",
                      },
                      {
                        label: "9:00AM",
                        value: "9:00AM",
                      },
                      {
                        label: "9:30AM",
                        value: "9:30AM",
                      },
                      {
                        label: "10:00AM",
                        value: "10:00AM",
                      },
                      {
                        label: "10:30AM",
                        value: "10:30AM",
                      },
                      {
                        label: "11:00AM",
                        value: "11:00AM",
                      },
                      {
                        label: "11:30AM",
                        value: "11:30AM",
                      },
                      {
                        label: "12:00PM",
                        value: "12:00PM",
                      },
                      {
                        label: "12:30PM",
                        value: "12:30PM",
                      },
                      {
                        label: "1:00PM",
                        value: "1:00PM",
                      },
                      {
                        label: "1:30PM",
                        value: "1:30PM",
                      },
                      {
                        label: "2:00PM",
                        value: "2:00PM",
                      },
                      {
                        label: "2:30PM",
                        value: "2:30PM",
                      },
                      {
                        label: "3:00PM",
                        value: "3:00PM",
                      },
                      {
                        label: "3:30PM",
                        value: "3:30PM",
                      },
                      {
                        label: "4:00PM",
                        value: "4:00PM",
                      },
                      {
                        label: "4:30PM",
                        value: "4:30PM",
                      },
                      {
                        label: "5:00PM",
                        value: "5:00PM",
                      },
                      {
                        label: "5:30PM",
                        value: "5:30PM",
                      },
                      {
                        label: "6:00PM",
                        value: "6:00PM",
                      },
                      {
                        label: "6:30PM",
                        value: "6:30PM",
                      },
                      {
                        label: "7:00PM",
                        value: "7:00PM",
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <MultipleSelectParent
                    label={"Tour accept hours (Optional)"}
                    name={"tour_accept_hours"}
                    errors={errors.tour_accept_hours}
                    touched={touched.tour_accept_hours}
                    setFieldValue={setFieldValue}
                    options={[
                      {
                        label: "6:00AM",
                        value: "6:00AM",
                      },
                      {
                        label: "6:30AM",
                        value: "6:30AM",
                      },
                      {
                        label: "7:00AM",
                        value: "7:00AM",
                      },
                      {
                        label: "7:30AM",
                        value: "7:30AM",
                      },
                      {
                        label: "8:00AM",
                        value: "8:00AM",
                      },
                      {
                        label: "8:30AM",
                        value: "8:30AM",
                      },
                      {
                        label: "9:00AM",
                        value: "9:00AM",
                      },
                      {
                        label: "9:30AM",
                        value: "9:30AM",
                      },
                      {
                        label: "10:00AM",
                        value: "10:00AM",
                      },
                      {
                        label: "10:30AM",
                        value: "10:30AM",
                      },
                      {
                        label: "11:00AM",
                        value: "11:00AM",
                      },
                      {
                        label: "11:30AM",
                        value: "11:30AM",
                      },
                      {
                        label: "12:00PM",
                        value: "12:00PM",
                      },
                      {
                        label: "12:30PM",
                        value: "12:30PM",
                      },
                      {
                        label: "1:00PM",
                        value: "1:00PM",
                      },
                      {
                        label: "1:30PM",
                        value: "1:30PM",
                      },
                      {
                        label: "2:00PM",
                        value: "2:00PM",
                      },
                      {
                        label: "2:30PM",
                        value: "2:30PM",
                      },
                      {
                        label: "3:00PM",
                        value: "3:00PM",
                      },
                      {
                        label: "3:30PM",
                        value: "3:30PM",
                      },
                      {
                        label: "4:00PM",
                        value: "4:00PM",
                      },
                      {
                        label: "4:30PM",
                        value: "4:30PM",
                      },
                      {
                        label: "5:00PM",
                        value: "5:00PM",
                      },
                      {
                        label: "5:30PM",
                        value: "5:30PM",
                      },
                      {
                        label: "6:00PM",
                        value: "6:00PM",
                      },
                      {
                        label: "6:30PM",
                        value: "6:30PM",
                      },
                      {
                        label: "7:00PM",
                        value: "7:00PM",
                      },
                    ]}
                  />
                  <Input
                    label={"Primary Applicant Fee"}
                    required={true}
                    type={"number"}
                    placeholder={"100"}
                    name={"applicant_fee"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Co-Applicant Fee"}
                    required={true}
                    type={"number"}
                    placeholder={"50"}
                    name={"co_applicant_fee"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <Input
                    label={"Dependent Fee(18/18+)"}
                    required={true}
                    placeholder={"20"}
                    name={"dependent_fee"}
                    className={"py-2 px-2"}
                  />
                  <Select
                    name={"maintenance_period"}
                    required={true}
                    label={"Move-Out Maintenance"}
                    options={[
                      {
                        label: "Select Days",
                        value: "",
                      },
                      {
                        label: "1 Day",
                        value: 1,
                      },
                      {
                        label: "2 Days",
                        value: 2,
                      },
                      {
                        label: "3 Days",
                        value: 3,
                      },
                      {
                        label: "4 Days",
                        value: 4,
                      },
                      {
                        label: "5 Days",
                        value: 5,
                      },
                      {
                        label: "6 Days",
                        value: 6,
                      },
                      {
                        label: "7 Days",
                        value: 7,
                      },
                      {
                        label: "8 Days",
                        value: 8,
                      },
                      {
                        label: "9 Days",
                        value: 9,
                      },
                      {
                        label: "10 Days",
                        value: 10,
                      },
                      {
                        label: "11 Days",
                        value: 11,
                      },
                      {
                        label: "12 Days",
                        value: 12,
                      },
                      {
                        label: "13 Days",
                        value: 13,
                      },
                      {
                        label: "14 Days",
                        value: 14,
                      },
                      {
                        label: "15 Days",
                        value: 15,
                      },
                      {
                        label: "16 Days",
                        value: 16,
                      },
                      {
                        label: "17 Days",
                        value: 17,
                      },
                      {
                        label: "18 Days",
                        value: 18,
                      },
                      {
                        label: "19 Days",
                        value: 19,
                      },
                      {
                        label: "20 Days",
                        value: 20,
                      },
                      {
                        label: "21 Days",
                        value: 21,
                      },
                      {
                        label: "22 Days",
                        value: 22,
                      },
                      {
                        label: "23 Days",
                        value: 23,
                      },
                      {
                        label: "24 Days",
                        value: 24,
                      },
                      {
                        label: "25 Days",
                        value: 25,
                      },
                      {
                        label: "26 Days",
                        value: 26,
                      },
                      {
                        label: "27 Days",
                        value: 27,
                      },
                      {
                        label: "28 Days",
                        value: 28,
                      },
                      {
                        label: "29 Days",
                        value: 29,
                      },
                      {
                        label: "30 Days",
                        value: 30,
                      },
                    ]}
                    className={"w-full border px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Input
                    label={"Property Website(Optional)"}
                    placeholder={"Property Website"}
                    name={"website"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <Input
                    label={"Termination/Lease break Move-out fee"}
                    required={true}
                    type={"number"}
                    placeholder={"20"}
                    name={"termination"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Termination/Lease break Note  (Optional)"}
                    type={"text"}
                    placeholder={"Note"}
                    name={"termination_msg"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Termination/Lease break Minimum days"}
                    required={true}
                    type={"number"}
                    placeholder={"30"}
                    name={"termination_days"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Add Late Fees(Optional)</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="late_fee">
                    {({
                      push,
                      remove,
                      form: {
                        values: { late_fee },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {late_fee.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-2 w-full"
                              >
                                <div className="md:flex justify-start items-start md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    label={"Amount"}
                                    placeholder={"50"}
                                    name={`late_fee[${index}].amount`}
                                    className={"py-2 px-2"}
                                  />
                                  <Select
                                    name={`late_fee[${index}].based_on_term`}
                                    label={"Late Based on Term"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label:
                                          "Between 1st week after Due date",
                                        value:
                                          "Between 1st week after Due date",
                                      },
                                      {
                                        label:
                                          "Between 2nd week after Due date",
                                        value:
                                          "Between 2nd week after Due date",
                                      },
                                      {
                                        label:
                                          "Between 3rd week after Due date",
                                        value:
                                          "Between 3rd week after Due date",
                                      },
                                      {
                                        label:
                                          "Between 4th week after Due date",
                                        value:
                                          "Between 4th week after Due date",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.late_fee.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          amount: "",
                                          based_on_term: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">
                    Add Fees(One Time/Monthly). Do not add monthly rent
                  </h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="onetime_monthly">
                    {({
                      push,
                      remove,
                      form: {
                        values: { onetime_monthly },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {onetime_monthly.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:grid md:grid-cols-5 md:gap-10 w-full relative space-y-5 md:space-y-0">
                                  <div className="col-span-2">
                                    <Input
                                      required={true}
                                      label={"Title"}
                                      placeholder={"Admin Fee"}
                                      name={`onetime_monthly[${index}].name`}
                                      className={"py-2 px-2"}
                                    />
                                  </div>
                                  <Input
                                    required={true}
                                    label={"Amount"}
                                    placeholder={"50"}
                                    name={`onetime_monthly[${index}].amount`}
                                    className={"py-2 px-2"}
                                  />
                                  <Select
                                    name={`onetime_monthly[${index}].based_on_term`}
                                    required={true}
                                    label={"One-time/Monthly"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Not Applicable",
                                        value: "Not Applicable",
                                      },
                                      {
                                        label: "Monthly",
                                        value: "Monthly",
                                      },
                                      {
                                        label: "One-time",
                                        value: "One-time",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Select
                                    name={`onetime_monthly[${index}].refundable`}
                                    required={true}
                                    label={"Refund/Non-Refund"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Not Applicable",
                                        value: "Not Applicable",
                                      },
                                      {
                                        label: "Refundable",
                                        value: "Refundable",
                                      },
                                      {
                                        label: "Non-Refundable",
                                        value: "Non-Refundable",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index ===
                                  values.onetime_monthly.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          amount: "",
                                          based_on_term: "",
                                          refundable: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">
                    Community Amenities/Features for All Residents
                  </h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="community_amenities">
                    {({
                      push,
                      remove,
                      form: {
                        values: { community_amenities },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {community_amenities.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    required={true}
                                    label={"Title"}
                                    placeholder={
                                      "24 Hour Emergency Maintenance"
                                    }
                                    name={`community_amenities[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index ===
                                  values.community_amenities.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          amount: "",
                                          based_on_term: "",
                                          refundable: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">
                    Required/Optional - Paid by Resident
                  </h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="lease_term">
                    {({
                      push,
                      remove,
                      form: {
                        values: { lease_term },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {lease_term.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    required={true}
                                    label={"Title"}
                                    placeholder={"Utilities"}
                                    name={`lease_term[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                  <Select
                                    name={`lease_term[${index}].optional`}
                                    required={true}
                                    label={"Optional/Required"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Optional",
                                        value: "Optional",
                                      },
                                      {
                                        label: "Required",
                                        value: "Required",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.lease_term.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          optional: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Available Utilities Provider</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="utilities">
                    {({
                      push,
                      remove,
                      form: {
                        values: { utilities },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {utilities.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Select
                                    name={`utilities[${index}].utility_type`}
                                    required={true}
                                    label={"Utility Type"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Electricity",
                                        value: "Electricity",
                                      },
                                      {
                                        label: "Internet",
                                        value: "Internet",
                                      },
                                      {
                                        label: "Cable",
                                        value: "Cable",
                                      },
                                      {
                                        label: "Others",
                                        value: "Others",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Input
                                    required={true}
                                    label={
                                      "Enter Provider and Separate it by comma(,)"
                                    }
                                    placeholder={"Txu Energy, Cirro"}
                                    name={`utilities[${index}].provider`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.utilities.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          utility_type: "",
                                          provider: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
                  <h3 className="font-medium">Pet Fees and Policy(Per Pet)</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:grid-cols-5">
                    <div>
                      <Input
                        label={"One-time Pet Fee(USD)"}
                        required={true}
                        placeholder={"200"}
                        name={`pet_one_time_fee`}
                        className={"py-2 px-2"}
                      />
                      <p>Non-Refundable</p>
                    </div>
                    <div>
                      <Input
                        label={"Security Deposit(USD)"}
                        required={true}
                        placeholder={"300"}
                        name={`pet_security_deposit`}
                        className={"py-2 px-2"}
                      />
                      <p>Refundable</p>
                    </div>
                    <Input
                      label={"Monthly Pet Rent(USD)"}
                      required={true}
                      placeholder={"600"}
                      name={`pet_monthly_rent`}
                      className={"py-2 px-2"}
                    />
                    <Input
                      label={"Max Pet Weight(lbs)"}
                      placeholder={"56"}
                      name={`pet_max_weight`}
                      className={"py-2 px-2"}
                    />
                    <SinglePdfUpload
                      id={`pet_policy_pdf`}
                      name={`pet_policy_pdf`}
                      label={"Upload File(.pdf)"}
                      accept={"application/pdf"}
                      placeholder={
                        values.pet_policy_pdf ? "1 PDF Uploaded" : "Upload PDF"
                      }
                      parentClassName={"w-fit"}
                      className={"min-w-max pr-5"}
                      setFieldValue={setFieldValue}
                      loading={loading}
                      data={data}
                    />
                  </div>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Parking</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="parking">
                    {({
                      push,
                      remove,
                      form: {
                        values: { parking },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {parking.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    required={true}
                                    label={"Title"}
                                    placeholder={"Open Parking"}
                                    name={`parking[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                  <Select
                                    name={`parking[${index}].free_paid`}
                                    required={true}
                                    label={"Free/Paid"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Free",
                                        value: "Free",
                                      },
                                      {
                                        label: "Paid",
                                        value: "Paid",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.parking.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          free_paid: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Schools</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="schools">
                    {({
                      push,
                      remove,
                      form: {
                        values: { schools },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {schools.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Select
                                    name={`schools[${index}].type`}
                                    required={true}
                                    label={"Schools Type"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Elementary",
                                        value: "Elementary",
                                      },
                                      {
                                        label: "Primary",
                                        value: "Primary",
                                      },
                                      {
                                        label: "High School",
                                        value: "High School",
                                      },
                                      {
                                        label: "College",
                                        value: "College",
                                      },
                                      {
                                        label: "University",
                                        value: "University",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Input
                                    required={true}
                                    label={"School Name"}
                                    placeholder={"Txu Energy, Cirro"}
                                    name={`schools[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                  <Input
                                    label={"Distance (Optional)"}
                                    placeholder={"3 Miles"}
                                    name={`schools[${index}].distance`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.schools.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          type: "",
                                          distance: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Transportation</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="transportation">
                    {({
                      push,
                      remove,
                      form: {
                        values: { transportation },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {transportation.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Select
                                    name={`transportation[${index}].type`}
                                    required={true}
                                    label={"Transportation Type"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Bus",
                                        value: "Bus",
                                      },
                                      {
                                        label: "Train",
                                        value: "Train",
                                      },
                                      {
                                        label: "Metro",
                                        value: "Metro",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Input
                                    required={true}
                                    label={"Transportation"}
                                    placeholder={"LARMANDA @ PARK - N - NS:"}
                                    name={`transportation[${index}].transportation`}
                                    className={"py-2 px-2"}
                                  />
                                  <Input
                                    label={"Stoppage Distance (Optional)"}
                                    placeholder={"3 Miles"}
                                    name={`transportation[${index}].stoppage`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index ===
                                  values.transportation.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          transportation: "",
                                          type: "",
                                          stoppage: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Rental Requirement</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="document">
                    {({
                      push,
                      remove,
                      form: {
                        values: { document },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {document.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Select
                                    name={`document[${index}].type`}
                                    required={true}
                                    label={"Required Document Type"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      {
                                        label: "Identity Proof",
                                        value: "Identity Proof",
                                      },
                                      {
                                        label: "Income Proof",
                                        value: "Income Proof",
                                      },
                                      {
                                        label: "Monthly Income",
                                        value: "Monthly Income",
                                      },
                                    ]}
                                    className={"w-full border px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Input
                                    required={true}
                                    label={"Document Name(One or Multiple)"}
                                    placeholder={""}
                                    name={`document[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.document.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          type: "",
                                          name: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Accessibility</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="accessibility">
                    {({
                      push,
                      remove,
                      form: {
                        values: { accessibility },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {accessibility.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    required={true}
                                    label={"Add Accessibility"}
                                    placeholder={"Accessibility"}
                                    name={`accessibility[${index}].add`}
                                    className={"py-2 px-2"}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.accessibility.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          add: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:border-dark-primary">
                  <h3 className="font-medium">Custom Rules</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="custom_policy">
                    {({
                      push,
                      remove,
                      form: {
                        values: { custom_policy },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {custom_policy.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
                                  <Input
                                    required={true}
                                    label={"Title of Rules/Policy"}
                                    placeholder={"Gym Rules"}
                                    name={`custom_policy[${index}].name`}
                                    className={"py-2 px-2"}
                                  />
                                  <Input
                                    label={"Web Page link(Optional)"}
                                    placeholder={"https://www.google.com/"}
                                    name={`custom_policy[${index}].website`}
                                    className={"py-2 px-2"}
                                  />
                                  <SinglePdfUpload
                                    id={`custom_policy[${index}].file`}
                                    name={`custom_policy[${index}].file`}
                                    label={"Upload File(.pdf)"}
                                    accept={"application/pdf"}
                                    placeholder={
                                      custom_policy[index].file
                                        ? "1 PDF Uploaded"
                                        : "Upload PDF"
                                    }
                                    parentClassName={"w-fit"}
                                    className={"min-w-max pr-5"}
                                    setFieldValue={setFieldValue}
                                    loading={loading}
                                    data={data}
                                  />
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div>
                                    {index > 0 ? (
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <Icons.Delete />
                                      </Button>
                                    ) : null}
                                  </div>
                                  {index === values.custom_policy.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          name: "",
                                          website: "",
                                          file: "",
                                        })
                                      }
                                    >
                                      <Icons.Plus />
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <TextArea
                  row={4}
                  placeholder="Write a short overview about the property"
                  name="about_property"
                  label="About the Property"
                  required
                />
                <UploadCoverPhoto
                  touched={touched.cover_image}
                  errors={errors.cover_image}
                  data={data}
                  loading={loading}
                  id={"cover_image"}
                  name={"cover_image"}
                  label={
                    "Upload Property Cover Photo (Best View Size 1280x720px)"
                  }
                  required={true}
                  coverPhoto={coverPhoto}
                  setCoverPhoto={setCoverPhoto}
                  setFieldValue={setFieldValue}
                  accept={"image/jpeg, image/png, image/jpg, image/webp"}
                />
                <div className="md:flex justify-start items-end md:space-x-4 space-y-4 md:space-y-0">
                  <FileUpload
                    data={data}
                    loading={loading}
                    touched={touched.listing_image}
                    errors={errors.listing_image}
                    id={"listing_image"}
                    placeholder={
                      listCardImagePreview
                        ? "1 Photo Uploaded "
                        : "Upload Image"
                    }
                    name={"listing_image"}
                    label={"Upload Listing Card Image"}
                    required={true}
                    accept={"image/jpeg, image/png, image/jpg, image/webp"}
                    setPreview={setListCardImagePreview}
                    setFieldValue={setFieldValue}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                  />
                  {/* {listCardImagePreview && (
                    <div className="mt-4">
                      <Button type="button" onClick={handleListingCard}>
                        View All
                      </Button>
                    </div>
                  )}
                  {listCardImagePreview && (
                    <Modal
                      title="Uploaded Images"
                      isOpen={isModalOpenListingCard}
                      onClose={handleCloseListingCard}
                      width="w-full"
                      height="md:h-screen"
                    >
                      <div className="rounded-lg w-96 overflow-hidden flex relative">
                        <LazyLoadImage
                          className="w-full rounded-lg object-cover"
                          src={`${config.url.ASSET_URL}${listCardImagePreview.link}`}
                          alt={`Preview`}
                          loading="lazy"
                        />
                        <button
                          onClick={() => {
                            setListCardImagePreview(null);
                            setFieldValue("listing_image", null);
                          }}
                          className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                          type="button"
                        >
                          <Icons.Close />
                        </button>
                      </div>
                    </Modal>
                  )} */}
                </div>
                <div className="md:flex justify-start items-end md:space-x-4 space-y-4 md:space-y-0">
                  <MultipleFileUpload
                    touched={touched.property_images}
                    errors={errors.property_images}
                    id={"property_images"}
                    name={"property_images"}
                    placeholder={"Upload Multiple Image"}
                    label={"Upload Property Gallery(.jpg,png)"}
                    required={true}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                    setFieldValue={setFieldValue}
                    data={data}
                    loading={loading}
                    preview={previewUrls}
                    setPreview={setPreviewUrls}
                    accept={"image/jpeg, image/png, image/jpg, image/webp"}
                  />
                  {previewUrls.length > 0 && (
                    <div>
                      {previewUrls.length > 0 && (
                        <div className="flex flex-wrap md:grid md:grid-cols-4 gap-4 lg:grid-cols-4  md:space-y-0">
                          {previewUrls.slice(0, 0).map((url, index) => (
                            <div
                              key={index}
                              className="h-32 w-32 overflow-hidden border relative rounded-lg"
                            >
                              <LazyLoadImage
                                className="h-32 w-32 rounded-lg object-cover"
                                src={`${config.url.ASSET_URL}${url.link}`}
                                alt={`Preview ${index}`}
                                loading="lazy"
                              />
                              <button
                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                onClick={() => handleRemoveImage(index)}
                                aria-label={`Remove image ${index}`}
                                type="button"
                              >
                                <Icons.Close />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {previewUrls.length > 0 && (
                        <div className="mt-4">
                          <Button type="button" onClick={openModal}>
                            View All
                          </Button>
                        </div>
                      )}
                      {isModalOpen && (
                        <Modal
                          title="Uploaded Images"
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          width="w-full"
                          height="md:h-screen"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                            {previewUrls.map((url, index) => (
                              <div
                                key={index + 4}
                                className="relative overflow-hidden"
                              >
                                <LazyLoadImage
                                  className="w-full h-full object-cover"
                                  src={`${config.url.ASSET_URL}${url.link}`}
                                  alt={`Preview ${index + 4}`}
                                  loading="lazy"
                                />
                                <button
                                  className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                  onClick={() => handleRemoveImage(index)}
                                  aria-label={`Remove image ${index}`}
                                >
                                  <Icons.Close />
                                </button>
                              </div>
                            ))}
                          </div>
                        </Modal>
                      )}
                    </div>
                  )}
                </div>
                <div className="md:flex justify-start items-end md:space-x-4 space-y-4 md:space-y-0">
                  <MultipleVideoUpload
                    touched={touched.property_videos}
                    errors={errors.property_videos}
                    name={"property_videos"}
                    label={"Upload Property Videos (Optional)"}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5 min-w-max"}
                    id={"property_videos"}
                    setFieldValue={setFieldValue}
                    data={data}
                    loading={loading}
                    preview={videos}
                    setPreview={setVideos}
                  />
                  <div>
                    {videos.length > 0 && (
                      <div>
                        <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                          {videos.slice(0, 0).map((video, index) => (
                            <div key={index} className="border relative">
                              <video className="w-60 max-h-[130px]" controls>
                                <source
                                  src={`${config.url.ASSET_URL}${video.link}`}
                                />
                              </video>
                              <button
                                type="button"
                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                                onClick={() => handleRemovePropertyVideo(index)}
                              >
                                <Icons.Close />
                              </button>
                            </div>
                          ))}
                        </div>
                        {videos.length > 0 && (
                          <Button
                            type="button"
                            className={"mt-4"}
                            onClick={handleOpenModal}
                          >
                            View All
                          </Button>
                        )}
                      </div>
                    )}
                    <Modal
                      isOpen={isModalOpenVideos}
                      onClose={handleCloseModal}
                      title="Uploaded Videos"
                      width="w-full"
                      height="md:h-screen"
                    >
                      <div className="flex flex-wrap gap-4">
                        {videos.map((video, index) => (
                          <div key={index} className="border relative">
                            <video className="w-60 max-h-[130px]" controls>
                              <source
                                src={`${config.url.ASSET_URL}${video.link}`}
                              />
                            </video>
                            <button
                              type="button"
                              className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                              onClick={() => handleRemovePropertyVideo(index)}
                            >
                              <Icons.Close />
                            </button>
                          </div>
                        ))}
                      </div>
                    </Modal>
                  </div>
                </div>
                <div className="md:flex justify-start items-end md:space-x-4 space-y-4 md:space-y-0">
                  <MultipleVideoUpload
                    name={"tour_videos"}
                    id={"tour_videos"}
                    label={"Upload Property Virtual Tour Videos (Optional)"}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                    setFieldValue={setFieldValue}
                    data={data}
                    loading={loading}
                    preview={videos2}
                    setPreview={setVideos2}
                  />
                  {videos2.length > 0 && (
                    <div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {/* Render the first 3 videos */}
                        {videos2.slice(0, 0).map((video, index) => (
                          <div key={index} className="border relative">
                            <video className="w-60 max-h-[130px]" controls>
                              <source
                                src={`${config.url.ASSET_URL}${video.link}`}
                              />
                            </video>
                            <button
                              type="button"
                              className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                              onClick={() => handleRemoveTourVideo(index)}
                            >
                              <Icons.Close />
                            </button>
                          </div>
                        ))}
                      </div>
                      {/* Show "View All" button if there are more than 3 videos */}
                      {videos2.length > 0 && (
                        <Button
                          type="button"
                          className={"mt-4"}
                          onClick={handleOpenModalVirtualTour}
                        >
                          View All
                        </Button>
                      )}
                    </div>
                  )}
                  {/* Modal for displaying all videos */}
                  <Modal
                    isOpen={isModalOpenVirtualTour}
                    onClose={handleCloseModalVirtualTour}
                    title="Uploaded Videos"
                    width="w-full"
                    height="md:h-screen"
                  >
                    <div className="flex flex-wrap gap-4">
                      {videos2.map((video, index) => (
                        <div key={index} className="border relative">
                          <video className="w-60 max-h-[130px]" controls>
                            <source
                              src={`${config.url.ASSET_URL}${video.link}`}
                            />
                          </video>
                          <button
                            type="button"
                            className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                            onClick={() => handleRemoveTourVideo(index)}
                          >
                            <Icons.Close />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Modal>
                </div>
                <div className="md:flex justify-start items-end">
                  <MultipleVideoUpload
                    name={"arial_videos"}
                    id={"arial_videos"}
                    label={"Upload Property Arial Video (Optional)"}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5"}
                    setFieldValue={setFieldValue}
                    data={data}
                    loading={loading}
                    preview={videos3}
                    setPreview={setVideos3}
                  />
                  <div>
                    {videos3.length > 0 && (
                      <div className="md:mx-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                          {/* Render the first 3 videos */}
                          {videos3.slice(0, 0).map((video, index) => (
                            <div key={index} className="border relative">
                              <video className="w-60 max-h-[130px]" controls>
                                <source
                                  src={`${config.url.ASSET_URL}${video.link}`}
                                />
                              </video>
                              <button
                                type="button"
                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                                onClick={() => handleRemoveArialVideo(index)}
                              >
                                <Icons.Close />
                              </button>
                            </div>
                          ))}
                        </div>
                        {/* Show "View All" button if there are more than 3 videos */}
                        {videos3.length > 0 && (
                          <Button
                            type="button"
                            onClick={handleIsModalArielViw}
                            className={"mt-4"}
                          >
                            View All
                          </Button>
                        )}
                      </div>
                    )}
                    {/* Modal for displaying all videos */}
                    <Modal
                      isOpen={isModalArielViw}
                      onClose={closeIsModalArielViw}
                      title="Uploaded Videos"
                      width="w-full"
                      height="md:h-screen"
                    >
                      <div className="flex flex-wrap gap-4">
                        {videos3.map((video, index) => (
                          <div key={index} className="border relative">
                            <video className="w-60 max-h-[130px]" controls>
                              <source
                                src={`${config.url.ASSET_URL}${video.link}`}
                              />
                            </video>
                            <button
                              type="button"
                              className="absolute right-2 top-2 bg-white rounded-full p-1 text-red-500"
                              onClick={() => handleRemoveArialVideo(index)}
                            >
                              <Icons.Close />
                            </button>
                          </div>
                        ))}
                      </div>
                    </Modal>
                  </div>
                </div>

                <div className="space-x-3">
                  <Button onClick={() => setPublished(false)} type={"submit"}>
                    Save Draft
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
