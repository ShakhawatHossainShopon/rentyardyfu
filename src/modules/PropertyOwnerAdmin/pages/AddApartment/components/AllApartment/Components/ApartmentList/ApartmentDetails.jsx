import {
  Button,
  Imageslider,
  PopUp,
  SingleImage,
  VideoSlider,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { memo, useState } from "react";
export const ApartmentDetails = memo(({ item }) => {
  const dispatch = useAppDispatch();
  // Modal States
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const [isModalOpenGallery2, setIsModalOpenGallery2] = useState(false);
  const [isModalOpenMapView, setIsModalOpenMapView] = useState(false);
  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);

  // openModal Functions
  const OpenGallery = () => {
    setIsModalOpenGallery(true);
  };
  const OpenGallery2 = () => {
    setIsModalOpenGallery2(true);
  };
  const OpenMapView = () => {
    setIsModalOpenMapView(true);
  };
  const OpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  // Close Modal funtions
  const CloseModal = () => {
    setIsModalOpenGallery(false);
    setIsModalOpenGallery2(false);
    setIsModalOpenMapView(false);
    setIsModalOpenVirtualTour(false);
  };
  return (
    <div className="block text-gray-700 antialiased font-sans text-sm font-light leading-normal p-4 w-full bg-gray-50 border-t-0">
      <div className="md:flex justify-between items-start">
        <div className="flex-1">
          <p className="text-base font-semibold">{item.property_name}</p>
          <p className="text-base font-semibold">
            Unit Type :<span className="font-normal"> {item.type} </span>
          </p>
          <p className="text-base font-semibold">
            Unit Number :
            <span className="font-normal"> #{item.unit_number} </span>
          </p>
          <p className="text-base font-semibold">
            Rent :<span className="font-normal"> ${item.rent} </span>
          </p>
          {item.discount && (
            <p className="text-base font-semibold">
              Discount :<span className="font-normal"> ${item.discount} </span>
            </p>
          )}
          {item.unit_name && (
            <p className="text-base font-semibold">
              Unit Name :<span className="font-normal"> {item.unit_name} </span>
            </p>
          )}
          {item.building_name && (
            <p className="text-base font-semibold">
              Building Name :
              <span className="font-normal"> {item.building_name} </span>
            </p>
          )}
          <p className="text-base font-semibold">
            Bed :<span className="font-normal"> {item.bed_count} </span>
          </p>
          <p className="text-base font-semibold">
            Bath :<span className="font-normal"> {item.bath_count} </span>
          </p>
          <p className="text-base font-semibold">
            Space :<span className="font-normal"> {item.space}Sqft</span>
          </p>
        </div>
        <div className="flex-1">
          {item.lease_term && (
            <p className="text-base font-semibold">
              Lease Term :{" "}
              {item.lease_term &&
                item.lease_term.map((elem) => {
                  return (
                    <span key={elem} className="font-normal">
                      {" "}
                      {elem},
                    </span>
                  );
                })}
            </p>
          )}
          <ul className="list-disc mt-1">
            <p className="text-base font-semibold">Fees </p>
            {item.fees &&
              item.fees.map((elem) => {
                return (
                  <li key={elem} className="ml-6">
                    {elem.title} - {elem.amount} - {elem.time}
                  </li>
                );
              })}
          </ul>
          <p className="text-base font-semibold underline">
            Amenities :
            {item.fees &&
              item.amenities.map((elem) => {
                return (
                  <span key={elem} className="font-normal">
                    {" "}
                    {elem.title}
                  </span>
                );
              })}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-base font-semibold">
            Availability :{" "}
            <span className="font-normal"> {item.availability} </span>
          </p>
          <p className="text-base font-semibold">
            Resident Email :{" "}
            <span className="font-normal"> {item.user_email} </span>
          </p>
          {item.available_date && (
            <p className="text-base font-semibold">
              Availability Date :{" "}
              <span className="font-normal"> {item.available_date} </span>
            </p>
          )}
          <br />
          <p
            className="text-base font-semibold underline cursor-pointer pt-1"
            onClick={OpenGallery}
          >
            View Floor Plan
          </p>
          <p
            className="text-base font-semibold underline cursor-pointer pt-1"
            onClick={OpenGallery2}
          >
            View Image Gallery
          </p>
          {item.unit_image && (
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={OpenMapView}
            >
              View Unit Map
            </p>
          )}
          {item.tour_video && (
            <p
              className="text-base font-semibold underline cursor-pointer pt-1"
              onClick={OpenVirtualTour}
            >
              Virtual Tour
            </p>
          )}
        </div>
      </div>
      <div className={"flex gap-4 py-6"}>
        <Button className={"bg-black hover:bg-blue-gray-900"}>Edit</Button>
        <Button className={"bg-blue-700"}>Publish</Button>
        <Button className={"bg-red-700 hover:bg-red-800"}>Delete</Button>
      </div>
      {/* All Pop ups */}
      {/* Floor Gallery */}
      <PopUp
        title={"Floor Gallery"}
        isOpen={isModalOpenGallery}
        onClose={CloseModal}
      >
        <Imageslider images={item.floor_plans} />
      </PopUp>
      {/* Image Gellery */}
      <PopUp
        title={"Image Gallery"}
        isOpen={isModalOpenGallery2}
        onClose={CloseModal}
      >
        <Imageslider images={item.gallery_images} />
      </PopUp>
      {/* Map View */}
      <PopUp title={"MapView"} isOpen={isModalOpenMapView} onClose={CloseModal}>
        <SingleImage src={item.unit_image ? item.unit_image : ""} />
      </PopUp>
      {/* Virtual Tour*/}
      <PopUp
        title={"Virtual tour"}
        isOpen={isModalOpenVirtualTour}
        onClose={CloseModal}
      >
        <VideoSlider videos={item.tour_video ? item.tour_video : ""} />
      </PopUp>
      {/* All Pop ups */}
    </div>
  );
});
