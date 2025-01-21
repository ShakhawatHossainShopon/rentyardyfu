import {
  Button,
  CheckboxButton,
  Datepicker,
  FileUpload,
  Input,
  Modal,
  MultipleFileUpload,
  Select,
  SingleVideoUpload,
} from "@/components";
import { config } from "@/config";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import {
  publishApartment,
  updateApartment,
} from "@/services/apartment/apartment";
import { formatDate, Icons } from "@/utils";
import { FieldArray, Form, Formik } from "formik";
import { memo, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";

const options = [
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
  security_deposit: "",
  admin_fee: "",
  address: "",
  propertyId: "",
  type: "",
  unit_number: "",
  unit_name: "",
  building_name: "",
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
  rent_and_lease: [
    {
      lease_term: "",
      rent: "",
    },
  ],
  availability: "",
  user_email: "",
  available_date: "",
  amenities: [
    {
      title: "",
    },
  ],
  fees: [
    {
      title: "",
      amount: "",
      time: "",
      refundable: "",
    },
  ],
  utilities: [
    {
      type: "",
      required: "",
      additional_note: "",
    },
  ],
  floor_plans: [],
  unit_image: "",
  tour_video: "",
  gallery_images: [],
};

const validationSchema = Yup.object().shape({
  security_deposit: Yup.number().required("Required!"),
  admin_fee: Yup.number().required("Required!"),
  propertyId: Yup.string().required("Required!"),
  type: Yup.string().required("Required!"),
  pest_control_fee: Yup.string().required("Required!"),
  trash_fee: Yup.string().required("Required!"),
  renter_liability_fee: Yup.string().required("Required!"),
  unit_number: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Only alphanumeric characters are allowed, no spaces"
    )
    .trim() // Removes leading and trailing spaces
    .required("Required!"),
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
  fees: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().trim().required("required"),
      amount: Yup.string().trim().required("required"),
      time: Yup.string().trim().required("required"),
      refundable: Yup.string().trim().required("required"),
    })
  ),
  utilities: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().trim().required("required"),
      required: Yup.string().trim().required("required"),
    })
  ),
  floor_plans: Yup.array()
    .of(Yup.string())
    .required("Image required!")
    .min(1, "Image required!"),
  gallery_images: Yup.array()
    .of(Yup.string())
    .required("Image required!")
    .min(1, "Image required!"),
});

