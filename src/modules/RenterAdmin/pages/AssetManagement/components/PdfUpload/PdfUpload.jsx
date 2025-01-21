import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Upload } from "./Upload";

const initialValues = {
  pdf: null,
};

const fileSchema = Yup.mixed().test(
  "fileType",
  "Unsupported File Format",
  (value) => !value || (value && ["application/pdf"].includes(value.type))
);
const validationSchema = Yup.object({
  pdf: Yup.array()
    .of(fileSchema)
    .min(1, "At least one pdf is required")
    .required("pdf are required"),
});

export const PdfUpload = () => {
  const dispatch = useAppDispatch();
  const [pdf, setPdf] = useState([]);
  const onSubmit = (values) => {
    const form = new FormData();
    form.append("type", "pdf");
    pdf.forEach((file) => form.append("upload", file));
    dispatch(addAsset(form));
    setPdf(0);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, touched, errors }) => {
        const handlePdf = (event) => {
          const files = Array.from(event.target.files);
          setPdf([...event.target.files]);
          setFieldValue("pdf", files);
        };
        return (
          <Form className="space-y-3">
            <div className="flex justify-start items-center space-x-4">
              <Upload
                touched={touched.pdf}
                errors={errors.pdf}
                id={"pdf"}
                name={"pdf"}
                label={"Upload pdf(.pdf)"}
                required={true}
                parentClassName={"w-fit min-w-max"}
                className={"w-fit min-w-max pr-5"}
                accept={"application/pdf"}
                onChange={handlePdf}
                placeholder="Upload pdf"
              />
              {pdf.length > 0 && (
                <div className="w-full">Total {pdf.length} pdf selected</div>
              )}
            </div>
            <Button type="submit">Upload pdf</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
