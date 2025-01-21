import { config } from "@/config";
import { Icons } from "@/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ClipLoader } from "react-spinners";
import { Button, CheckboxButton } from "../ui";
export const SelectSingleImage = ({
  data,
  loading,
  setFieldValue,
  name,
  setPhoto,
  closeModal,
  handleImageChange,
}) => {
  const [checkedId, setCheckedId] = useState(null);
  const [image, setImage] = useState(null);
  const filteredImages = data.filter((image) => image.type === "images");
  const handleCheck = (event, idx) => {
    if (event.target.checked) {
      setCheckedId(idx.assetId);
      setImage(idx);
    } else {
      setCheckedId(null);
    }
  };
  const handleSelect = () => {
    setPhoto(image);
    setFieldValue(name, checkedId);
    closeModal();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleImageChange({ currentTarget: { files: droppedFiles } });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div className="relative">
      <div>
        <div
          className={`w-full flex justify-center items-center space-x-4 border-2 p-8 rounded-sm dark:border-blue-800 relative min-h-[200px]`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          // onDragEnter={handleDragOver}
        >
          <div className="text-center">
            <label htmlFor={name} className="cursor-pointer darkText space-y-6">
              <Icons.UploadV2 className="w-full text-3xl text-gray-700 dark:text-gray-400" />
              <div>
                <h3 className="text-base md:text-xl font-bold text-gray-700 pb-2 dark:text-gray-400 ">
                  Drag And Drop or Choose Local File to Upload
                </h3>
                <h3 className="text-sm md:text-base text-gray-700 dark:text-gray-400">
                  jpg, jpeg, PNG formats, max size is 10 mb
                </h3>
              </div>
              <div className="font-bold text-gray-700 rounded-sm flex justify-center dark:text-gray-400">
                <div className="flex gap-3 items-center md:w-1/2 border-2 px-5 py-3 hover:bg-blue-800 hover:text-white hover:border-blue-800 rounded-sm transition-all duration-300 dark:border-blue-800 text-xs md:text-base">
                  <Icons.Folder className="text-2xl" />
                  Browse Local File
                </div>
              </div>
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              id={name}
              hidden
              className=""
              accept={"image/jpeg, image/png, image/jpg, image/webp"}
            />
          </div>
        </div>
        <div className="min-h-[150px] flex justify-start items-center p-5 rounded-sm overflow-x-scroll no-scrollbar border-2 border-t-0 dark:border-blue-800">
          {loading ? (
            <div className="w-full flex justify-center items-center h-max">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : filteredImages.length > 0 ? (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3w-full gap-6">
              {filteredImages.map((item) => (
                <div
                  key={item.assetId}
                  className="relative overflow-hidden p-1 border-2 bg-gray-100 dark:bg-darkMode dark:border-darkMode"
                >
                  <LazyLoadImage
                    src={`${config.url.ASSET_URL}${item.link}`}
                    alt={item.filename}
                    loading="lazy"
                    className="max-h-[170px] rounded-sm h-full w-full hover:scale-110 transition-all duration-200 cursor-pointer"
                  />
                  {checkedId === item.assetId && (
                    <div className="absolute w-full h-full bg-white bg-opacity-50 top-0 right-0"></div>
                  )}
                  <div className="absolute right-0 top-0 pt-2 pb-1.5 px-1.5 flex items-center bg-white rounded-sm dark:bg-darkMode">
                    <CheckboxButton
                      checked={checkedId === item.assetId}
                      onChange={(e) => handleCheck(e, item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center ">
              <p className="darkText">No Image found...</p>
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 right-0 flex justify-end bg-white w-full dark:bg-dark-light">
        <Button
          className={"my-4 py-2 px-4 rounded-md  md:text-lg"}
          onClick={handleSelect}
        >
          Add Now
        </Button>
      </div>
    </div>
  );
};
