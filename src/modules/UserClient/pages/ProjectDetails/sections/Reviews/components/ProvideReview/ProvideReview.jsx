import { Button, Input, Select, TextArea } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addPropertyReview } from "@/services/property/property";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const initialValues = {
  title: "",
  description: "",
  manager: "",
  service: "",
  pet: "",
  parking: "",
  amenities: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required!"),
  description: Yup.string().required("Required!"),
  manager: Yup.string().required("Required!"),
  service: Yup.string().required("Required!"),
  pet: Yup.string().required("Required!"),
  parking: Yup.string().required("Required!"),
  amenities: Yup.string().required("Required!"),
});

export const ProvideReview = ({ propertyId, user }) => {
  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviewAmount, setReviewAmount] = useState(0);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(addPropertyReview({ ...values, propertyId: propertyId }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, setValues, values, errors, touched }) => {
        return (
          <Form className="border-2 border-blue-500 w-full p-4 space-y-3 dark:border-0">
            <div className="md:flex justify-start items-center  md:space-x-3">
              {/* <p className="md:py-2">09/02/2024</p> */}
              <p className="md:py-2">
                {" "}
                {user.data.first_name} {user.data.middle_name}{" "}
                {user.data.last_name}{" "}
              </p>
              {/* <div className="flex justify-start items-center space-x-1">
                <p className="md:py-2">Overall:</p>
                <div className="flex justify-start items-center space-x-1 text-yellow-400">
                  <RatingStars rating={reviewAmount ? reviewAmount : 0} />
                </div>
              </div> */}
              {/* <p>{reviewAmount} out of 5</p> */}
            </div>
            <div className="xl:flex w-full justify-start items-center space-x-0 xl:space-x-10">
              <Select
                name={"manager"}
                label={"Property Manager"}
                required={true}
                onChange={(e) => {
                  setFieldValue("manager", e.target.value);
                  handleChange(e);
                }}
                options={[
                  { value: "", label: "Select" },
                  { value: 5, label: "Excellent-5" },
                  { value: 4, label: "Good-4" },
                  { value: 3, label: "Average-3" },
                  { value: 2, label: "Fair-2" },
                  { value: 1, label: "Poor-1" },
                ]}
                className={
                  "border border-gray-300 px-2.5 py-1 min-w-max dark:border-gray-500"
                }
              />
              <Select
                name={"service"}
                label={"Maintenance Service"}
                required={true}
                onChange={(e) => {
                  setFieldValue("service", e.target.value);
                  handleChange(e);
                }}
                options={[
                  { value: "", label: "Select" },
                  { value: 5, label: "Excellent-5" },
                  { value: 4, label: "Good-4" },
                  { value: 3, label: "Average-3" },
                  { value: 2, label: "Fair-2" },
                  { value: 1, label: "Poor-1" },
                ]}
                className={
                  "border border-gray-300 px-2.5 py-1 min-w-max dark:border-gray-500"
                }
              />
              <Select
                name={"pet"}
                label={"Pet Friendly Apt"}
                required={true}
                onChange={(e) => {
                  setFieldValue("pet", e.target.value);
                  handleChange(e);
                }}
                options={[
                  { value: "", label: "Select" },
                  { value: 5, label: "Excellent-5" },
                  { value: 4, label: "Good-4" },
                  { value: 3, label: "Average-3" },
                  { value: 2, label: "Fair-2" },
                  { value: 1, label: "Poor-1" },
                ]}
                className={
                  "border border-gray-300 px-2.5 py-1 min-w-max dark:border-gray-500"
                }
              />
              <Select
                name={"parking"}
                label={"Parking"}
                required={true}
                onChange={(e) => {
                  setFieldValue("parking", e.target.value);
                  handleChange(e);
                }}
                options={[
                  { value: "", label: "Select" },
                  { value: 5, label: "Excellent-5" },
                  { value: 4, label: "Good-4" },
                  { value: 3, label: "Average-3" },
                  { value: 2, label: "Fair-2" },
                  { value: 1, label: "Poor-1" },
                ]}
                className={
                  "border border-gray-300 px-2.5 py-1 min-w-max dark:border-gray-500"
                }
              />
              <Select
                name={"amenities"}
                label={"Amenities"}
                required={true}
                onChange={(e) => {
                  setFieldValue("amenities", e.target.value);
                  handleChange(e);
                }}
                options={[
                  { value: "", label: "Select" },
                  { value: 5, label: "Excellent-5" },
                  { value: 4, label: "Good-4" },
                  { value: 3, label: "Average-3" },
                  { value: 2, label: "Fair-2" },
                  { value: 1, label: "Poor-1" },
                ]}
                className={
                  "border border-gray-300 px-2.5 py-1 min-w-max dark:border-gray-500"
                }
              />
            </div>
            <div className="space-y-5">
              <Input name={"title"} placeholder={"Review Title"} />
              <TextArea
                name={"description"}
                required={true}
                placeholder={"Review Details"}
                row={4}
              />
              <Button>Submit Review</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
