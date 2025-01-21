import { Button, Imageslider, Modal, VideoSlider } from "@/components";
import { config } from "@/config";
import { useState } from "react";

export const Hero = ({
  cover_image,
  property_images,
  property_videos,
  tour_videos,
  arial_videos,
}) => {
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);
  const [isModalOpenArielView, setIsModalOpenArielView] = useState(false);
  const [isModalOpenVideos, setIsModalOpenVideos] = useState(false);

  const OpenGallery = () => {
    setIsModalOpenGallery(true);
  };
  const OpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  const OpenArielView = () => {
    setIsModalOpenArielView(true);
  };
  const OpenVideos = () => {
    setIsModalOpenVideos(true);
  };

  const CloseModal = () => {
    setIsModalOpenGallery(false);
    setIsModalOpenVirtualTour(false);
    setIsModalOpenArielView(false);
    setIsModalOpenVideos(false);
  };

  return (
    <>
      <div
        className="h-[150px] md:h-[500px] relative w-full"
        style={{
          backgroundImage: `url(${config.url.ASSET_URL}${cover_image.link})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-0 left-0 md:flex justify-start items-center md:space-x-4 md:ml-5 ml-2">
          <Button
            className={
              "bg-blue-600 min-w-max text-xs md:text-sm px-2 py-2 dark:bg-dark-primary darkText"
            }
            onClick={OpenGallery}
          >
            Gallery
          </Button>
          {property_videos && (
            <Button
              className={
                "bg-blue-600 min-w-max md:ml-0 ml-1 text-xs md:text-sm px-2 py-2 dark:bg-dark-primary darkText"
              }
              onClick={OpenVideos}
            >
              Videos
            </Button>
          )}
          {tour_videos && (
            <Button
              className={
                "bg-blue-600 min-w-max md:ml-0 ml-1 text-xs md:text-sm px-2 py-2 dark:bg-dark-primary darkText"
              }
              onClick={OpenVirtualTour}
            >
              Virtual Tour
            </Button>
          )}
          {arial_videos && (
            <Button
              className={
                "bg-blue-600 min-w-max md:mt-0 mt-1 mb-1 ml-1 md:mb-0 text-xs md:text-sm px-2 py-2 dark:bg-dark-primary darkText"
              }
              onClick={OpenArielView}
            >
              Arial View
            </Button>
          )}
        </div>
      </div>

      <Modal
        title={"Property Gallery"}
        isOpen={isModalOpenGallery}
        onClose={CloseModal}
        height={"h-screen"}
        width={"max-w-full"}
      >
        <Imageslider title={"Property Gallery"} images={property_images} />
      </Modal>

      <Modal
        title={"Videos"}
        isOpen={isModalOpenVideos}
        height={"h-screen"}
        width={"xl:w-3/5 md:w-full"}
        onClose={CloseModal}
        closeOnOutsideClick={true}
      >
        <VideoSlider videos={property_videos} />
      </Modal>

      <Modal
        title={"Virtual Tour"}
        height={"h-screen"}
        width={"xl:w-3/5 md:w-full"}
        isOpen={isModalOpenVirtualTour}
        onClose={CloseModal}
        closeOnOutsideClick={true}
      >
        <VideoSlider videos={tour_videos} />
      </Modal>
      <Modal
        title={"Arial View"}
        isOpen={isModalOpenArielView}
        height={"h-screen"}
        width={"xl:w-3/5 md:w-full"}
        onClose={CloseModal}
        closeOnOutsideClick={true}
      >
        <VideoSlider videos={arial_videos} />
      </Modal>
    </>
  );
};
