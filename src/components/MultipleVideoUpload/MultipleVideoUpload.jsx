import { Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { cn, Icons } from "@/utils";
import { useState } from "react";
import { SelectMultipleVideos } from "../SelectMultipleVideos";
export const MultipleVideoUpload = ({
  className,
  label,
  required,
  parentClassName,
  touched,
  errors,
  onChange,
  name,
  id,
  data,
  loading,
  setPreview,
  preview,
  setFieldValue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleVideoChange = (e) => {
    const data = [...e.target.files];
    const form = new FormData();
    form.append("type", "videos");
    data.forEach((item) => form.append("upload", item));
    dispatch(addAsset(form));
  };
  return (
    <div className={cn(`w-full`, parentClassName)}>
      <label
        className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }  `}
      >
        {label}
      </label>
      <div
        className={cn(
          `w-full flex flex-col justify-start items-start space-x-6 border border-blue-500 py-1 ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          }  `,
          className
        )}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={label}
          height={"h-auto"}
          width={"xl:w-3/4 md:w-full"}
        >
          <div className="space-y-5">
            <SelectMultipleVideos
              handleVideoChange={handleVideoChange}
              name={name}
              video={preview}
              setFieldValue={setFieldValue}
              setVideo={setPreview}
              data={data}
              loading={loading}
              closeModal={closeModal}
            />
          </div>
        </Modal>
        <div className="flex justify-start items-center">
          <label
            htmlFor={""}
            onClick={openModal}
            className="flex justify-center items-center space-x-2 px-2 py-1 cursor-pointer"
          >
            <Icons.Upload />{" "}
            <span>
              {" "}
              {touched && errors ? errors : "Upload Multiple Videos"}{" "}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
