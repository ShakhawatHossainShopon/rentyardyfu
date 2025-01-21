import {
  Button,
  Imageslider,
  PopUp,
  SingleImage,
  VideoSlider,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { deleteProperty, updateProperty } from "@/services/property/property";
import { useState } from "react";
export const PropertyDetails = ({ item, openModal, handleOpen }) => {
  const dispatch = useAppDispatch();
  // Modal States
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const [isModalCoverPhoto, setIsModalCoverPhoto] = useState(false);
  const [isModalListingCard, setIsModalListingCard] = useState(false);
  const [isModalPropertiesvideos, setIsModalPropertiesvideos] = useState(false);
  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);
  const [isModalOpenArielView, setIsModalOpenArielView] = useState(false);
  // openModal Functions
  const OpenGallery = () => {
    setIsModalOpenGallery(true);
  };
  // openModal Functions
  const ListingCard = () => {
    setIsModalListingCard(true);
  };
  const OpenCoverPhoto = () => {
    setIsModalCoverPhoto(true);
  };
  const Propertiesvideos = () => {
    setIsModalPropertiesvideos(true);
  };
  const OpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  const OpenArielView = () => {
    setIsModalOpenArielView(true);
  };
  // Close Modal funtions
  const CloseModal = () => {
    setIsModalOpenGallery(false);
    setIsModalCoverPhoto(false);
    setIsModalOpenVirtualTour(false);
    setIsModalPropertiesvideos(false);
    setIsModalListingCard(false);
    setIsModalOpenArielView(false);
  };
  const {
    name,
    about_property,
    address,
    arial_videos,
    city,
    community_amenities,
    contact_email,
    contact_number,
    country,
    cover_image,
    custom_policy,
    document,
    late_fee,
    lease_term,
    listing_image,
    manager_name,
    onetime_monthly,
    parking,
    payment,
    pet_policy,
    propertyId,
    property_images,
    property_videos,
    published,
    schools,
    state,
    statement,
    tour_videos,
    transportation,
    unit,
    userId,
    utilities,
    website,
    zip,
  } = item;

  const handlePublish = () => {
    dispatch(
      updateProperty({
        propertyId,
        published: published ? false : true,
      })
    );
  };

  const handleDelete = () => {
    handleOpen(0);
    dispatch(deleteProperty(item.propertyId));
  };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-base font-semibold"> {name} </p>
            <p className="text-base font-semibold">
              Total Unit Number :<span className="font-normal"> {unit} </span>
            </p>
            <p className="text-base font-semibold">
              Address : <br />
              <span className="font-normal">{address}</span>
            </p>
            <p className="text-base font-semibold">City: {city} </p>
            <p className="text-base font-semibold">State: {state} </p>
            <p className="text-base font-semibold">Country: {country} </p>
          </div>
          <div>
            <p className="text-base font-semibold">
              Contact :<span className="font-normal"> {contact_number} </span>
            </p>
            <p className="text-base font-semibold">
              Email :<span className="font-normal"> {contact_email}</span>
            </p>
            <p className="text-base font-semibold">
              Manager :<span className="font-normal"> {manager_name}</span>
            </p>
            <p className="text-base font-semibold">
              Zip :<span className="font-normal"> {zip}</span>
            </p>
            {website && (
              <p className="text-base font-semibold">
                Website :<span className="font-normal"> {website} </span>
              </p>
            )}
          </div>
          <div>
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={OpenCoverPhoto}
            >
              View Property Cover Photo
            </p>
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={ListingCard}
            >
              View Property Listing Card Photo
            </p>
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={OpenGallery}
            >
              View Property Images
            </p>
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={Propertiesvideos}
            >
              View Property Videos
            </p>
            {tour_videos && (
              <p
                className="text-base font-semibold underline cursor-pointer pt-1"
                onClick={OpenVirtualTour}
              >
                View Property Virtual Tour
              </p>
            )}
            {arial_videos && (
              <p
                className="text-base font-semibold underline cursor-pointer pt-1"
                onClick={OpenArielView}
              >
                View Property Arial View
              </p>
            )}
          </div>
        </div>
        <div className={"flex gap-4 py-6"}>
          <Button onClick={openModal}>Edit</Button>
          <Button onClick={() => handlePublish()} className={"bg-black"}>
            {" "}
            {published ? "Unpublish" : "Publish"}{" "}
          </Button>
          <Button
            onClick={handleDelete}
            className={"bg-red-700 hover:bg-red-800"}
          >
            Delete
          </Button>
        </div>
      </div>
      {/* Pop ups */}
      {/* Cover photo */}
      <PopUp
        title={"Cover Photo"}
        isOpen={isModalCoverPhoto}
        onClose={CloseModal}
      >
        <SingleImage src={cover_image} />
      </PopUp>
      {/* Cover photo */}
      {/* Listing Card */}
      <PopUp
        title={"Listing Card Image"}
        isOpen={isModalListingCard}
        onClose={CloseModal}
      >
        <SingleImage src={listing_image} />
      </PopUp>
      {/* Image Gellery */}
      <PopUp
        title={"Property Image Gallery"}
        isOpen={isModalOpenGallery}
        onClose={CloseModal}
      >
        <Imageslider images={property_images} />
      </PopUp>
      {/* Video Gallery*/}
      <PopUp
        title={"Property Video Gallery"}
        isOpen={isModalPropertiesvideos}
        onClose={CloseModal}
      >
        <VideoSlider videos={property_videos} />
      </PopUp>
      {/* Virtual Tour*/}
      {tour_videos && (
        <PopUp
          title={"Virtual tour"}
          isOpen={isModalOpenVirtualTour}
          onClose={CloseModal}
        >
          <VideoSlider videos={tour_videos ? tour_videos : []} />
        </PopUp>
      )}
      {/* Ariel View*/}
      {arial_videos && (
        <PopUp
          title={"Ariel View"}
          isOpen={isModalOpenArielView}
          onClose={CloseModal}
        >
          <VideoSlider videos={arial_videos ? arial_videos : []} />
        </PopUp>
      )}
      {/* Pop ups */}
    </div>
  );
};
