import { Icons } from "@/utils";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Button, CheckboxButton } from "../ui";
export const SelectSinglePdf = ({
  data,
  loading,
  setFieldValue,
  name,
  closeModal,
  handleImageChange,
}) => {
  const [checkedId, setCheckedId] = useState(null);
  const filteredPdf = data.filter((pdf) => pdf.type === "pdf");
  const handleCheck = (event, idx) => {
    if (event.target.checked) {
      setCheckedId(idx.assetId);
    } else {
      setCheckedId(null);
    }
  };
  const handleSelect = () => {
    setFieldValue(name, checkedId);
    closeModal();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const fileType = droppedFiles[0].type;
      if (fileType === "application/pdf") {
        handleImageChange({ currentTarget: { files: droppedFiles } }); // Update the parent component with the file
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div className="relative">
      <div
        className="w-full flex justify-center items-center space-x-4 border-2 p-8 rounded-sm dark:border-blue-800"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <label htmlFor={name} className="cursor-pointer darkText space-y-6">
            <Icons.UploadV2 className="w-full text-3xl text-gray-700 dark:text-gray-400" />
            <div>
              <h3 className="font-bold text-gray-700 pb-2 text-sm sm:text-xl dark:text-gray-400">
                Drag And Drop or Choose Local File to Upload
              </h3>
              <h3 className="text-sm text-gray-700 sm:text-base dark:text-gray-400">
                PDF DOCX XLSX formats, max size is 10 mb
              </h3>
            </div>
            <div className="font-bold text-gray-700 rounded-sm flex justify-center">
              <div className="flex gap-3 items-center w-1/2 border-2 px-5 py-3 hover:bg-blue-800 hover:text-white hover:border-blue-800 rounded-sm transition-all duration-300 text-xs sm:text-base dark:text-gray-400 dark:border-blue-800">
                <Icons.Folder className="text-2xl " />
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
            accept={"application/pdf"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-10 gap-6 justify-start items-start overflow-y-scroll border-2 p-6 border-t-0 dark:border-blue-800">
        {loading ? (
          <div className="w-full flex justify-center items-center h-max">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : filteredPdf.length > 0 ? (
          filteredPdf.map((item) => (
            <div
              key={item.assetId}
              className="overflow-hidden relative darkText rounded-sm"
            >
              <div className="p-5 border-2 flex justify-center relative dark:border-blue-800">
                <Icons.PDF className="text-6xl text-red-700" />
                <div className="absolute top-1 right-0">
                  <CheckboxButton
                    checked={checkedId === item.assetId}
                    onChange={(e) => handleCheck(e, item)}
                  />
                </div>
              </div>
              <p className="text-sm">{item.filename}</p>
            </div>
          ))
        ) : (
          <div className="w-full text-center darkText pt-6">
            <p>No PDF found...</p>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 right-0 flex justify-end bg-white w-full dark:bg-dark-light">
        <Button
          onClick={handleSelect}
          className={"my-4 py-2 px-4 rounded-md md:text-lg"}
        >
          Add Now
        </Button>
      </div>
    </div>
  );
};
