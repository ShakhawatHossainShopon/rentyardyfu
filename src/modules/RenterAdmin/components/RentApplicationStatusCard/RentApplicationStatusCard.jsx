import { Button, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { CostBreakdownInfo } from "@/modules/UserClient/pages/ProjectDetails/sections/FloorPlan/Components";
import { deleteApplication } from "@/services/application/application";
import { Icons } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const RentApplicationStatusCard = ({
  myRent,
  apartmentAddress,
  prorated_rent,
  isDashboard,
  moved_out_date,
  applicationId,
  isActive,
  expected_move_out_date,
  status,
  title,
  duration,
  apartmentId,
  address,
  city,
  state,
  country,
  zip,
  type,
  unit_number,
  lease_term,
  date,
  isBtn,
  note,
  total,
  invoice,
  pet_rent,
  invoice_total,
  createdOn,
}) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCancelApplication = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteApplication({ applicationId: id }));
      }
    });
  };
  const Address = `${address && address}, ${city && city} ${state && state} ${
    zip && zip
  }`;
  const ApartmentAddress = `${apartmentAddress && apartmentAddress}, ${
    city && city
  } ${state && state} ${zip && zip}`;
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
  const handleCopy2 = () => {
    navigator.clipboard
      .writeText(ApartmentAddress)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <div className="bg-gray-100 p-4 space-y-1 w-full dark:bg-dark-light">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Statement Details"}
        width={"w-6/12"}
      >
        <CostBreakdownInfo fees={invoice} total={invoice_total} />
      </Modal>
      {isActive && (
        <div className="bg-blue-700 p-2 rounded-sm w-fit text-center my-2 dark:bg-[#360000] darkText">
          <p className="text-white w-full text-xs font-semibold">
            Your Active Rent
          </p>
        </div>
      )}
      {isDashboard && (
        <div className="bg-blue-700 p-2 rounded-sm w-fit text-center my-2 dark:bg-[#360000] darkText">
          <p className="text-white w-full text-xs font-semibold">
            Recent Application
          </p>
        </div>
      )}
      {createdOn && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Application Submitted</span>:{" "}
          {createdOn}
        </p>
      )}
      <h2 className="md:text-2xl text-base sm:text-lg pb-1 font-semibold">
        {" "}
        {title}{" "}
      </h2>
      <div className="flex justify-start items-start space-x-2">
        <p className="text-gray-700 text-base pt-1.5">
          <Icons.Location className="text-blue-700 dark:text-gray-300" />{" "}
        </p>

        {status === "Resident" && apartmentAddress && myRent ? (
          <p className="text-gray-900 md:text-lg text-xs sm:text-lg flex flex-col items-start justify-center">
            <span className="dark:text-gray-400"> {apartmentAddress},</span>
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
                    <button
                      type="button"
                      onClick={handleCopy2}
                      aria-label="copy"
                    >
                      <Icons.Copy className="text-lg" />
                    </button>
                  </Tooltip>
                )}
              </span>
            </span>
          </p>
        ) : (
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
                    <button
                      aria-label="copy"
                      type="button"
                      onClick={handleCopy}
                    >
                      <Icons.Copy className="text-lg" />
                    </button>
                  </Tooltip>
                )}
              </span>
            </span>
          </p>
        )}
      </div>
      {unit_number && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Unit Number</span>: {unit_number}(
          {type})
        </p>
      )}
      {/* {apartmentAddress && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Unit/Mailing Address</span>:
        </p>
      )}
      {apartmentAddress && (
        <div className="flex justify-start items-start space-x-2">
          <p className="text-gray-700 text-base pt-1.5">
            <Icons.Location className="text-blue-700 dark:text-gray-300" />{" "}
          </p>

          <p className="text-gray-900 md:text-lg text-xs sm:text-lg flex flex-col items-start justify-center">
            <span className="dark:text-gray-400"> {ApartmentAddress},</span>
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
                    <button type="button" onClick={handleCopy2}>
                      <Icons.Copy className="text-lg" />
                    </button>
                  </Tooltip>
                )}
              </span>
            </span>
          </p>
        </div>
      )} */}
      <p className="md:text-base text-sm">
        <span className="font-semibold">Lease Term</span>: {lease_term}
      </p>
      {total && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Unit Rent</span>: ${total} (Monthly)
        </p>
      )}
      {pet_rent && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Pet Rent</span>: ${pet_rent}{" "}
          (Monthly)
        </p>
      )}
      {false && (
        <p className="md:text-base text-sm">
          <span className="font-semibold">Move-In Total</span>: ${invoice_total}{" "}
          <button
            onClick={openModal}
            className="underline py-2 md:py-0 text-sm cursor-pointer"
            type="button"
          >
            Statement Details
          </button>
        </p>
      )}
      <p className="md:text-base text-sm">
        <span className="font-semibold ">Move-In Date</span>: {date}{" "}
      </p>
      {!moved_out_date && expected_move_out_date && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Expected Move Out Date</span>:{" "}
          {expected_move_out_date}{" "}
        </p>
      )}
      {moved_out_date && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Move Out Date</span>:{" "}
          {moved_out_date}{" "}
        </p>
      )}

      <p className="text-blue-700 mt-1 font-semibold md:text-base text-sm md:pb-0 pb-2 dark:text-gray-200">
        Status: {status}
      </p>
      {note && (
        <p className="md:text-base text-sm">
          <span className="font-semibold ">Note</span>: {note}{" "}
        </p>
      )}
      {status === "Resident" && (
        <ul>
          <li className="md:text-base text-sm">
            Address Proof -{" "}
            <Link
              to={"/print-address"}
              target="_blank"
              type="button"
              className="text-blue-500 underline underline-offset-2 darkText"
            >
              Download
            </Link>
          </li>
          {/* <li className="md:text-base text-sm">
            Lease Agreement -{" "}
            <Link
              to={"/print-lease"}
              target="_blank"
              type="button"
              className="text-blue-500 underline underline-offset-2 darkText"
            >
              Download
            </Link>
          </li> */}
        </ul>
      )}
      {isBtn && (
        <Button
          onClick={() => handleCancelApplication(applicationId)}
          className={"bg-red-700 mt-4 hover:bg-red-800"}
        >
          Cancel
        </Button>
      )}
      {isDashboard && (
        <div>
          <Link
            to={"/renteradmin/application"}
            className={"font-semibold underline"}
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};
