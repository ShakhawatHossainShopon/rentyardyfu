import { Button } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { deleteAsset } from "@/services/asset/asset";
import { Icons } from "@/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Modal } from "../Modal"; // Adjust import path if necessary
export const ShowImages = ({ data, loading }) => {
  const dispatch = useAppDispatch();
  const [visibleImagesCount, setVisibleImagesCount] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredImages = data.filter((image) => image.type === "images");
  const handleSeeMore = () => {
    setVisibleImagesCount((prevCount) => prevCount + 8);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (assetId) => {
    dispatch(deleteAsset(assetId));
  };
  return (
    <div>
      <h2 className="font-medium">All Images</h2>
      <div className="min-h-[150px] flex flex-wrap gap-3 items-center mx-auto pb-6">
        {!loading && filteredImages.length > 0 ? (
          filteredImages.slice(0, visibleImagesCount).map((item) => (
            <div
              key={item.assetId}
              className="w-32 h-32 flex justify-center items-center p-1"
            >
              <div className="border border-blue-500 relative overflow-hidden rounded-lg w-full h-full">
                <LazyLoadImage
                  key={item.assetId}
                  src={`${config.url.ASSET_URL}${item.link}`}
                  alt={item.filename}
                  loading="lazy"
                  className="w-full h-full rounded-lg object-cover hover:scale-110 transition-all duration-200 cursor-pointer"
                />
                {/* <button
                  onClick={() => handleDelete(item.assetId)}
                  className="absolute bg-white rounded-full p-1 text-red-500 bottom-2 right-2"
                >
                  <Icons.Delete />
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p>No Images found...</p>
          </div>
        )}
      </div>
      {filteredImages.length > visibleImagesCount && (
        <div>
          <Button onClick={openModal} className="mb-4">
            View All
          </Button>
        </div>
      )}
      {isModalOpen && (
        <Modal
          title={"All Images"}
          isOpen={isModalOpen}
          onClose={closeModal}
          width={"w-full"}
          height={"md:h-screen"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-8 xl:grid-cols-8 gap-8 py-4">
            {filteredImages.map((image) => (
              <div
                key={image.assetId}
                className="relative cursor-pointer overflow-hidden rounded hover:scale-95 transition-all duration-300 hover:shadow-lg"
              >
                <img
                  src={`${config.url.ASSET_URL}${image.link}`}
                  alt={image.filename}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image.assetId);
                  }}
                  className="absolute bg-white rounded-full p-1 text-red-500 top-2 right-2"
                >
                  <Icons.Delete />
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};
