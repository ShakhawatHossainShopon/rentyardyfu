import { Pagination } from "@/components";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { TourRequestInfo } from "./TourRequestInfo";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const TourRequestComp = ({ loading, data }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : !loading && paginatedData?.length > 0 ? (
        paginatedData?.map((item, index) => {
          return (
            <Accordion
              key={item.tourId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white md:px-4 px-2 hover:text-white text-sm dark:bg-dark-primary darkText"
                onClick={() => handleOpen(index + 1)}
              >
                {item &&
                  item.property &&
                  item.property.name &&
                  item.property.name}{" "}
                - Apt{" "}
                {item &&
                  item.apartment &&
                  item.apartment.unit_number &&
                  item.apartment.unit_number}{" "}
                - Contact -{" "}
                {item &&
                  item.user &&
                  item.user.contact_number &&
                  item.user.contact_number}{" "}
                - Status: {item && item.status && item.status}
              </AccordionHeader>
              <AccordionBody
                className={
                  "p-4 w-full md:border md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode darkText"
                }
              >
                <TourRequestInfo
                  history={false}
                  photo={
                    item &&
                    item.user &&
                    item.user.govt_id_photo &&
                    item.user.govt_id_photo
                  }
                  name={item && item.user && item.user.name && item.user.name}
                  contact={
                    item &&
                    item.user &&
                    item.user.contact_number &&
                    item.user.contact_number
                  }
                  email={
                    item && item.user && item.user.email && item.user.email
                  }
                  title={
                    item &&
                    item.property &&
                    item.property.name &&
                    item.property.name
                  }
                  address={
                    item &&
                    item.property &&
                    item.property.address &&
                    item.property.address
                  }
                  city={
                    item &&
                    item.property &&
                    item.property.city &&
                    item.property.city
                  }
                  state={
                    item &&
                    item.property &&
                    item.property.state &&
                    item.property.state
                  }
                  country={
                    item &&
                    item.property &&
                    item.property.country &&
                    item.property.country
                  }
                  zip={
                    item &&
                    item.property &&
                    item.property.zip &&
                    item.property.zip
                  }
                  type={
                    item &&
                    item.apartment &&
                    item.apartment.type &&
                    item.apartment.type
                  }
                  unit_number={
                    item &&
                    item.apartment &&
                    item.apartment.unit_number &&
                    item.apartment.unit_number
                  }
                  date={item && item.date && item.date}
                  tourId={item && item.tourId && item.tourId}
                  propertyId={item && item.propertyId && item.propertyId}
                  time={item && item.time && item.time}
                  status={item && item.status && item.status}
                  note={item && item.note && item.note}
                  tourType={item && item.type && item.type}
                  link={item && item.link && item.link}
                />
              </AccordionBody>
            </Accordion>
          );
        })
      ) : (
        <div className="w-full flex justify-center items-center h-[40vh]">
          {" "}
          No Tour Available...{" "}
        </div>
      )}
      {data?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data?.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
