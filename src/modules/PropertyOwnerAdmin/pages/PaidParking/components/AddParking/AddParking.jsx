import { Button, Input, Select, TextArea } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { addPaidParking } from "@/services/paidParking/paidParking";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  propertyId: "",
  price: "",
  slots: "",
};

const validationSchema = Yup.object().shape({
  price: Yup.number().required("Required!"),
  propertyId: Yup.string().required("Required!"),
  slots: Yup.string()
    .required("Required!")
    .matches(
      /^[a-zA-Z0-9,]+$/,
      "Only letters, numbers, and commas are allowed!"
    ),
});

export const AddParking = () => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addPaidParking({ ...values, propertyId: Number(values.propertyId) })
    );
    resetForm();
  };

  const res = useGetUserSelector();

  useEffect(() => {
    if (res.data.properties) {
      setPropertyOptions(
        res.data.properties.map((item) => {
          return { label: item.name, value: item.propertyId };
        })
      );
    }
  }, [res]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className="space-y-5">
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
              className={"w-full px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
            <div>
              <TextArea
                label={"Parking Names separate by comma (,)"}
                name={"slots"}
                placeholder={"10,101,2020,2010"}
                required={true}
                className={"bg-white"}
                row={4}
                onKeyDown={(e) => {
                  if (!/[a-zA-Z0-9,]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                required={true}
                label={"Amount"}
                placeholder={"$40"}
                type={"number"}
                name={"price"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full text-end">
              <Button type={"submit"}>Submit</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
