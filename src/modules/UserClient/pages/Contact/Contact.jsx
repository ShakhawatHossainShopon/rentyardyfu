import { Button, Input, TextArea } from "@/components";
import { useAppDispatch, useScrollToTop } from "@/hooks";
import { addContact } from "@/services/contact/contact";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  title: "",
  message: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
  title: Yup.string().required("Required!"),
  message: Yup.string().required("Required!"),
});

const Contact = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();

  const onSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values }) => (
        <Form className="w-full space-y-5 px-6 py-5">
          <div className="space-y-2">
            <h2 className="md:text-3xl text-lg font-semibold">Contact Us</h2>
            <hr className="" />
          </div>
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              required={true}
              placeholder={"John Doe"}
              name={"name"}
              className={"py-3 px-4 border rounded-sm"}
              label={"Name"}
            />
            <Input
              required={true}
              placeholder={"name@email.com"}
              name={"email"}
              type={"email"}
              className={"py-3 px-4 border rounded-sm"}
              label={"Email"}
            />
          </div>
          <div>
            <Input
              required={true}
              placeholder={"Subject"}
              name={"title"}
              className={"py-3 px-4 border rounded-sm"}
              label={"Subject"}
            />
          </div>
          <div>
            <TextArea
              row={10}
              placeholder="Short Message"
              name="message"
              required
              label={"Short Message"}
            />
          </div>
          <Button
            type="submit"
            className={"md:px-8 md:py-3 md:md:text-lg text-sm"}
          >
            Send Now
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Contact;
