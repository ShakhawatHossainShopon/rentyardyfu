import { Pagination } from "@/components";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { UpdateSingleProperty } from "../UpdateSingleProperty/UpdateSingleProperty";
function Icon({ id, open, onClick }) {
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
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const SinglePropertyList = ({ loading, data }) => {
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
    <div className="space-y-3">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : !loading && paginatedData?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[40vh]">
          No Property Available...
        </div>
      ) : (
        paginatedData?.map((item, index) => {
          return (
            <>
              <Accordion key={item.propertyId} open={open === index + 1}>
                <AccordionHeader className="bg-blue-700 py-0 text-white hover:text-white text-sm dark:bg-dark-primary darkText">
                  <div className="flex justify-start items-center w-full">
                    <div
                      onClick={() => handleOpen(index + 1)}
                      className="flex-1 py-4 bg-red flex justify-between items-center px-2"
                    >
                      <div>
                        {item.name} - {item.city} - {item.state} -{" "}
                        {item.country} -{" "}
                        {item.published ? `(Published)` : `(Unpublished)`}
                      </div>
                      <div className="flex justify-start items-center space-x-3 mt-3 md:mt-0">
                        <Icon
                          onClick={() => handleOpen(index + 1)}
                          id={index + 1}
                          open={open}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody
                  className={
                    "md:p-4 p-2 w-full md:border md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode dark:border-dark-primary"
                  }
                >
                  <UpdateSingleProperty item={item} />
                </AccordionBody>
              </Accordion>
            </>
          );
        })
      )}
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
