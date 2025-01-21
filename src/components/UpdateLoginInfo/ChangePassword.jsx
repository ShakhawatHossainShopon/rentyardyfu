import { Button, Input } from "@/components";
import { useAppDispatch } from "@/hooks";
import { changePassword } from "@/services/auth/auth";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  old_password: Yup.string().required("Required!"),
  new_password: Yup.string().required("Required!"),
  confirm_password: Yup.string().required("Required!"),
});

export const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(changePassword(values));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-5 p-2 md:p-0">
        <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
          <Input
            required={true}
            label={"Old Password"}
            placeholder={"Old Password"}
            name={"old_password"}
            type={"password"}
            className={"py-2 px-2"}
          />
          <Input
            required={true}
            label={"New Password"}
            placeholder={"New Password"}
            name={"new_password"}
            type={"password"}
            className={"py-2 px-2"}
          />
          <Input
            required={true}
            label={"Confirm password"}
            placeholder={"Re-enter New Password"}
            name={"confirm_password"}
            type={"password"}
            className={"py-2 px-2"}
          />
        </div>
        <Button type={"submit"} className={"min-w-max md:text-sm text-xs"}>
          Submit Request
        </Button>
      </Form>
    </Formik>
  );
};
