import { Button, Input, Otp, Select } from "@/components";
import { useAppDispatch, useSignUpSelector } from "@/hooks";
import { signUp } from "@/services/auth/auth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
};
const validationSchema = Yup.object({
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required!"),
  role: Yup.string().required("Required!"),
});
export const Signup = ({ closeSignUpPopUp }) => {
  const dispatch = useAppDispatch();
  const { verifier, email } = useSignUpSelector();
  const onSubmit = (values, { resetForm }) => {
    dispatch(signUp(values));
    resetForm();
  };
  return (
    <>
      {verifier ? (
        <Otp email={email} />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, touched, errors }) => {
            return (
              <Form className="p-4 w-full space-y-4">
                <div className="md:flex justify-center items-center md:space-x-6 w-full space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"First Name"}
                    placeholder={"Enter First Name"}
                    name={"first_name"}
                    className={"py-2 px-2"}
                  />
                  <Input
                    required={true}
                    label={"Last Name"}
                    placeholder={"Enter Last Name"}
                    name={"last_name"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:flex justify-center items-center md:space-x-6 w-full space-y-5 md:space-y-0">
                  <Input
                    required={true}
                    label={"Email"}
                    placeholder={"Enter Email"}
                    name={"email"}
                    className={"py-2 px-2"}
                    type={"email"}
                  />
                  <Input
                    required={true}
                    label={"Password"}
                    placeholder={"Enter Password"}
                    name={"password"}
                    type={"password"}
                    className={"py-2 px-2"}
                  />
                </div>
                <div className="md:grid md:grid-cols-2 gap-6">
                  <Select
                    name={"role"}
                    placeholder={"Looking for"}
                    required={true}
                    label={"I’m here to"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "Look For Rent - Renter",
                        value: "Renter",
                      },
                      {
                        label: "List Property - Property Owner/Manager",
                        value: "Property Owner",
                      },
                    ]}
                    className={"w-full border px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <Button type="submit" className={"w-full"}>
                  Create Account
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
