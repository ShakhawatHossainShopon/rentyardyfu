import { Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { cn, Icons } from "@/utils";
import { useState } from "react";
import { SelectSinglePdf } from "../SelectSinglePdf";
export const SinglePdfUpload = ({
  className,
  label,
  required,
  parentClassName,
  name,
  touched,
  errors,
  accept,
  onChange,
  id,
  placeholder,
  disable,
  setFieldValue,
  data,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImageChange = (e) => {
    const form = new FormData();
    form.append("type", "pdf");
    form.append("upload", e.currentTarget.files[0]);
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
          `w-fit flex flex-col bg-white justify-start items-start space-x-6 border border-blue-500 py-1 darkText dark:bg-darkMode ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          }  `,
          className
        )}
      >
        <div
          className={`flex justify-start items-center ${
            disable ? "text-gray-400" : ""
          }`}
        >
          <label
            htmlFor={""}
            onClick={openModal}
            className={`flex justify-center items-center space-x-2 px-2 py-1 darkText ${
              disable ? "cursor-not-allowed" : "cursor-pointer"
            } `}
          >
            <Icons.Upload />{" "}
            <span className=""> {errors ? errors : placeholder} </span>
          </label>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={"Choose Pdf"}
            height={"h-auto"}
            width={"xl:w-3/4 md:w-full"}
          >
            <div className="space-y-5">
              <SelectSinglePdf
                handleImageChange={handleImageChange}
                name={name}
                setFieldValue={setFieldValue}
                data={data}
                loading={loading}
                closeModal={closeModal}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
