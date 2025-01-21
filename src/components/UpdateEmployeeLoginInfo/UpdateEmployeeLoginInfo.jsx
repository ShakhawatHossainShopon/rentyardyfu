import { Button, Input, PhoneInput } from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateEmployeeCredential } from "@/services/employee/employee";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  password: "",
  email: "",
  contact_number: "",
};

const validationSchema = Yup.object({
  // email: Yup.string().required("Required!"),
});

export const UpdateEmployeeLoginInfo = ({ item }) => {
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    if (!number && !email && !password) {
      return toast.error("Please enter a value first");
    }
    dispatch(
      updateEmployeeCredential({
        ...values,
        propertyId: item.propertyId,
        employeeId: item.id,
      })
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, setValues, values }) => {
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <PhoneInput
                label={"New Contact Number"}
                placeholder={"234345983"}
                names={"contact_number"}
                className={"py-2 px-2"}
                type={"tel"}
                setNumber={setNumber}
                errors={errors.contact_number}
                touched={touched.contact_number}
                setFieldValue={setFieldValue}
                value={values.contact_number}
              />
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldValue("email", e.target.value);
                }}
                label={"New Email"}
                placeholder={"example@test.com"}
                name={"email"}
                className={"py-2 px-2"}
              />
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldValue("password", e.target.value);
                }}
                label={"New Password"}
                placeholder={"Your password"}
                name={"password"}
                className={"py-2 px-2"}
              />
            </div>
            <Button className={"md:text-sm text-xs"} type={"submit"}>
              Update Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
