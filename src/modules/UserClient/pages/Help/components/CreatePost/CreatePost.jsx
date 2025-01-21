import { Button, Input, TextArea } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addPost } from "@/services/post/post";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const initialValues = {
  city: "",
  zip: "",
  title: "",
  msg: "",
};
const validationSchema = Yup.object({
  city: Yup.string().required("Required!"),
  zip: Yup.string().required("Required!"),
  title: Yup.string().required("Required!"),
  msg: Yup.string().required("Required!"),
});

export const CreatePost = ({ setShowForm }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values, { resetForm }) => {
    dispatch(addPost(values));
    setShowForm(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, values }) => (
        <Form className="w-full space-y-5">
          <div className="grid grid-cols-2 w-full gap-6">
            <Input
              required={true}
              placeholder={"Dallas"}
              name={"city"}
              className={"py-3 px-4 border rounded-sm"}
              label={"City"}
            />
            <Input
              required={true}
              placeholder={"73301"}
              name={"zip"}
              className={"py-3 px-4 border rounded-sm"}
              label={"Zip"}
            />
          </div>
          <div>
            <Input
              required={true}
              placeholder={"Title"}
              name={"title"}
              className={"py-3 px-4 border rounded-sm"}
              label={"Title"}
            />
          </div>
          <div>
            <TextArea
              row={10}
              placeholder="Short Message"
              name="msg"
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
