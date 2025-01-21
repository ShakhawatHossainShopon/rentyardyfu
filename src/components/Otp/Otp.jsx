import { useAppDispatch, useOtpSelector } from "@/hooks";
import { otp } from "@/services/auth/auth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "../ui";
const initialValues = {
  otp: "",
};

const validationSchema = Yup.object({
  otp: Yup.string().required("Required!"),
});

export const Otp = ({ email }) => {
  const { success } = useOtpSelector();
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    const verifier = sessionStorage.getItem("verifier");
    dispatch(otp({ ...values, otp_verifier: verifier }));
    resetForm();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form className="space-y-5">
        <div className="w-full text-center">
          <p className="my-5 text-lg darkText">
            {" "}
            Please Check{" "}
            <span className="text-blue-600 font-medium">{email}</span> for OTP.{" "}
          </p>
        </div>
        <Input
          required={true}
          label={"OTP"}
          placeholder={"Enter Your OTP Here"}
          name={"otp"}
          className={"py-2 px-2"}
        />
        <div className="w-full text-end">
          <Button type={"submit"}>Submit</Button>
        </div>
      </Form>
    </Formik>
  );
};
