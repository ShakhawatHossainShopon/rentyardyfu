import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { deleteTour } from "@/services/tour/tour";
import { Icons } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const TourSceduleCard = ({
  link,
  isButton,
  isActive,
  isDashboard,
  status,
  title,
  duration,
  tourId,
  address,
  city,
  state,
  country,
  zip,
  type,
  unit_number,
  date,
  time,
  note,
  tourType,
}) => {
  const dispatch = useAppDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const handleCancelTour = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteTour({ tourId: id }));
      }
    });
  };

  const Address = `${address && address}, ${city && city} ${state && state} ${
    zip && zip
  }`;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Address)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <div className="bg-gray-100 p-4 space-y-1 w-full dark:bg-dark-light">
      {!isDashboard && tourType && (
        <div className="bg-blue-700 p-1 w-fit text-center my-2">
          <p className="text-white w-full text-xs"> {tourType} </p>
        </div>
      )}
      {isDashboard && (
        <div className="bg-blue-700 p-1 w-fit text-center my-2">
          <p className="text-white w-full text-xs"> Upcoming Tour </p>
        </div>
      )}
      <h2 className="md:text-2xl text-base sm:text-lg pb-1 font-semibold">
        {" "}
        {title}{" "}
      </h2>
      <div className="flex justify-start items-start space-x-2">
        <p className="text-gray-700 text-base pt-1.5">
          <Icons.Location className="text-blue-700 dark:text-gray-300" />{" "}
        </p>
        <p className="text-gray-900 md:text-lg text-xs sm:text-lg flex flex-col items-start justify-center">
          <span className="dark:text-gray-400"> {address},</span>
          <span className="dark:text-gray-400 flex justify-start items-center space-x-2">
            {" "}
            <span>
              {city} {state} {zip}, {country}
            </span>
            <span>
              {isCopied ? (
                <Tooltip content="Text Copied">
                  <Icons.Tik />
                </Tooltip>
              ) : (
                <Tooltip content="Copy">
                  <button aria-label="copy" type="button" onClick={handleCopy}>
                    <Icons.Copy className="text-lg" />
                  </button>
                </Tooltip>
              )}
            </span>
          </span>
        </p>
      </div>
      {/* <h3 className="md:text-lg text-xs sm:text-lg pb-1 flex items-center">
        <Icons.Location className="text-black me-1 dark:text-gray-400" />{" "}
        {address}, {city} {state} {zip}, {country}
      </h3> */}
      <p className="md:text-base text-sm">
        <span className="font-semibold ">Unit Number</span>: {unit_number}(
        {type})
      </p>
      {isDashboard && tourType && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Tour Type</span>: {tourType}
        </p>
      )}
      {duration ? (
        <p className="md:text-base text-sm">
          <span className="font-semibold">Duration</span>: {duration}
        </p>
      ) : (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Time & Date</span>: {time}, {date}{" "}
        </p>
      )}

      <p className="text-blue-700 mt-1 font-semibold md:text-base text-sm md:pb-0 pb-2 dark:text-gray-200">
        Status: {status}
      </p>
      {note && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Note</span>: {note}
        </p>
      )}
      {link && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Meeting Link</span>: {link}
        </p>
      )}
      <p className="text-red-600 mt-1 font-semibold md:text-base text-sm md:pb-0 pb-2 dark:text-gray-200">
        Required: Govt. Issued ID/Driver License/Passport
      </p>
      {isButton && (
        <>
          <Button
            onClick={() => handleCancelTour(tourId)}
            className={"bg-red-700 mt-4 hover:bg-red-800"}
          >
            Cancel
          </Button>
        </>
      )}
      {isDashboard && (
        <div>
          <Link to={"/renteradmin/tour"} className={"font-semibold underline"}>
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};
