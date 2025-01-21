import { config } from "@/config";
import { Icons } from "@/utils";
import { useEffect, useState } from "react";
import { Button, CheckboxButton } from "../ui";
export const SelectMultipleVideos = ({
  data,
  loading,
  video,
  setFieldValue,
  name,
  setVideo,
  closeModal,
  handleVideoChange,
}) => {
  const [checkedIds, setCheckedIds] = useState([]);
  const [tempVideos, setTempVideos] = useState([]);
  const filteredVideos = data.filter((video) => video.type === "videos");
  useEffect(() => {
    setCheckedIds((prev) => [...prev, ...video.map((item) => item.assetId)]);
  }, []);
  const handleCheck = (event, item) => {
    if (event.target.checked) {
      setCheckedIds((prev) => [...prev, item.assetId]);
      setTempVideos([...tempVideos, item]);
    } else {
      setCheckedIds((prev) => prev.filter((id) => id !== item.assetId));
      setTempVideos((prev) => prev.filter((link) => link !== item));
    }
  };
  const handleSelect = () => {
    setVideo(video.length > 0 ? [...video, ...tempVideos] : tempVideos);
    setFieldValue(name, [...video.map((item) => item.assetId), ...checkedIds]);
    closeModal();
  };
  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleVideoChange({ target: { files: droppedFiles } });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div>
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
                <h4 className="font-bold text-gray-700 pb-2 dark:text-gray-400 text-base md:text-xl">
                  Drag And Drop or Choose Local File to Upload
                </h4>
                <h3 className="text-md text-gray-700 dark:text-gray-400 text-sm md:text-base">
                  Mp4 formats, max size is 100 mb
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
              onChange={handleVideoChange}
              type="file"
              id={name}
              multiple
              hidden
              accept={"video/mp4, video/avi, video/mkv, video/mov"}
            />
          </div>
        </div>
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 rounded-sm overflow-x-scroll no-scrollbar border-2 border-t-0 dark:border-blue-800">
          {!loading && filteredVideos.length > 0 ? (
            filteredVideos.map((item) => (
              <div
                key={item.assetId}
                className="relative overflow-hidden p-1 border-2 bg-gray-100 dark:bg-darkMode dark:border-darkMode"
              >
                <video
                  className="rounded-sm h-full w-full cursor-pointer"
                  controls
                >
                  <source src={`${config.url.ASSET_URL}${item.link}`} />
                </video>
                {checkedIds.includes(item.assetId) && (
                  <div className="absolute w-full h-full bg-white bg-opacity-50 top-0 right-0"></div>
                )}
                <div className="absolute right-0 top-0 pt-2 pb-1.5 px-1.5 flex items-center bg-white rounded-sm dark:bg-darkMode">
                  <CheckboxButton
                    checked={checkedIds.includes(item.assetId)}
                    onChange={(e) => handleCheck(e, item)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center darkText">
              <p>No Video found...</p>
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 right-0 flex justify-end bg-white w-full dark:bg-dark-light">
        <Button
          type="button"
          onClick={handleSelect}
          className={"my-4 py-2 px-4 rounded-md md:text-lg"}
        >
          Add Now
        </Button>
      </div>
    </div>
  );
};
