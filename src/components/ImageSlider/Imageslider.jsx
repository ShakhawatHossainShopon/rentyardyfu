import { Modal } from "@/components/Modal";
import { config } from "@/config";
import { useState } from "react";
import { SingleImage } from "../SingleImage";
export const Imageslider = ({ images, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Clear the selected image when closing the modal
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openModal(image)}
            className="relative cursor-pointer overflow-hidden rounded hover:scale-95 transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={`${config.url.ASSET_URL}${image.link}`}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {isModalOpen && selectedImage && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            width={"w-full"}
            height={"md:h-screen"}
            title={title}
          >
            <SingleImage className={"md:px-9 px-4"} src={selectedImage} />
          </Modal>
        )}
      </div>
    </div>
  );
};
