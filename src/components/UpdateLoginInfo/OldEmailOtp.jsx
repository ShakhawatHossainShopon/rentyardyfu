import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, Input } from "../ui";
const initialValues1 = {
  old_mail_otp: "",
};

const validationSchema1 = Yup.object({
  old_mail_otp: Yup.string().required("Required!"),
});

export const OldEmailOtp = ({ email, setNewEmail, setEmailAddress }) => {
  const onSubmit1 = async (values) => {
    const verifier = sessionStorage.getItem("otp_verifier");
    await toast.promise(
      apiClient
        .put(apiEndPoints.USER.CHANGE_EMAIL, {
          old_mail_otp: Number(values.old_mail_otp),
          otp_verifier: verifier,
        })
        .then((res) => {
          setEmailAddress(res.data.email);
          setNewEmail(true);
          toast.success("Check Your New Email for OTP");
          sessionStorage.setItem("otp_verifier", res.data.otp_verifier);
        })
        .catch(
          (err) => {
            toast.error(err.response.data.message);
          },
          {
            pending: "Pending...",
          }
        )
    );
  };

  return (
    <Formik
      onSubmit={onSubmit1}
      initialValues={initialValues1}
      validationSchema={validationSchema1}
    >
      <Form className="space-y-5">
        <div className="w-full text-center">
          <p className="my-5 text-lg">
            {" "}
            Please Check{" "}
            <span className="text-blue-600 font-medium">{email}</span> for OTP.{" "}
          </p>
        </div>
        <Input
          required={true}
          label={"OTP"}
          placeholder={"Enter Your OTP Here"}
          name={"old_mail_otp"}
          className={"py-2 px-2"}
        />
        <div className="w-full text-end">
          <Button type={"submit"}>Submit</Button>
        </div>
      </Form>
    </Formik>
  );
};
