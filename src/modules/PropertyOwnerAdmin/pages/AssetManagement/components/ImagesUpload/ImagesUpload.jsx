import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Upload } from "./Upload";

const initialValues = {
  images: null,
};

const fileSchema = Yup.mixed()
  .test(
    "fileSize",
    "Less than 10MB files are allowed",
    (value) => !value || (value && value.size <= 20 * 1024 * 1024)
  )
  .test(
    "fileType",
    "Unsupported File Format",
    (value) =>
      !value ||
      (value &&
        ["image/jpeg", "image/jpg", "image/webp", "image/png"].includes(
          value.type
        ))
  );

const validationSchema = Yup.object({
  images: Yup.array()
    .of(fileSchema)
    .min(1, "At least one image is required")
    .required("Images are required"),
});

export const ImagesUpload = () => {
  const dispatch = useAppDispatch();
  const [previewUrls, setPreviewUrls] = useState([]);
  const [images, setImages] = useState([]);

  const onSubmit = (values) => {
    const form = new FormData();
    form.append("type", "images");
    images.forEach((file) => form.append("upload", file));
    dispatch(addAsset(form));
    setImages([]);
    setPreviewUrls([]);
  };

  const handleRemoveImage = (index) => {
    const newPreviews = [...previewUrls];
    newPreviews.splice(index, 1);
    setPreviewUrls(newPreviews);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, touched, errors }) => {
        const handleImages = (event) => {
          const files = Array.from(event.target.files);
          setImages([...event.target.files]);
          setFieldValue("images", files);

          const filePreviews = files.map((file) => URL.createObjectURL(file));
          setPreviewUrls(filePreviews);
        };
        return (
          <Form className="space-y-3">
            <div className="flex justify-start items-center space-x-4">
              <Upload
                touched={touched.images}
                errors={errors.images}
                id={"images"}
                name={"images"}
                label={"Upload Images(.jpg,png,jpeg,webp)"}
                required={true}
                parentClassName={"w-fit"}
                className={"w-fit pr-5"}
                accept={"image/jpeg, image/png, image/jpg, image/webp"}
                onChange={handleImages}
                placeholder="Upload Images"
              />
              {previewUrls.length > 0 && (
                <div className="flex justify-start items-center space-x-3">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="w-20 overflow-hidden border relative"
                    >
                      <img
                        className="object-cover"
                        src={url}
                        alt={`Preview ${index}`}
                      />
                      <button
                        className="absolute right-2 top-2 bg-white"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Icons.Close />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit">Upload Images</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