const UpdateApartment = memo(({ item, propertyOptions }) => {
  const [isRenovated, setRenovated] = useState();
  const [current_property, setCurrent_property] = useState();
  const [tourPreview, setTourPreview] = useState();
  const [mapPreview, setMapPreview] = useState();
  const [previewUrls, setPreviewUrls] = useState([]);
  const [previewUrls2, setPreviewUrls2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      updateApartment({
        ...values,
        current_property: current_property,
        renovated: isRenovated,
      })
    );
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalGallery = () => {
    setIsModalOpenGallery(true);
  };
  const closeModalGallery = () => setIsModalOpenGallery(false);
  const { loading, data } = useGetAllAssetSelector();

  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };
  const handleOpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  const handleCloseVirtualTour = () => {
    setIsModalOpenVirtualTour(false);
  };

  const {
    address,
    renovated,
    discount_name,
    discount_amount,
    security_deposit,
    rent_and_lease,
    admin_fee,
    published,
    amenities,
    apartmentId,
    availability,
    available_date,
    bath_count,
    bed_count,
    building_name,
    creatorId,
    fees,
    floor_plans,
    gallery_images,
    propertyId,
    property_name,
    rent_paying,
    space,
    tour_video,
    type,
    unit_image,
    unit_name,
    unit_number,
    userId,
    user_email,
    utilities,
    max_vehicle,
    max_occupancy,
    pest_control_fee,
    trash_fee,
    renter_liability_fee,
  } = item;

  const handlePublish = (id) => {
    dispatch(publishApartment(id));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values, setValues }) => {
        useEffect(() => {
          setCurrent_property(propertyId);
          setTourPreview(tour_video ? tour_video : "");
          setMapPreview(unit_image ? unit_image : "");
          setPreviewUrls(floor_plans.map((image) => image));
          setPreviewUrls2(gallery_images.map((image) => image));
          setRenovated(renovated);
          setValues({
            pest_control_fee,
            trash_fee,
            renter_liability_fee,
            address,
            discount_name,
            discount_amount,
            security_deposit,
            rent_and_lease: rent_and_lease
              ? rent_and_lease
              : [{ lease_term: "", rent: "" }],
            admin_fee,
            amenities,
            apartmentId,
            availability,
            available_date,
            bath_count,
            bed_count,
            building_name,
            creatorId,
            fees,
            floor_plans: floor_plans.map((floor_plan) => floor_plan.assetId),
            gallery_images: gallery_images.map(
              (gallery_image) => gallery_image.assetId
            ),
            propertyId,
            property_name,
            rent_paying,
            space,
            tour_video: tour_video ? tour_video.assetId : "",
            type,
            unit_image: unit_image ? unit_image.assetId : "",
            unit_name,
            unit_number,
            userId,
            user_email,
            utilities,
            published,
            max_vehicle,
            max_occupancy,
          });
        }, []);

        const handleRemoveImage = (index) => {
          const newPreviews = [...previewUrls];
          newPreviews.splice(index, 1);
          setPreviewUrls(newPreviews);
          if (newPreviews.length === 0) {
            setFieldValue("floor_plans", []);
          }
          setFieldValue(
            "floor_plans",
            newPreviews.map((item) => item.assetId)
          );
        };
        const handleRemoveImage2 = (index) => {
          const newPreviews = [...previewUrls2];
          newPreviews.splice(index, 1);
          setPreviewUrls2(newPreviews);
          if (newPreviews.length === 0) {
            setFieldValue("gallery_images", []);
          }
          setFieldValue(
            "gallery_images",
            newPreviews.map((item) => item.assetId)
          );
        };
        return (
          <Form className="w-full space-y-5">
            <div className="space-x-3 w-full text-end">
              {published && (
                <Button
                  onClick={() => {
                    if (!values.user_email) {
                      setFieldValue("user_email", "");
                    }
                  }}
                  type={"submit"}
                >
                  Update Now
                </Button>
              )}
              {!published && (
                <Button
                  onClick={() => {
                    if (!values.user_email) {
                      setFieldValue("user_email", "");
                    }
                  }}
                  type={"submit"}
                >
                  Save Draft
                </Button>
              )}
              {!published && (
                <Button
                  onClick={() =>
                    handlePublish({
                      propertyId: propertyId,
                      apartmentId: apartmentId,
                    })
                  }
                  type={"button"}
                >
                  Publish
                </Button>
              )}
              {published && (
                <Button
                  onClick={() =>
                    handlePublish({
                      propertyId: propertyId,
                      apartmentId: apartmentId,
                    })
                  }
                  type={"button"}
                >
                  Unpublish
                </Button>
              )}
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"propertyId"}
                required={true}
                label={"Select Property"}
                options={[
                  {
                    label: "Select Property",
                    value: "",
                  },
                  ...propertyOptions,
                ]}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"type"}
                required={true}
                label={"Unit Type"}
                options={[
                  {
                    label: "Select Unit Type",
                    value: "",
                  },
                  {
                    label: "Apt",
                    value: "Apt",
                  },
                  {
                    label: "Flat",
                    value: "Flat",
                  },
                  {
                    label: "House",
                    value: "House",
                  },
                  {
                    label: "Condo",
                    value: "Condo",
                  },
                  {
                    label: "Town House",
                    value: "Town House",
                  },
                  {
                    label: "Duplexes",
                    value: "Duplexes",
                  },
                ]}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Unit Number"}
                placeholder={"Eg. 223"}
                name={"unit_number"}
                className={"py-2 px-2 uppercase"}
                onKeyDown={(e) => {
                  if (!/[a-zA-Z0-9,]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
              <div className="col-span-2">
                <Input
                  label={"Street address if different from property (Optional)"}
                  placeholder={"1629 Pallet Street"}
                  name={"address"}
                  className={"py-2 px-2"}
                />
              </div>
              <Input
                label={"Unit Name(Optional)"}
                placeholder={"Eg. A1"}
                name={"unit_name"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"Building Name(Optional)"}
                placeholder={"Eg. B"}
                name={"building_name"}
                className={"py-2 px-2"}
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
                placeholder={"Apt Space"}
                name={"space"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Security Deposit"}
                required={true}
                placeholder={"$500"}
                type={"number"}
                name={"security_deposit"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Admin Fee"}
                required={true}
                placeholder={"$300"}
                type={"number"}
                name={"admin_fee"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
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
                placeholder={"johndoe@email.com"}
                type={"email"}
                name={"user_email"}
                className={"py-2 px-2"}
                disabled={values.availability !== "Occupied" ? true : false}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                label={"Pest Control Fee"}
                required={true}
                placeholder={"30"}
                type={"number"}
                name={"pest_control_fee"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Trash Management Fee"}
                required={true}
                placeholder={"20"}
                type={"number"}
                name={"trash_fee"}
                className={"py-2 px-2"}
              />
              <Input
                label={"Renter Liability Fee"}
                required={true}
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
                className={"bg-white"}
                parentClassName={"md:px-0 md:py-0 bg-transparent"}
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

            <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
              <h3 className="font-medium text-black darkText text-base">
                Rent and Lease
              </h3>
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
                            <div className="md:flex justify-start items-center md:space-x-10 w-full relative space-y-5 md:space-y-0">
                              <Select
                                name={`rent_and_lease[${index}].lease_term`}
                                required={true}
                                label={"Available Lease Term"}
                                options={[
                                  {
                                    label: "Select One",
                                    value: "",
                                  },
                                  ...options,
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
                              {index === values.rent_and_lease.length - 1 ? (
                                <Button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      lease_term: "",
                                      rent: "",
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
              <h3 className="font-medium text-black darkText text-base">
                Add Discount (Optional)
              </h3>
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
              <h3 className="font-medium text-black darkText text-base">
                Amenities/Features in the Apt/Flat
              </h3>
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
                            <div className="md:flex justify-start items-center md:space-x-10 space-y-5 md:space-y-0 w-full relative">
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
              <h3 className="font-medium text-black darkText text-base">
                Add Fees(One Time/Monthly)
              </h3>
              <hr className="border-gray-300 mt-1 mb-3" />
              <FieldArray name="fees">
                {({
                  push,
                  remove,
                  form: {
                    values: { fees },
                  },
                }) => {
                  return (
                    <div className="space-y-2 w-full">
                      {fees.map((_, index) => {
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
                                  name={`fees[${index}].title`}
                                  className={"py-2 px-2"}
                                />
                              </div>
                              <Input
                                required={true}
                                label={"Amount"}
                                placeholder={"$50"}
                                name={`fees[${index}].amount`}
                                className={"py-2 px-2"}
                              />
                              <Select
                                name={`fees[${index}].time`}
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
                                name={`fees[${index}].refundable`}
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
                              {index === values.fees.length - 1 ? (
                                <Button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      title: "",
                                      amount: "",
                                      time: "",
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
            <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
              <h3 className="font-medium text-black darkText text-base">
                Resident Utilities(Rent/Billed to Provider Separately)
              </h3>
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
                            <div className="w-full md:grid md:grid-cols-4 md:gap-6 space-y-5 md:space-y-0">
                              <div className="col-span-1">
                                <Select
                                  name={`utilities[${index}].required`}
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
                                  name={`utilities[${index}].type`}
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
                                  name={`utilities[${index}].additional_note`}
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
                              {index === values.utilities.length - 1 ? (
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
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <MultipleFileUpload
                touched={touched.floor_plans}
                errors={errors.floor_plans}
                id={"floor_plans"}
                name={"floor_plans"}
                placeholder={"Upload Floor Plan"}
                label={"Upload Apartment Floor Plan"}
                required={true}
                parentClassName={"w-fit"}
                className={"w-fit pr-5 darkText"}
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
                    <div className="md:flex justify-start items-center md:space-x-3 space-y-5 md:space-y-0">
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
                            className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                            onClick={() => handleRemoveImage(index)}
                            aria-label={`Remove image ${index}`}
                          >
                            <Icons.Close />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {previewUrls.length > 0 && (
                    <div className="mt-4">
                      <Button type={"button"} onClick={openModal}>
                        View All
                      </Button>
                    </div>
                  )}
                  {isModalOpen && (
                    <Modal
                      title="Uploaded Floor Plan Images"
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
                              type="button"
                              className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
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
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <MultipleFileUpload
                touched={touched.gallery_images}
                errors={errors.gallery_images}
                id={"gallery_images"}
                name={"gallery_images"}
                placeholder={"Upload Apartment Images"}
                label={"Upload Apartment Image Gallery"}
                required={true}
                parentClassName={"w-fit"}
                className={"w-fit pr-5 darkText"}
                setFieldValue={setFieldValue}
                data={data}
                loading={loading}
                preview={previewUrls2}
                setPreview={setPreviewUrls2}
                accept={"image/jpeg, image/png, image/jpg, image/webp"}
              />
              {previewUrls2.length > 0 && (
                <div>
                  <div className="md:flex justify-start items-center md:space-x-3 md:space-y-0 space-y-5">
                    {previewUrls2.slice(0, 0).map((url, index) => (
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
                          type="button"
                          className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                          onClick={() => handleRemoveImage2(index)}
                          aria-label={`Remove image ${index}`}
                        >
                          <Icons.Close />
                        </button>
                      </div>
                    ))}
                    {isModalOpenGallery && (
                      <Modal
                        title="Uploaded Apartment Image Gallery"
                        isOpen={isModalOpenGallery}
                        onClose={closeModalGallery}
                        width="w-full"
                        height="md:h-screen"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                          {previewUrls2.map((url, index) => (
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
                                type="button"
                                className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                                onClick={() => handleRemoveImage2(index)}
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
                  {previewUrls2.length > 0 && (
                    <div className="mt-4">
                      <Button type={"button"} onClick={openModalGallery}>
                        View All
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <FileUpload
                data={data}
                loading={loading}
                touched={touched.unit_image}
                errors={errors.unit_image}
                id={"unit_image"}
                placeholder={
                  mapPreview ? "1 Photo Uploaded" : "Unit Map image if you have"
                }
                name={"unit_image"}
                label={"Upload Unit Map Image(Optional)"}
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
            <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
              <SingleVideoUpload
                data={data}
                loading={loading}
                touched={touched.tour_video}
                errors={errors.tour_video}
                id={"tour_video"}
                placeholder={
                  tourPreview ? "1 Video Uploaded" : "Upload Virtual Tour Video"
                }
                name={"tour_video"}
                label={"Virtual Tour Video(Optional)"}
                setPreview={setTourPreview}
                setFieldValue={setFieldValue}
                parentClassName={"w-fit"}
                className={"w-fit pr-5 darkText"}
              />
              {/* {tourPreview && (
                <div className="mt-4">
                  <Button type="button" onClick={handleOpenVirtualTour}>
                    View All
                  </Button>
                </div>
              )}
              {tourPreview && (
                <Modal
                  title="Uploaded Virtual Tour videos"
                  isOpen={isModalOpenVirtualTour}
                  onClose={handleCloseVirtualTour}
                  width="w-full"
                  height="md:h-screen"
                >
                  <div className="w-60 border relative">
                    <video className="max-h-[170px] w-full" controls>
                      <source
                        src={`${config.url.ASSET_URL}${tourPreview.link}`}
                      />
                    </video>
                    <button
                      onClick={() => {
                        setTourPreview(null);
                        setFieldValue("tour_video", null);
                      }}
                      className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                    >
                      <Icons.Close />
                    </button>
                  </div>
                </Modal>
              )} */}
            </div>
            <CheckboxButton
              label={"Newly Renovated"}
              checked={isRenovated ? true : false}
              parentClassName={"pt-6"}
              onChange={(e) => {
                if (e.target.checked) {
                  setRenovated(true);
                } else {
                  setRenovated(false);
                }
              }}
            />
            <div className="space-x-3 w-full">
              {published && (
                <Button
                  onClick={() => {
                    if (!values.user_email) {
                      setFieldValue("user_email", "");
                    }
                  }}
                  type={"submit"}
                >
                  Update Now
                </Button>
              )}
              {!published && (
                <Button
                  onClick={() => {
                    if (!values.user_email) {
                      setFieldValue("user_email", "");
                    }
                  }}
                  type={"submit"}
                >
                  Save Draft
                </Button>
              )}
              {!published && (
                <Button
                  onClick={() =>
                    handlePublish({
                      propertyId: propertyId,
                      apartmentId: apartmentId,
                    })
                  }
                  type={"button"}
                >
                  Publish
                </Button>
              )}
              {published && (
                <Button
                  onClick={() =>
                    handlePublish({
                      propertyId: propertyId,
                      apartmentId: apartmentId,
                    })
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
  );
});

export default UpdateApartment;
