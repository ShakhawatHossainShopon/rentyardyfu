import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Upload } from "./Upload";

const initialValues = {
  video: null,
};

const validationSchema = Yup.object({
  video: Yup.mixed()
    .required("Video is required")
    .test("fileType", "Invalid file format", (value) => {
      if (value) {
        const allowedFormats = ["video/mp4"];
        return allowedFormats.includes(value.type);
      }
      return true;
    })
    .test("fileSize", "Video is too large", (value) => {
      if (value) {
        return value.size <= 100 * 1024 * 1024; // 50 MB
      }
      return true;
    }),
});

export const VideoUpload = () => {
  const dispatch = useAppDispatch();
  const [video, setVideo] = useState();
  const onSubmit = (values) => {
    const form = new FormData();
    form.append("type", "videos");
    form.append("upload", values.video);
    dispatch(addAsset(form));
    setVideo();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, touched, errors }) => {
        return (
          <Form className="space-y-3">
            <div className="flex justify-start items-center space-x-4">
              <Upload
                touched={touched.video}
                errors={errors.video}
                id={"video"}
                name={"video"}
                label={"Upload video(.mp4)"}
                required={true}
                accept={"video/mp4"}
                disable={video ? true : false}
                onChange={(e) => {
                  setFieldValue("video", e.currentTarget.files[0]);
                  setVideo(URL.createObjectURL(e.currentTarget.files[0]));
                }}
                parentClassName={"w-fit"}
                placeholder="Upload Video"
                className={"w-fit pr-5"}
              />
              {video && (
                <div className="w-60 overflow-hidden border relative">
                  <video controls>
                    <source src={video} />
                  </video>
                  <button
                    aria-label="delete"
                    onClick={() => setVideo(null)}
                    className="absolute cursor-pointer right-0 top-0 bg-white "
                  >
                    <Icons.Close />
                  </button>
                </div>
              )}
            </div>
            <Button type="submit">Upload Video</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
