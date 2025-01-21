import { Pagination } from "@/components";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { WorkOrderInfo } from "./WorkOrderInfo";

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

export const WorkOrderComp = ({ loading, data }) => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : paginatedData?.length > 0 ? (
        paginatedData?.map((item, index) => {
          return (
            <Accordion
              key={item.workOrderId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white md:px-4 px-2 hover:text-white text-sm dark:bg-dark-primary darkText"
                onClick={() => handleOpen(index + 1)}
              >
                ID#{item.requestId} -{" "}
                {item?.apartment?.unit_number
                  ? `Unit:{" "}
                ${item && item.apartment && item.apartment.unit_number}(
                ${item && item.apartment && item.apartment.type})`
                  : item?.property?.name}{" "}
                - Contact: {item.contact_number} - Status: {item.status}{" "}
                {item.working_date_formatted
                  ? ` - ${item.working_date_formatted}`
                  : null}
                {item.working_time ? ` - (${item.working_time})` : null}
              </AccordionHeader>
              <AccordionBody
                className={
                  "md:p-4 p-2 w-full md:border  md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode darkText"
                }
              >
                <WorkOrderInfo item={item} history={false} />
              </AccordionBody>
            </Accordion>
          );
        })
      ) : (
        <div className="w-full flex justify-center items-center h-[20vh]">
          No New Requests...
        </div>
      )}
      {data.length > 0 && (
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
