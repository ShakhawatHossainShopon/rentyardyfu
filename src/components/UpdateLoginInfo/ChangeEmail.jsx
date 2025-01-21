import { Button, Input, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { NewEmailOtp } from "./NewEmailOtp";
import { OldEmailOtp } from "./OldEmailOtp";

const initialValues = {
  old_email: "",
  new_email: "",
  password: "",
};

const validationSchema = Yup.object({
  old_email: Yup.string().required("Required!"),
  new_email: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
});

export const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const [emailAddress, setEmailAddress] = useState();
  const [newEmail, setNewEmail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (values, { resetForm }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.USER.CHANGE_EMAIL, values)
        .then((res) => {
          setEmailAddress(res.data.email);
          toast.success("Check Your Old Email for OTP");
          sessionStorage.setItem("otp_verifier", res.data.otp_verifier);
          openModal();
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
    resetForm();
  };
  return (
    <>
      <Modal
        className={"px-5"}
        width={"w-full max-w-5xl"}
        height={"h-[30vh]"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {newEmail ? (
          <NewEmailOtp email={emailAddress} closeModal={closeModal} />
        ) : (
          <OldEmailOtp
            setNewEmail={setNewEmail}
            setEmailAddress={setEmailAddress}
            email={emailAddress}
          />
        )}
      </Modal>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="space-y-5 p-2 md:p-0">
          <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
            <Input
              required={true}
              label={"Old Email"}
              placeholder={"Old Email"}
              name={"old_email"}
              type={"email"}
              className={"py-2 px-2"}
            />
            <Input
              required={true}
              label={"New Email"}
              placeholder={"New Email"}
              name={"new_email"}
              type={"email"}
              className={"py-2 px-2"}
            />
            <Input
              required={true}
              label={"Password"}
              placeholder={"Password"}
              name={"password"}
              type={"password"}
              className={"py-2 px-2"}
            />
          </div>
          <Button type={"submit"} className={"min-w-max md:text-sm text-xs"}>
            Submit Request
          </Button>
        </Form>
      </Formik>
    </>
  );
};
