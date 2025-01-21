import { Button, Input, MultipleSelectParent, PhoneInput } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { addStaff } from "@/services/staff/staff";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  propertyId: [],
  singlePropertyId: [],
  first_name: "",
  last_name: "",
  contact_number: "",
  email: "",
  service_identifier: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  contact_number: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
  service_identifier: Yup.string().required("Required!"),
});

export const AddMaintenanceProvider = ({ setShowForm }) => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [singlePropertyOptions, setSinglePropertyOptions] = useState([]);
  const res = useGetUserSelector();
  const dispatch = useAppDispatch();

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(addStaff({ data: { ...values, role: "MP" }, role: "MP" }));
    resetForm();
    setShowForm(false);
  };
  useEffect(() => {
    if (res.data.properties) {
      setPropertyOptions(
        res.data.properties.map((item) => {
          return { label: item.name, value: item.propertyId };
        })
      );
    }
    if (res.data.singleProperties) {
      setSinglePropertyOptions(
        res.data.singleProperties.map((item) => {
          return { label: item.name, value: item.singlePropertyId };
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
      {({ setFieldValue, touched, errors, values, setValues }) => (
        <Form className="w-full space-y-5">
          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <MultipleSelectParent
                label={"Select Property (Optional)"}
                name={"propertyId"}
                setFieldValue={setFieldValue}
                options={[...propertyOptions]}
              />
              <MultipleSelectParent
                label={"Select Single Property (Optional)"}
                name={"singlePropertyId"}
                setFieldValue={setFieldValue}
                options={[...singlePropertyOptions]}
              />
              <Input
                required={true}
                label={"Email"}
                placeholder={"Example@test.com"}
                name={"email"}
                className={"py-2 px-2"}
              />
            </div>
          </div>

          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
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
            <Input
              name="first_name"
              label="First Name"
              placeholder="John"
              className="py-2 px-2"
              required
            />
            <Input
              name="last_name"
              label="Last Name"
              placeholder="Doe"
              className="py-2 px-2"
              required
            />
          </div>

          <div className="w-full grid grid-cols-3 gap-6">
            <Input
              required
              name="service_identifier"
              label="Service Identifier (Optional)"
              placeholder="Electrician"
              className="py-2 px-2"
            />
          </div>
          <Button type="submit">Save Now</Button>
        </Form>
      )}
    </Formik>
  );
};
