import { Modal, SelectSingleImage } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { addAsset } from "@/services/asset/asset";
import { cn, Icons } from "@/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
export const UploadCoverPhoto = ({
  label,
  required,
  coverPhoto,
  setCoverPhoto,
  parentClassName,
  accept,
  onChange,
  name,
  touched,
  errors,
  data,
  loading,
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
  const handleImageChange = (e) => {
    const form = new FormData();
    form.append("type", "images");
    form.append("upload", e.currentTarget.files[0]);
    dispatch(addAsset(form));
  };
  return (
    <div className={cn(`w-full`, parentClassName)}>
      {label && (
        <label
          className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }  `}
          htmlFor=""
        >
          {" "}
          {label}{" "}
        </label>
      )}
      <div
        className={`w-full ${
          touched && errors ? "ring-1 ring-red-500" : "border border-blue-500"
        }`}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={label}
          height={"h-auto"}
          width={"xl:w-3/4 md:w-full"}
        >
          <div className="space-y-5">
            <SelectSingleImage
              handleImageChange={handleImageChange}
              setFieldValue={setFieldValue}
              setPhoto={setCoverPhoto}
              name={name}
              data={data}
              loading={loading}
              closeModal={closeModal}
            />
            {/* <div>
              <label
                htmlFor="img"
                className="flex justify-start items-center space-x-2 border border-blue-500 p-2 w-fit cursor-pointer"
              >
                {" "}
                <Icons.Plus /> <span>Upload From Device</span>{" "}
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                id="img"
                hidden
                className=""
                accept={"image/jpeg, image/png, image/jpg, image/webp"}
              />
            </div> */}
          </div>
        </Modal>
        <label htmlFor="" onClick={openModal} className="cursor-pointer">
          {!coverPhoto && (
            <div className="w-full h-[200px] overflow-hidden flex justify-center items-center">
              <LazyLoadImage
                className=""
                loading="lazy"
                src={`${config.url.ASSET_URL}assets/upload_area.png`}
                alt="Upload Preview"
              />
            </div>
          )}
        </label>
        {coverPhoto && (
          <div className="relative">
            <div className="h-[200px] overflow-hidden">
              <LazyLoadImage
                src={`${config.url.ASSET_URL}${coverPhoto.link}`}
                className="object-cover w-full"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-3 left-3 w-fit flex justify-center items-center bg-white px-5 py-3 space-x-3">
              <label htmlFor="" onClick={openModal}>
                <Icons.Edit className="text-2xl cursor-pointer" />
              </label>
              <Icons.Delete
                className="text-2xl text-red-500 cursor-pointer"
                onClick={() => {
                  setCoverPhoto(null);
                  setFieldValue(name, null);
                }}
              />
            </div>
          </div>
        )}
        <input
          onChange={onChange}
          type="file"
          id="coverImage"
          hidden
          accept={accept}
          name={name}
        />
      </div>
    </div>
  );
};
