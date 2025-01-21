import { Button, FileUpload, Input, Select } from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { updateStatement } from "@/services/statements/statements";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  type: "",
  amount: "",
  image: "",
  note: "",
  number: "",
};

const validationSchema = Yup.object({
  type: Yup.string().required("Required!"),
  amount: Yup.string().required("Required!"),
  number: Yup.string().when("type", {
    is: "Money Order", // Condition: when type is "Money Order"
    then: (schema) => schema.required("Money Order Number is required!"), // Ensure `then` is a function
    otherwise: (schema) => schema, // Use schema directly for optional
  }),
});

export const UpdateStatements = ({ applicationId, closeModal }) => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(null);
  const [mapPreview, setMapPreview] = useState(null);
  const { loading, data } = useGetAllAssetSelector();
  const onSubmit = (values) => {
    dispatch(updateStatement({ applicationId: applicationId, ...values }));
    closeModal();
  };
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <div className="pb-5">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, errors, touched, values, setValues }) => {
          useEffect(() => {
            if (values.type === "Money Order") {
              setShowForm("Money Order");
            } else if (values.type === "Cash") {
              setShowForm("Cash");
            } else {
              setShowForm(null);
            }
          }, [values]);
          return (
            <Form className="space-y-2">
              <Select
                name={"type"}
                required={true}
                label={"Payment Type"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Money Order",
                    value: "Money Order",
                  },
                  {
                    label: "Cash",
                    value: "Cash",
                  },
                ]}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              {showForm === "Money Order" && (
                <div className="w-full grid grid-cols-4 gap-6">
                  <Input
                    required={true}
                    label={"Amount"}
                    placeholder={"300"}
                    name={"amount"}
                    type={"number"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Money Order Number"}
                    placeholder={"300"}
                    name={"number"}
                    className={"py-2 px-2"}
                  />

                  <Input
                    label={"Note (Optional)"}
                    placeholder={"Search By Unit Number"}
                    name={"note"}
                    className={"py-2 px-2"}
                  />
                  <FileUpload
                    label={"Money Order Photo (Optional)"}
                    placeholder={
                      mapPreview ? "1 Photo Uploaded" : "Upload Photo"
                    }
                    name="image"
                    data={data}
                    loading={loading}
                    touched={touched.image}
                    errors={errors.image}
                    id={"image"}
                    accept={"image/jpeg, image/png, image/jpg, image/webp"}
                    setPreview={setMapPreview}
                    setFieldValue={setFieldValue}
                    parentClassName={"w-fit"}
                    className={"w-fit pr-5 border-blue-600"}
                  />
                </div>
              )}
              {showForm === "Cash" && (
                <div className="w-full grid grid-cols-4 gap-6">
                  <Input
                    required={true}
                    label={"Amount"}
                    placeholder={"300"}
                    name={"amount"}
                    type={"number"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    label={"Note (Optional)"}
                    placeholder={"Search By Unit Number"}
                    name={"note"}
                    className={"py-2 px-2"}
                  />
                </div>
              )}
              <Button className={"md:text-sm text-xs"} type={"submit"}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
