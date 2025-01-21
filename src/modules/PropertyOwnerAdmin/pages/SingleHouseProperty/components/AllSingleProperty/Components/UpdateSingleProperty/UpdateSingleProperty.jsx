import {
  Button,
  Datepicker,
  FileUpload,
  Input,
  Modal,
  MultipleFileUpload,
  MultipleSelectParent,
  MultipleVideoUpload,
  RadioButton,
  Select,
  TextArea,
} from "@/components";
import { SinglePdfUpload } from "@/components/SinglePdfUpload";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { UploadCoverPhoto } from "@/modules/PropertyOwnerAdmin/pages/AllProperty/Components";
import { getAllAsset } from "@/services/asset/asset";
import {
  publishSingleProperty,
  updateSingleProperty,
} from "@/services/singleProperty/singleProperty";
import { formatDate, Icons } from "@/utils";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import states from "states-us";
import * as Yup from "yup";

const option = [
  {
    label: "3 Months",
    value: "3 Months",
  },
  {
    label: "4 Months",
    value: "4 Months",
  },
  {
    label: "5 Months",
    value: "5 Months",
  },
  {
    label: "6 Months",
    value: "6 Months",
  },
  {
    label: "7 Months",
    value: "7 Months",
  },
  {
    label: "8 Months",
    value: "8 Months",
  },
  {
    label: "9 Months",
    value: "9 Months",
  },
  {
    label: "10 Months",
    value: "10 Months",
  },
  {
    label: "11 Months",
    value: "11 Months",
  },
  {
    label: "12 Months",
    value: "12 Months",
  },
  {
    label: "13 Months",
    value: "13 Months",
  },
  {
    label: "14 Months",
    value: "14 Months",
  },
  {
    label: "15 Months",
    value: "15 Months",
  },
  {
    label: "16 Months",
    value: "16 Months",
  },
  {
    label: "17 Months",
    value: "17 Months",
  },
  {
    label: "18 Months",
    value: "18 Months",
  },
  {
    label: "19 Months",
    value: "19 Months",
  },
  {
    label: "20 Months",
    value: "20 Months",
  },
  {
    label: "21 Months",
    value: "21 Months",
  },
  {
    label: "22 Months",
    value: "22 Months",
  },
  {
    label: "23 Months",
    value: "23 Months",
  },
  {
    label: "24 Months",
    value: "24 Months",
  },
];

