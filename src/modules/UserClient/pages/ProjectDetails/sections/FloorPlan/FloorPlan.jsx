import { Pagination } from "@/components";
import { useState } from "react";
import { FloorCardV2 } from "./Components";

export const FloorPlan = ({
  apartments,
  name,
  location,
  city,
  state,
  country,
  office_working_days,
  tour_accept_hours,
  working_hours,
  document,
  fee,
  zip,
}) => {
  const [id, setId] = useState("All");
  const [allApartments, setAllApartments] = useState(apartments);

  // Dynamically compute filter buttons
  const filterBtn = [
    "All",
    "Studio",
    "1 Bed",
    "2 Beds",
    "3 Beds",
    "4 Beds",
  ].filter(
    (btn) => btn === "All" || apartments.some((apt) => apt.bed_count === btn)
  );

  const handleFilter = (id) => {
    setId(id);
    if (id === "All") {
      setAllApartments(apartments);
    } else {
      setAllApartments(
        apartments.filter((apartment) => apartment.bed_count === id)
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = allApartments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="px-4 space-y-8" id="floor-plan">
      <h2 className="md:text-2xl font-semibold text-xl md:text-start">
        Floor Plan & Pricing
      </h2>
      <div className="flex justify-start items-center space-x-5 bg-gray-300 px-3 py-2 w-fit dark:bg-darkMode">
        {filterBtn.map((btn) => (
          <button
            key={btn}
            onClick={() => handleFilter(btn)}
            className={`text-sm md:text-base font-medium ${
              id === btn ? "text-blue-500" : ""
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {paginatedData.map((item) => {
            const {
              address,
              pendingApplication,
              residentApplication,
              rent_and_lease,
              amenities,
              apartmentId,
              availability,
              available_date,
              available_date_raw,
              bath_count,
              bed_count,
              building_name,
              creatorId,
              discount_amount,
              discount_name,
              fees,
              floor_plans,
              gallery_images,
              lease_term,
              propertyId,
              rent,
              rent_paying,
              space,
              tour_video,
              type,
              unit_image,
              unit_name,
              unit_number,
              userId,
              utilities,
              tours,
            } = item;
            return (
              <FloorCardV2
                zip={zip}
                discount_amount={discount_amount}
                discount_name={discount_name}
                available_date_raw={available_date_raw}
                tours={tours}
                address={address}
                fee={fee}
                key={item.apartmentId}
                amenities={amenities}
                apartmentId={apartmentId}
                availability={availability}
                available_date={available_date}
                bath_count={bath_count}
                bed_count={bed_count}
                building_name={building_name}
                creatorId={creatorId}
                fees={fees}
                floor_plans={floor_plans}
                gallery_images={gallery_images}
                propertyId={propertyId}
                rent_paying={rent_paying}
                space={space}
                tour_video={tour_video}
                type={type}
                unit_image={unit_image}
                unit_name={unit_name}
                unit_number={unit_number}
                userId={userId}
                utilities={utilities}
                name={name}
                location={location}
                city={city}
                state={state}
                country={country}
                office_working_days={office_working_days}
                tour_accept_hours={tour_accept_hours}
                working_hours={working_hours}
                rent_and_lease={rent_and_lease}
                pendingApplication={pendingApplication}
                residentApplication={residentApplication}
                document={document}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[30vh]">
          {" "}
          No Apartment Available...{" "}
        </div>
      )}
      {allApartments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={allApartments.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
