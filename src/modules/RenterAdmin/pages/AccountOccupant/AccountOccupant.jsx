import { AdminHeader, UpdateLoginInfo } from "@/components";
import { useAppDispatch, useGetUserSelector, useScrollToTop } from "@/hooks";
import { getUser } from "@/services/user/user";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  AboutYou,
  AddOccupant,
  Address,
  CrimeRecords,
  ForeignRental,
  Job,
} from "./components";

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

const AccountOccupant = () => {
  useScrollToTop();
  const [open, setOpen] = useState(0);
  const dispatch = useAppDispatch();
  const { loading, data } = useGetUserSelector();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Profile and Occupants"} />
      {loading ? (
        <div className="w-full flex justify-center items-center h-[90vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="w-full p-4 space-y-5">
          <p className="md:text-base text-sm">
            Please provide correct information. The property manager will check
            your background, including credit score, criminal history, and
            income verification. Providing incorrect information can result in
            denial or suspension of your application.
          </p>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(1)}
            >
              Update Login Details
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <UpdateLoginInfo />
            </AccordionBody>
          </Accordion>
          <Accordion
            className=""
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(2)}
            >
              About You
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <AboutYou res={data && data} />
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(3)}
            >
              Your work and Income
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <Job res={data && data} />
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(4)}
            >
              Your Address
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <Address res={data && data} />
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(5)}
            >
              Add Occupant or Co-Applicants
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <AddOccupant />
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(6)}
            >
              Foreign/International Rental
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <ForeignRental res={data && data} />
            </AccordionBody>
          </Accordion>

          <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
            <AccordionHeader
              className="bg-blue-700 text-white px-4 hover:text-white md:text-[1.25rem] text-base dark:bg-dark-primary darkText"
              onClick={() => handleOpen(7)}
            >
              Crime Records
            </AccordionHeader>
            <AccordionBody
              className={
                "border border-t-0 border-blue-500 p-4 bg-gray-100 dark:bg-transparent dark-border-2 dark:border-dark-primary"
              }
            >
              <CrimeRecords res={data && data} />
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default AccountOccupant;