const initialValues = {
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  security_deposit: "",
  admin_fee: "",
  bed_count: "",
  bath_count: "",
  space: "",
  rent_paying: "",
  max_occupancy: "",
  max_vehicle: "",
  discount_name: "",
  discount_amount: "",
  pest_control_fee: "",
  trash_fee: "",
  renter_liability_fee: "",
  availability: "",
  user_email: "",
  available_date: "",
  late_percentage: "",
  country: "",
  statement: "",
  payment: "",
  website: "",
  about_property: "",
  cover_image: "",
  listing_image: "",
  applicant_fee: "",
  co_applicant_fee: "",
  dependent_fee: "",
  pet_one_time_fee: "",
  pet_security_deposit: "",
  pet_monthly_rent: "",
  pet_max_weight: "",
  pet_policy_pdf: "",

  rent_and_lease: [
    {
      lease_term: "",
      rent: "",
      default: "",
    },
  ],

  amenities: [
    {
      title: "",
    },
  ],

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

  utilities: [
    {
      utility_type: "",
      provider: "",
    },
  ],
  utilities_resident: [
    {
      required: "",
      type: "",
      additional_note: "",
    },
  ],
  parking: [
    {
      name: "",
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
};

const validationSchema = Yup.object({
  bed_count: Yup.string().required("Required!"),
  bath_count: Yup.string().required("Required!"),
  space: Yup.string().required("Required!"),
  rent_paying: Yup.string().required("Required!"),
  availability: Yup.string().required("Required!"),
  user_email: Yup.string().test(
    "email-required-if-occupied",
    "Required!",
    function (value) {
      const { availability } = this.parent;
      if (availability === "Occupied") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  amenities: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().trim().required("required"),
    })
  ),
  rent_and_lease: Yup.array().of(
    Yup.object().shape({
      lease_term: Yup.string().trim().required("required"),
      rent: Yup.string().trim().required("required"),
    })
  ),
  pet_one_time_fee: Yup.string().trim().required("Required!"),
  pet_security_deposit: Yup.string().trim().required("Required!"),
  pet_monthly_rent: Yup.string().trim().required("Required!"),
  address: Yup.string().trim().required("Required!"),
  city: Yup.string().trim().required("Required!"),
  state: Yup.string().trim().required("Required!"),
  zip: Yup.string().trim().required("Required!"),
  country: Yup.string().trim().required("Required!"),
  statement: Yup.string().trim().required("Required!"),
  payment: Yup.string().trim().required("Required!"),
  cover_image: Yup.string().required("Required!"),
  listing_image: Yup.string().required("Image Required!"),
  about_property: Yup.string().trim().required("Required!"),
  applicant_fee: Yup.number().required("Required!"),
  co_applicant_fee: Yup.number().required("Required!"),
  dependent_fee: Yup.number().required("Required!"),
  property_images: Yup.array()
    .of(Yup.string())
    .required("Image required!")
    .min(1, "Image required!"),
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
  utilities_resident: Yup.array().of(
    Yup.object().shape({
      required: Yup.string().trim().required("required"),
      type: Yup.string().trim().required("required"),
    })
  ),
  parking: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
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

export const UpdateSingleProperty = ({ item }) => {
  const stateOptions = [
    {
      label: "Select State",
      value: "",
    },
    ...states.map((item) => {
      return { label: item.name, value: item.abbreviation };
    }),
  ];
  const dispatch = useAppDispatch();

  const {
    name,
    address,
    city,
    state,
    zip,
    security_deposit,
    admin_fee,
    bed_count,
    bath_count,
    space,
    rent_paying,
    max_occupancy,
    max_vehicle,
    discount_name,
    discount_amount,
    pest_control_fee,
    trash_fee,
    renter_liability_fee,
    availability,
    user_email,
    available_date,
    late_percentage,
    country,
    statement,
    payment,
    website,
    about_property,
    cover_image,
    listing_image,
    applicant_fee,
    co_applicant_fee,
    dependent_fee,
    pet_one_time_fee,
    pet_security_deposit,
    pet_monthly_rent,
    pet_max_weight,
    pet_policy_pdf,

    rent_and_lease,

    amenities,

    tour_accept_hours,
    property_images,
    property_videos,
    tour_videos,
    arial_videos,
    accessibility,
    utilities,
    utilities_resident,
    parking,
    schools,
    transportation,
    document,
    custom_policy,
    published,
    singlePropertyId,
  } = item;

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
  const closeIsModalArielViw1 = () => {
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
  const closeModal1 = () => setIsModalOpen(false);

  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  const handlePublish = (id) => {
    dispatch(publishSingleProperty(id));
  };

  const onSubmit = (values) => {
    dispatch(updateSingleProperty(values));
  };

  return (
    <div className="w-full">
      <div className="w-full space-y-10">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, touched, errors, values, setValues }) => {
            useEffect(() => {
              setCoverPhoto(cover_image);
              setListCardImagePreview(listing_image);
              setPreviewUrls(property_images);
              setVideos(property_videos ? property_videos : []);
              setVideos2(tour_videos ? tour_videos : []);
              setVideos3(arial_videos ? arial_videos : []);
              setValues({
                singlePropertyId,
                security_deposit,
                admin_fee,
                bed_count,
                bath_count,
                space,
                rent_paying,
                max_occupancy,
                max_vehicle,
                discount_name,
                discount_amount,
                pest_control_fee,
                trash_fee,
                renter_liability_fee,
                availability:
                  availability === "Moving-Out" ? "Occupied" : availability,
                user_email,
                available_date,
                late_percentage,
                pet_one_time_fee,
                pet_security_deposit,
                pet_monthly_rent,
                pet_max_weight,
                pet_policy_pdf,
                name,
                about_property,

                rent_and_lease,

                amenities,

                utilities_resident,
                accessibility: accessibility ? accessibility : [{ add: "" }],
                address,
                arial_videos: arial_videos
                  ? arial_videos.map((item) => item.assetId)
                  : [],
                city,
                country,
                cover_image: cover_image.assetId,
                custom_policy,
                document,
                listing_image: listing_image.assetId,
                parking,
                payment,
                property_images: property_images.map((item) => item.assetId),
                property_videos: property_videos
                  ? property_videos.map((item) => item.assetId)
                  : [],
                schools,
                state,
                statement,
                tour_videos: tour_videos
                  ? tour_videos.map((item) => item.assetId)
                  : [],
                transportation,
                utilities,
                website,
                zip,
                applicant_fee,
                co_applicant_fee,
                dependent_fee,
                tour_accept_hours,
              });
            }, []);

            const handleRemoveImage = (index) => {
              const newPreviews = [...previewUrls];
              newPreviews.splice(index, 1);
              setPreviewUrls(newPreviews);
              setFieldValue(
                "property_images",
                newPreviews.map((item) => item.assetId)
              );
            };

            const handleRemovePropertyVideo = (index) => {
              const newPreviews = [...videos];
              newPreviews.splice(index, 1);
              setVideos(newPreviews);
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
                <div className="space-x-3 w-full text-end">
                  {published && <Button type={"submit"}>Update Now</Button>}
                  {!published && <Button type={"submit"}>Save Draft</Button>}
                  {!published && (
                    <Button
                      onClick={() =>
                        handlePublish({ singlePropertyId: singlePropertyId })
                      }
                      type={"button"}
                    >
                      Publish
                    </Button>
                  )}
                  {published && (
                    <Button
                      onClick={() =>
                        handlePublish({ singlePropertyId: singlePropertyId })
                      }
                      type={"button"}
                    >
                      Unpublish
                    </Button>
                  )}
                </div>
                <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <Input
                    label={"Property Name"}
                    placeholder={"Write Property Name"}
                    name={"name"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Property Street Address"}
                    placeholder={"4055 S Great SW Pkwy"}
                    name={"address"}
                    className={"py-2 px-2"}
                    parentClassName={"col-span-2"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Property City"}
                    placeholder={"Texas"}
                    name={"city"}
                    className={"py-2 px-2"}
                    parentClassName={"col-span-1"}
                  />
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
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
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
                  <Select
                    name={"bed_count"}
                    required={true}
                    label={"Bed Count"}
                    options={[
                      {
                        label: "Number of Beds",
                        value: "",
                      },
                      {
                        label: "Studio",
                        value: "Studio",
                      },
                      {
                        label: "1 Bed",
                        value: "1 Bed",
                      },
                      {
                        label: "2 Beds",
                        value: "2 Beds",
                      },
                      {
                        label: "3 Beds",
                        value: "3 Beds",
                      },
                      {
                        label: "4 Beds",
                        value: "4 Beds",
                      },
                      {
                        label: "5 Beds",
                        value: "5 Beds",
                      },
                    ]}
                    className={"w-full px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Select
                    name={"bath_count"}
                    required={true}
                    label={"Bath Count"}
                    options={[
                      {
                        label: "Number of Baths",
                        value: "",
                      },
                      {
                        label: "1 Bath",
                        value: "1 Bath",
                      },
                      {
                        label: "1.5 Baths",
                        value: "1.5 Baths",
                      },
                      {
                        label: "2 Baths",
                        value: "2 Baths",
                      },
                      {
                        label: "2.5 Baths",
                        value: "2.5 Baths",
                      },
                      {
                        label: "3 Baths",
                        value: "3 Baths",
                      },
                      {
                        label: "3.5 Baths",
                        value: "3.5 Baths",
                      },
                      {
                        label: "4 Baths",
                        value: "4 Baths",
                      },
                      {
                        label: "4.5 Baths",
                        value: "4.5 Baths",
                      },
                      {
                        label: "5 Baths",
                        value: "5 Baths",
                      },
                      {
                        label: "5.5 Baths",
                        value: "5.5 Baths",
                      },
                    ]}
                    className={"w-full px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Space in Sqft"}
                    placeholder={"612"}
                    type={"number"}
                    name={"space"}
                    className={"py-2 px-2"}
                  />
                  <Select
                    name={"rent_paying"}
                    required={true}
                    label={"Rent Paying Every"}
                    options={[
                      {
                        label: "Select Paying Term",
                        value: "",
                      },
                      {
                        label: "Monthly",
                        value: "Monthly",
                      },
                    ]}
                    className={"w-full px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
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
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
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
                    required={true}
                    name={"availability"}
                    label={"Availability"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "Occupied",
                        value: "Occupied",
                      },
                      {
                        label: "Vacant",
                        value: "Vacant",
                      },
                    ]}
                    className={"w-full px-2"}
                    parentClassName={"w-full px-0 py-0"}
                    onChange={(e) => {
                      setFieldValue("availability", e.target.value);
                      if (e.target.value !== "Occupied") {
                        setFieldValue("user_email", "");
                      }
                    }}
                  />
                  <Input
                    required={true}
                    label={"Add Resident Email"}
                    placeholder={"yourname@email.com"}
                    type={"email"}
                    name={"user_email"}
                    className={"py-2 px-2"}
                    disabled={values.availability !== "Occupied" ? true : false}
                  />
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
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
                  <Input
                    label={"Dependent Fee(18/18+)"}
                    required={true}
                    placeholder={"20"}
                    name={"dependent_fee"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
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
                    label={"Security Deposit (Optional)"}
                    placeholder={"500"}
                    type={"number"}
                    name={"security_deposit"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Admin Fee (Optional)"}
                    placeholder={"300"}
                    type={"number"}
                    name={"admin_fee"}
                    className={"py-2 px-2"}
                  />
                </div>

                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Input
                    label={"Pest Control Fee (Optional)"}
                    placeholder={"30"}
                    type={"number"}
                    name={"pest_control_fee"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Trash Management Fee (Optional)"}
                    placeholder={"20"}
                    type={"number"}
                    name={"trash_fee"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Renter Liability Fee (Optional)"}
                    placeholder={"50"}
                    type={"number"}
                    name={"renter_liability_fee"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <Datepicker
                    name={"available_date"}
                    errors={errors.available_date}
                    touched={touched.available_date}
                    className={""}
                    parentClassName={"md:px-0 md:py-0"}
                    onChange={(e) => {
                      const date = formatDate(e);
                      setFieldValue("available_date", date);
                    }}
                    setFieldValue={setFieldValue}
                    placeholder={"08/12/2024"}
                    label={"Set Available Date(Optional)"}
                    value={values.available_date}
                    minDate={new Date()}
                  />
                  <Input
                    label={"Max Occupancy (Optional)"}
                    placeholder={"5"}
                    type={"number"}
                    name={"max_occupancy"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Max Vehicle (Optional)"}
                    placeholder={"2"}
                    type={"number"}
                    name={"max_vehicle"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  <Input
                    label={"Late Fees in Percentage (Optional)"}
                    placeholder={"7%"}
                    name={"late_percentage"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Property Website(Optional)"}
                    placeholder={"Property Website"}
                    name={"website"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
                  <h3 className="font-medium">Rent and Lease</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="rent_and_lease">
                    {({
                      push,
                      remove,
                      form: {
                        values: { rent_and_lease },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {rent_and_lease.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="w-full grid grid-cols-3 gap-6 place-content-end">
                                  <Select
                                    name={`rent_and_lease[${index}].lease_term`}
                                    required={true}
                                    label={"Available Lease Term"}
                                    options={[
                                      {
                                        label: "Select One",
                                        value: "",
                                      },
                                      ...option,
                                    ]}
                                    className={"w-full px-2"}
                                    parentClassName={"w-full px-0 py-0"}
                                  />
                                  <Input
                                    required={true}
                                    label={"Rent"}
                                    type={"number"}
                                    placeholder={"300"}
                                    name={`rent_and_lease[${index}].rent`}
                                    className={"py-2 px-2"}
                                  />
                                  <RadioButton
                                    label={"Set Default Term"}
                                    name={"default"}
                                    className={"flex justify-start items-end"}
                                    checked={
                                      values.rent_and_lease[index].default ===
                                      "yes"
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFieldValue(
                                          `rent_and_lease[${index}].default`,
                                          "yes"
                                        );
                                      } else {
                                        setFieldValue(
                                          `rent_and_lease[${index}].default`,
                                          "no"
                                        );
                                      }
                                    }}
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
                                  values.rent_and_lease.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          lease_term: "",
                                          rent: "",
                                          default: "",
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
                  <h3 className="font-medium">Add Discount (Optional)</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <div className="md:flex justify-start items-center md:space-x-10 w-full relative space-y-5 md:space-y-0">
                    <Input
                      label={"Title"}
                      placeholder={"Student"}
                      name={`discount_name`}
                      className={"py-2 px-2"}
                    />
                    <Input
                      label={"Amount"}
                      placeholder={"200"}
                      name={`discount_amount`}
                      className={"py-2 px-2"}
                    />
                  </div>
                </div>
                <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
                  <h3 className="font-medium">Amenities/Features</h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="amenities">
                    {({
                      push,
                      remove,
                      form: {
                        values: { amenities },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {amenities.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="md:flex justify-start items-center md:space-x-10 w-full relative space-y-5 md:space-y-0">
                                  <Input
                                    required={true}
                                    label={"Title"}
                                    placeholder={"Dishwasher"}
                                    name={`amenities[${index}].title`}
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
                                  {index === values.amenities.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          title: "",
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
                  <h3 className="font-medium">
                    Utilities Paid by Resident to the Provider
                  </h3>
                  <hr className="border-gray-300 mt-1 mb-3" />
                  <FieldArray name="utilities_resident">
                    {({
                      push,
                      remove,
                      form: {
                        values: { utilities_resident },
                      },
                    }) => {
                      return (
                        <div className="space-y-2 w-full">
                          {utilities_resident.map((_, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-col justify-start items-end space-y-4 w-full"
                              >
                                <div className="w-full md:grid md:grid-cols-4 md:gap-6 space-y-5 md:space-y-0">
                                  <div className="col-span-1">
                                    <Select
                                      name={`utilities_resident[${index}].required`}
                                      required={true}
                                      label={"Required/Optional at Move-In"}
                                      options={[
                                        {
                                          label: "Select One",
                                          value: "",
                                        },
                                        {
                                          label: "Required",
                                          value: "Required",
                                        },
                                        {
                                          label: "Optional",
                                          value: "Optional",
                                        },
                                      ]}
                                      className={"w-full border px-2"}
                                      parentClassName={"w-full px-0 py-0"}
                                    />
                                  </div>
                                  <div className="col-span-1">
                                    <Select
                                      name={`utilities_resident[${index}].type`}
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
                                          label: "Gas",
                                          value: "Gas",
                                        },
                                        {
                                          label: "Others",
                                          value: "Others",
                                        },
                                      ]}
                                      className={"w-full border px-2"}
                                      parentClassName={"w-full px-0 py-0"}
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Input
                                      label={
                                        "Utility Provider/Additional Notes (Optional)"
                                      }
                                      placeholder={"Add Note"}
                                      name={`utilities_resident[${index}].additional_note`}
                                      className={"py-2 px-2"}
                                      parentClassName={""}
                                    />
                                  </div>
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
                                  values.utilities_resident.length - 1 ? (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        push({
                                          type: "",
                                          required: "",
                                          additional_note: "",
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
                  required={true}
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
                              <img
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
                                <img
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
                      onClose={closeIsModalArielViw1}
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
                <div className="space-x-3 w-full text-end">
                  {published && <Button type={"submit"}>Update Now</Button>}
                  {!published && <Button type={"submit"}>Save Draft</Button>}
                  {!published && (
                    <Button
                      onClick={() =>
                        handlePublish({ singlePropertyId: singlePropertyId })
                      }
                      type={"button"}
                    >
                      Publish
                    </Button>
                  )}
                  {published && (
                    <Button
                      onClick={() =>
                        handlePublish({ singlePropertyId: singlePropertyId })
                      }
                      type={"button"}
                    >
                      Unpublish
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
