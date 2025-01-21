import { Button, Input, Otp, Otp2 } from "@/components";
import {
  useAppDispatch,
  useLoginSelector,
  useSendEmailSelector,
  useSendOtpSelector,
  useSetNewPassSelector,
} from "@/hooks";
import { forgotPassword, login, setNewPass } from "@/services/auth/auth";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required!"),
});

const initialValues2 = {
  email: "",
};

const validationSchema2 = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

const initialValues3 = {
  new_password: "",
  confirm_password: "",
};

const validationSchema3 = Yup.object({
  new_password: Yup.string().required("Required!"),
  confirm_password: Yup.string().required("Required!"),
});

export const Login = () => {
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [forgotPassOtpState, setForgotPassOtpState] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { verifier, email } = useLoginSelector();

  const res = useSendEmailSelector();

  const res2 = useSendOtpSelector();

  const res3 = useSetNewPassSelector();

  useEffect(() => {
    if (res.email) {
      setForgotPasswordState(false);
      setForgotPassOtpState(true);
      setNewPassword(false);
    }
  }, [res]);

  useEffect(() => {
    if (res2.success) {
      setForgotPasswordState(false);
      setForgotPassOtpState(false);
      setNewPassword(true);
    }
  }, [res2]);

  useEffect(() => {
    if (res3.success) {
      setForgotPasswordState(false);
      setForgotPassOtpState(false);
      setNewPassword(false);
      sessionStorage.removeItem("otp_verifier");
    }
  }, [res3]);

  const onSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  const onSubmit2 = (values, { resetForm }) => {
    dispatch(forgotPassword(values));
    resetForm();
  };

  const onSubmit3 = (values, { resetForm }) => {
    const verifier = sessionStorage.getItem("otp_verifier");
    dispatch(setNewPass({ ...values, otp_verifier: verifier }));
    resetForm();
  };
  return (
    <>
      {forgotPasswordState ? (
        <div>
          <Formik
            onSubmit={onSubmit2}
            initialValues={initialValues2}
            validationSchema={validationSchema2}
          >
            <Form className="space-y-5">
              <div className="w-full text-center">
                <p className="my-5 text-lg dark:text-gray-400">
                  {" "}
                  Please Enter your Email Address Here
                </p>
              </div>
              <Input
                required={true}
                label={"Email"}
                placeholder={"Enter Email"}
                name={"email"}
                className={"py-2 px-2"}
              />
              <div className="w-full text-end">
                <Button type={"submit"}>Submit</Button>
              </div>
            </Form>
          </Formik>
        </div>
      ) : newPassword ? (
        <Formik
          initialValues={initialValues3}
          onSubmit={onSubmit3}
          validationSchema={validationSchema3}
        >
          <Form className="p-4 w-full space-y-4">
            <Input
              required={true}
              label={"New Password"}
              placeholder={"Enter New Password"}
              name={"new_password"}
              className={"py-2 px-2"}
              type={"password"}
            />
            <Input
              required={true}
              label={"Confirm New Password"}
              placeholder={"Re-Enter New Password"}
              name={"confirm_password"}
              className={"py-2 px-2"}
              type={"password"}
            />
            <Button type="submit" className={"w-full"}>
              Send
            </Button>
          </Form>
        </Formik>
      ) : forgotPassOtpState ? (
        <Otp2 email={res.email} />
      ) : verifier ? (
        <Otp email={email} />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="p-4 w-full space-y-4">
            <Input
              required={true}
              label={"Email"}
              placeholder={"Enter Email"}
              name={"email"}
              className={"py-2 px-2"}
            />
            <Input
              required={true}
              label={"Password"}
              placeholder={"Enter Password"}
              name={"password"}
              className={"py-2 px-2"}
              type={"password"}
            />
            <button
              className="text-blue-600 text-sm font-medium underline"
              type="button"
              onClick={() => setForgotPasswordState(true)}
            >
              {" "}
              Forgot Password?{" "}
            </button>
            <Button type="submit" className={"w-full"}>
              Login
            </Button>
          </Form>
        </Formik>
      )}
    </>
  );
};
