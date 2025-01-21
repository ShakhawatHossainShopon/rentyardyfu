import { Button, Input, MultipleSelectParent, PhoneInput } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { updateStaff } from "@/services/staff/staff";
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

export const UpdateMaintenanceProvider = ({ item }) => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [singlePropertyOptions, setSinglePropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const {
    propertyId,
    singlePropertyId,
    first_name,
    last_name,
    contact_number,
    email,
    staffId,
    service_identifier,
  } = item;
  const onSubmit = (values) => {
    dispatch(
      updateStaff({ data: { ...values, staffId: staffId }, role: "MP" })
    );
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
    if (res.data.singleProperties) {
      setSinglePropertyOptions(
        res.data.singleProperties.map((item) => {
          return { label: item.name, value: item.singlePropertyId };
        })
      );
    }
  }, [res]);

  return (
    <div className="pb-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          setInputValue,
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          setValues,
        }) => {
          useEffect(() => {
            setValues({
              propertyId: propertyId.map((item) => item.propertyId),
              singlePropertyId: singlePropertyId.map(
                (item) => item.singlePropertyId
              ),
              first_name,
              last_name,
              contact_number,
              email,
              staffId,
              service_identifier,
            });
          }, [dispatch]);
          return (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                  <MultipleSelectParent
                    label={"Select Property (Optional)"}
                    name={"propertyId"}
                    errors={errors.propertyId}
                    touched={touched.propertyId}
                    setFieldValue={setFieldValue}
                    options={[...propertyOptions]}
                    preSelectedValues={propertyId}
                  />
                  <MultipleSelectParent
                    label={"Select Single Property (Optional)"}
                    name={"singlePropertyId"}
                    errors={errors.singlePropertyId}
                    touched={touched.singlePropertyId}
                    setFieldValue={setFieldValue}
                    options={[...singlePropertyOptions]}
                    preSelectedValues={singlePropertyId}
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
          );
        }}
      </Formik>
    </div>
  );
};
