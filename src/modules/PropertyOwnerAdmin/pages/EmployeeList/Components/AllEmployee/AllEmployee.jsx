import { Pagination, UpdateEmployeeLoginInfo } from "@/components";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { UpdateEmployee } from "./UpdateEmployee";

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

function Iconed({ id, open }) {
  return <>{id === open ? <Icons.Minus /> : <Icons.Plus />}</>;
}

export const AllEmployee = ({ loading, data }) => {
  const [open, setOpen] = useState(0);
  const [open2, setOpen2] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpen2 = (value) => setOpen2(open2 === value ? 0 : value);

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
      ) : paginatedData?.length > 0 ? (
        paginatedData?.map((item, index) => {
          return (
            <Accordion
              key={item.employeeId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm dark:bg-dark-primary darkText"
                onClick={() => handleOpen(index + 1)}
              >
                {item.first_name} {item.last_name} - {item.position}
              </AccordionHeader>
              <AccordionBody
                className={
                  "md:px-4 px-2 w-full bg-gray-100 border border-blue-500 dark:bg-darkMode darkText dark:border-dark-primary"
                }
              >
                <UpdateEmployee item={item && item} />
                <Accordion
                  open={open2 === 1}
                  icon={<Iconed id={1} open={open2} />}
                >
                  <AccordionHeader
                    className="bg-blue-600 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm dark:bg-dark-primary darkText"
                    onClick={() => handleOpen2(1)}
                  >
                    Update Login Details For This Employee
                  </AccordionHeader>
                  <AccordionBody
                    className={
                      "bg-white px-2 border border-blue-500 dark:bg-darkMode darkText dark:border-dark-primary"
                    }
                  >
                    <UpdateEmployeeLoginInfo item={item && item} />
                  </AccordionBody>
                </Accordion>
              </AccordionBody>
            </Accordion>
          );
        })
      ) : (
        <div className="w-full flex justify-center items-center h-[40vh] darkText">
          {" "}
          No Employee Available...{" "}
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
