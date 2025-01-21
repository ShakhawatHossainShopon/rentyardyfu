import { useAppDispatch } from "@/hooks";
import { logout } from "@/services/auth/auth";
import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, Input } from "../ui";
const initialValues2 = {
  new_mail_otp: "",
};

const validationSchema2 = Yup.object({
  new_mail_otp: Yup.string().required("Required!"),
});

export const NewEmailOtp = ({ email, setNewEmail, closeModal }) => {
  const dispatch = useAppDispatch();
  const onSubmit2 = async (values) => {
    const verifier = sessionStorage.getItem("otp_verifier");
    await toast.promise(
      apiClient
        .put(apiEndPoints.USER.CHANGE_EMAIL, {
          new_mail_otp: Number(values.new_mail_otp),
          otp_verifier: verifier,
        })
        .then((res) => {
          toast.success(
            "Your email changed successfully! Now login with your new email"
          );
          sessionStorage.removeItem("otp_verifier");
          dispatch(logout());
          return res.data;
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
      onSubmit={onSubmit2}
      initialValues={initialValues2}
      validationSchema={validationSchema2}
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
          name={"new_mail_otp"}
          className={"py-2 px-2"}
        />
        <div className="w-full text-end">
          <Button type={"submit"}>Submit</Button>
        </div>
      </Form>
    </Formik>
  );
};
