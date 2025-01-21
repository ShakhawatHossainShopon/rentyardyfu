import { Button } from "@/components";
import { Modal } from "@/components/Modal"; // Adjust the import path if necessary
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { deleteAsset } from "@/services/asset/asset";
import { Icons } from "@/utils";
import { useState } from "react";
export const ShowVideos = ({ data, loading }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredVideos = data.filter((video) => video.type === "videos");
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
    <div className="space-y-3">
      <h2 className="font-medium">All Videos</h2>
      <div className="px-2">
        {!loading && filteredVideos.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredVideos.slice(0, 4).map((item) => (
                <div
                  key={item.assetId}
                  className="md:w-full max-h-[150px] w-60 overflow-hidden border border-blue-500 relative rounded-md"
                >
                  <video controls className="w-full">
                    <source src={`${config.url.ASSET_URL}${item.link}`} />
                  </video>
                  {/* <button
                    onClick={() => handleDelete(item.assetId)}
                    className="absolute bg-white rounded-full p-1 text-red-500 top-3 right-3"
                  >
                    <Icons.Delete />
                  </button> */}
                </div>
              ))}
            </div>
            <div>
              {filteredVideos.length > 4 && (
                <Button onClick={openModal} className="my-6">
                  View All
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full text-center">
            <p>No Videos found...</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title={"All Videos"}
          isOpen={isModalOpen}
          onClose={closeModal}
          width={"w-full"}
          height={"md:h-screen"}
          closeOnOutsideClick={true}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredVideos.map((item) => (
              <div
                key={item.assetId}
                className="relative overflow-hidden border border-blue-500"
              >
                <video controls className="w-full">
                  <source src={`${config.url.ASSET_URL}${item.link}`} />
                </video>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent video click event
                    handleDelete(item.assetId);
                  }}
                  className="absolute bg-white rounded-full p-1 text-red-500 top-3 right-3"
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
