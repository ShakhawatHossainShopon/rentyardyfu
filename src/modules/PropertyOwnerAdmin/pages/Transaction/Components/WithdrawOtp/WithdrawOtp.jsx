import { Button, Input } from "@/components";
import { setIsSuccess } from "@/features/paymentMethods/addWithdrawSlice/addWithdrawSlice";
import { useAppDispatch } from "@/hooks";
import { getAllWithdrawnRequestList } from "@/services/paymentMethods/paymentMethods";
import { getUser } from "@/services/user/user";
import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
const initialValues = {
  otp: "",
};

const validationSchema = Yup.object({
  otp: Yup.string().required("Required!"),
});

export const WithdrawOtp = ({ email, closeModal }) => {
  const dispatch = useAppDispatch();
  const onSubmit = async (values) => {
    const verifier = sessionStorage.getItem("otp_verifier");
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAYMENT.WITHDRAW_VERIFY, {
          otp: Number(values.otp),
          otp_verifier: verifier,
        })
        .then((res) => {
          toast.success("Withdraw Request successful!");
          sessionStorage.removeItem("otp_verifier");
          closeModal();
          dispatch(getUser());
          dispatch(setIsSuccess(false));
          dispatch(getAllWithdrawnRequestList());
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
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
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
