import { config } from "@/config";
import { useState } from "react";

export const VideoSlider = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {videos.length > 0 ? (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {videos.length > 0 &&
              videos.map((video, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <video
                    src={`${config.url.ASSET_URL}${video.link}`}
                    controls
                    className="w-full object-cover"
                    preload="metadata"
                    // poster={video.poster} // Use poster attribute for thumbnails
                  />
                </div>
              ))}
          </div>
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/3 md:top-1/2 transform -translate-y-1/2 p-4 ml-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/3 md:top-1/2 transform -translate-y-1/2 p-4 me-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          >
            &#10095;
          </button>
          <div className="mt-4 flex justify-center space-x-2">
            {videos.length > 0 &&
              videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className="focus:outline-none"
                >
                  <video
                    src={`${config.url.ASSET_URL}${video.link}`}
                    className={`w-20 h-14 object-cover border-2 ${
                      currentIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    } rounded`}
                    preload="metadata"
                  />
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] w-full flex justify-center items-center darkText">
          {" "}
          No Video Available...{" "}
        </div>
      )}
    </>
  );
};
