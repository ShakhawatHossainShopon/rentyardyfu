import {
  BookTour,
  Button,
  Imageslider,
  Modal,
  RentApply,
  VideoSlider,
} from "@/components";
import { config } from "@/config";
import { useGetUserSelector } from "@/hooks";
import { Icons } from "@/utils";
import { useState } from "react";
import { LeaseTermPopUp } from "../LeaseTermPopUp";
export const FloorCardV2 = ({
  available_date_raw,
  location,
  zip,
  document,
  discount_amount,
  discount_name,
  pendingApplication,
  residentApplication,
  tours,
  rent_and_lease,
  fee,
  amenities,
  apartmentId,
  availability,
  available_date,
  bath_count,
  bed_count,
  building_name,
  creatorId,
  discount,
  fees,
  floor_plans,
  gallery_images,
  propertyId,
  rent_paying,
  space,
  tour_video,
  type,
  unit_image,
  unit_name,
  unit_number,
  userId,
  utilities,
  name,
  address,
  city,
  state,
  country,
  office_working_days,
  tour_accept_hours,
  working_hours,
}) => {
  const { data } = useGetUserSelector();
  const [isModalOpenLeaseTerm, setIsModalOpenLeaseTerm] = useState(false);
  const [isModalOpenBookTour, setIsModalOpenBookTour] = useState(false);
  const [isModalOpenApplyRent, setIsModalOpenApplyRent] = useState(false);
  const [isModalOpenUnitMap, setIsModalOpenUnitMap] = useState(false);
  const [isModalOpenVirtualTour, setIsModalOpenVirtualTour] = useState(false);
  const [isModalOpenImageSlider, setIsModalOpenImageSlider] = useState(false);
  const OpenLeaseTerm = () => {
    setIsModalOpenLeaseTerm(true);
  };
  const OpenBookTour = () => {
    setIsModalOpenBookTour(true);
  };
  const OpenRentApply = () => {
    setIsModalOpenApplyRent(true);
  };
  const OpenUnitMap = () => {
    setIsModalOpenUnitMap(true);
  };
  const OpenVirtualTour = () => {
    setIsModalOpenVirtualTour(true);
  };
  const OpenImageSlider = () => {
    setIsModalOpenImageSlider(true);
  };
  const closeModal = () => {
    setIsModalOpenLeaseTerm(false);
    setIsModalOpenBookTour(false);
    setIsModalOpenApplyRent(false);
    setIsModalOpenUnitMap(false);
    setIsModalOpenVirtualTour(false);
    setIsModalOpenImageSlider(false);
  };
  return (
    <div className="max-h-fit">
      {" "}
      <div className="flex flex-col sm:flex-row p-2 mx-auto bg-[#F1F1F1] rounded-xl border border-[#C0C0C0] dark:bg-[#102A43] dark:border-[#87ACCF] place-items-center relative h-fit">
        {discount_name && (
          <span className="absolute top-0 left-0">
            <Icons.Offer className="text-red-600 text-xl" />
          </span>
        )}
        <div className="flex justify-center items-center overflow-hidden w-full h-full">
          <div className="overflow-hidden sm:h-[100px] flex justify-center items-center w-full">
            <img
              className="w-full h-full sm:pt-0 pt-4 sm:object-cover object-contain rounded-md cursor-pointer"
              onClick={OpenImageSlider}
              src={`${config.url.ASSET_URL}${floor_plans[0].link}`}
              alt="Floor Card"
            />
          </div>
        </div>
        <div className="sm:flex flex-col items-center justify-center w-full px-10 sm:px-0">
          <p className="font-semibold text-lg sm:text-xs py-1">
            {bed_count}, {bath_count}
          </p>
          <p className="font-semibold text-lg sm:text-xs py-1">
            Unit #{unit_number}
          </p>
          <p className="font-semibold text-lg sm:text-xs py-1">
            {" "}
            {type} - {space}
            <span className="font-normal">sqft</span>
          </p>
        </div>
        <div className="sm:flex items-center sm:gap-6 justify-center sm:border-x-2 sm:border-gray-400 sm:text-center px-10 sm:px-0 w-full">
          <div>
            <p
              onClick={OpenLeaseTerm}
              className="font-semibold py-1 text-lg sm:text-xs hover:text-blue-600 sm:px-5 hover:rounded-lg  cursor-pointer"
            >
              Lease & Rent{" "}
            </p>
            <p
              onClick={OpenVirtualTour}
              className="font-semibold py-1 text-lg sm:text-xs hover:text-blue-600 sm:px-5 hover:rounded-lg  cursor-pointer"
            >
              3D Tour
            </p>
            <p
              onClick={OpenUnitMap}
              className="font-semibold py-1 text-lg sm:text-xs hover:text-blue-600 sm:px-5 hover:rounded-lg cursor-pointer"
            >
              Unit Gallery
            </p>
          </div>
        </div>
        <div className="w-full sm:text-center sm:flex items-center gap-6 justify-center px-10 sm:px-0">
          <div>
            <p className="font-semibold text-lg sm:text-xs py-1">
              Availability
            </p>
            <p className="font-semibold text-lg sm:text-xs py-1 sm:px-5">
              {available_date && availability === "Vacant" ? (
                <span className="text-green-600">Available On</span>
              ) : !available_date && availability === "Vacant" ? (
                <span className="text-green-600">Available Now</span>
              ) : availability === "Occupied" ? (
                <span className="text-red-600">Occupied</span>
              ) : available_date && availability === "Moving-Out" ? (
                <span className="text-red-600">Available On</span>
              ) : null}
            </p>
            {availability !== "Occupied" && (
              <p className="font-semibold text-lg sm:text-xs py-1 sm:px-5">
                {available_date}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end pl-4 sm:border-l-2 border-gray-400 pb-4 sm:pb-0 w-full">
          <div className="w-full text-center space-y-2">
            <Button
              onClick={OpenBookTour}
              disabled={availability === "Occupied" ? true : false}
              className={
                "bg-[#00CCD9] w-full py-2 rounded-lg sm:text-xs dark:bg-[#00CCD9] dark:text-white hover:bg-[#00cbd9ae] dark:hover:bg-[#00cbd9ae]"
              }
            >
              Book Tour
            </Button>
            <Button
              onClick={OpenRentApply}
              disabled={availability === "Occupied" ? true : false}
              className={"w-full sm:text-xs py-2 px-3 rounded-lg"}
            >
              Apply For Rent
            </Button>
          </div>
        </div>
      </div>
      {/* Lease Term Pop Up */}
      <Modal
        title={"Available Lease Term"}
        isOpen={isModalOpenLeaseTerm}
        onClose={closeModal}
        width={"lg:w-2/6 w-full"}
        closeOnOutsideClick={true}
      >
        <LeaseTermPopUp
          rent_and_lease={rent_and_lease}
          discount_amount={discount_amount}
          discount_name={discount_name}
        />
      </Modal>
      {/* BookTour Pop Up */}
      <Modal
        title={"Book Tour"}
        isOpen={isModalOpenBookTour}
        onClose={closeModal}
        width={"sm:w-4/6 w-full"}
      >
        <BookTour
          zip={zip}
          name={name}
          address={address}
          location={location}
          city={city}
          state={state}
          country={country}
          unit_number={unit_number}
          type={type}
          apartmentId={apartmentId}
          propertyId={propertyId}
          onClose={closeModal}
          office_working_days={office_working_days}
          tour_accept_hours={tour_accept_hours}
          working_hours={working_hours}
          tourPropertyIds={data && data.tourPropertyIds && data.tourPropertyIds}
          tours={tours}
        />
      </Modal>
      {/* Rent Apply Pop Up */}
      <Modal
        title={"Apply For Rent"}
        isOpen={isModalOpenApplyRent}
        onClose={closeModal}
        width={"sm:w-4/6 w-full"}
      >
        <RentApply
          available_date={available_date_raw}
          zip={zip}
          discount_amount={discount_amount}
          discount_name={discount_name}
          fee={fee}
          name={name}
          location={location}
          address={address}
          city={city}
          state={state}
          country={country}
          unit_number={unit_number}
          type={type}
          options={rent_and_lease}
          apartmentId={apartmentId}
          propertyId={propertyId}
          onClose={closeModal}
          pendingApplication={pendingApplication}
          residentApplication={residentApplication}
          pendingApartmentIds={
            data && data.pendingApartmentIds && data.pendingApartmentIds
          }
          residentApartmentIds={
            data && data.residentApartmentIds && data.residentApartmentIds
          }
          document={document}
        />
      </Modal>
      {/* Unit Map Pop Up */}
      <Modal
        title={"Unit Gallery"}
        isOpen={isModalOpenUnitMap}
        onClose={closeModal}
        width={"sm:w-full h-screen"}
      >
        <Imageslider images={gallery_images} />
      </Modal>
      {/* Virtual Tour Pop Up */}
      <Modal
        title={"3D Tour"}
        isOpen={isModalOpenVirtualTour}
        onClose={closeModal}
        width={"sm:w-4/6 w-full"}
      >
        <VideoSlider videos={tour_video ? tour_video : []} />
      </Modal>
      {/* Image Slider Pop Up */}
      <Modal
        title={"Floor Plan"}
        isOpen={isModalOpenImageSlider}
        onClose={closeModal}
        height={"h-screen"}
        width={"w-full"}
      >
        <Imageslider title={"Floor Plan"} images={floor_plans} />
      </Modal>
    </div>
  );
};
