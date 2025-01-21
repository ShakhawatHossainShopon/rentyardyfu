import { AdminHeader, UpdateLoginInfo } from "@/components";
import { useGetUserSelector, useScrollToTop } from "@/hooks";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { AboutYou, Company } from "./components";

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

const PropertyAccountSettings = () => {
  const [open, setOpen] = useState(0);
  const { loading, data } = useGetUserSelector();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  useScrollToTop();
  return (
    <div className="w-full">
      <AdminHeader title={"Account Setting"} />
      {loading ? (
        <div className="w-full flex justify-center items-center h-[90vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="w-full md:p-4 p-2 space-y-5">
          <p className="bg-pink-50 px-2 py-1 md:text-base text-sm dark:bg-[#360000] darkText">
            Note: Please provide accurate information. Incorrect information may
            result in account suspension.
          </p>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm dark:bg-dark-primary darkText"
              onClick={() => handleOpen(1)}
            >
              Update Login Details
            </AccordionHeader>
            <AccordionBody
              className={
                "md:px-4 px-2 w-full md:border md:border-blue-500 border-t-0 bg-gray-50 dark:bg-darkMode dark:border-dark-primary"
              }
            >
              <UpdateLoginInfo />
            </AccordionBody>
          </Accordion>
          <Accordion
            className="overflow-y-visible"
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm dark:bg-dark-primary darkText"
              onClick={() => handleOpen(2)}
            >
              About You
            </AccordionHeader>
            <AccordionBody
              className={
                "px-4 w-full md:border md:border-blue-500 border-t-0 bg-gray-50 dark:bg-darkMode darkText dark:md:border-dark-primary"
              }
            >
              <AboutYou res={data && data} />
            </AccordionBody>
          </Accordion>
          <Accordion
            className="overflow-y-visible"
            open={open === 3}
            icon={<Icon id={3} open={open} />}
          >
            <AccordionHeader
              className="bg-blue-700 text-white md:px-4 px-2 hover:text-white md:text-[1.25rem] text-sm dark:bg-dark-primary darkText"
              onClick={() => handleOpen(3)}
            >
              Company Details
            </AccordionHeader>
            <AccordionBody
              className={
                "px-4 w-full md:border md:border-blue-500 border-t-0 bg-gray-50 dark:bg-darkMode darkText dark:md:border-dark-primary"
              }
            >
              <Company res={data && data} />
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default PropertyAccountSettings;
