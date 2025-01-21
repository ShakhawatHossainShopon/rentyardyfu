import { Button, Modal, Select } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { deletePaidParkingForRenter } from "@/services/paidParking/paidParking";
import {
  deleteVehicle,
  updateParkingForVehicle,
} from "@/services/vehicle/vehicle";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const initialValues = {
  parkingId: "",
  paymentMethodId: "",
};

const validationSchema = Yup.object({
  parkingId: Yup.string().required("Required!"),
  paymentMethodId: Yup.string().when("parkingId", {
    is: (value) => value && value !== "",
    then: (schema) => schema.required("required!"), // Ensure `then` is a function
    otherwise: (schema) => schema, // Use schema directly for optional
  }),
});

export const VehicleManagerCard = ({
  owner,
  isCloseBtn,
  item,
  permit_hour,
  status,
  paymentMethodsState,
  parkingOptions,
  setParkingOptions,
  data,
}) => {
  const user = useGetUserSelector();
  const dispatch = useAppDispatch();
  const [proRatedRent, setProRatedRent] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0); // Initialize with 0
  const [hasExpired, setHasExpired] = useState(false); // State to track expiration
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expirationTime = item.expiryTimestamp; // Replace with your expiration time

  const onSubmit = (values, { resetForm }) => {
    dispatch(updateParkingForVehicle({ ...values, vehicleId: item.vehicleId }));
    resetForm();
    closeModal();
  };

  useEffect(() => {
    const expirationDate = new Date(expirationTime).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = expirationDate - currentTime;

      if (timeDifference <= 0) {
        setHasExpired(true);
      }

      setTimeRemaining(Math.floor(Math.abs(timeDifference) / 1000)); // Set time in seconds
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [expirationTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const headerClass = owner === "guest" ? "bg-red-700" : "bg-black";

  return (
    <div className="bg-[#F7F7F7] w-full dark:bg-transparent border-2 dark:border-dark-light">
      <Modal
        title={"Buy Reserved Parking"}
        onClose={closeModal}
        isOpen={isModalOpen}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values, setValues, errors, touched }) => {
            useEffect(() => {
              if (user?.data?.apartment?.status === "Resident") {
                setValues({
                  year: "",
                  company: "",
                  model: "",
                  plate: "",
                  vin: "",
                  color: "",
                  owner: "",
                  issuing_state: "",
                  parkingId: "",
                  paymentMethodId: paymentMethodsState[0]?.value,
                });
              }
            }, []);
            return (
              <Form className="space-y-5 py-2">
                <div className="w-full md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0">
                  <Select
                    required={true}
                    name={"parkingId"}
                    disabled={parkingOptions.length === 0}
                    label={
                      parkingOptions.length === 0
                        ? "No Reserved Parking Available"
                        : "Available Reserved Parking(Optional)"
                    }
                    options={[
                      {
                        label: "Select Parking Spot",
                        value: "",
                      },
                      ...parkingOptions,
                    ]}
                    onChange={(e) => {
                      setFieldValue("parkingId", e.target.value);
                      const temp = data?.find((elem) => {
                        if (elem.parkingId == e.target.value) {
                          return elem;
                        }
                      });
                      setProRatedRent(temp.price_final_amount);
                    }}
                    className={"w-full px-2 py-2.5"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  {values.parkingId &&
                    (paymentMethodsState.length > 0 ? (
                      <div>
                        {proRatedRent && (
                          <label
                            className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*'] darkText`}
                          >
                            You Will Be Charged{" "}
                            <span className="text-red-600 dark:text-gray-100">
                              ${proRatedRent} (With Card Fee)
                            </span>
                          </label>
                        )}
                        <Select
                          required={true}
                          name={"paymentMethodId"}
                          options={[
                            {
                              label: "Select Card",
                              value: "",
                            },
                            ...paymentMethodsState,
                          ]}
                          className={"py-2 md:py-2.5 px-2"}
                          parentClassName={"w-full px-0 py-0"}
                        />
                      </div>
                    ) : (
                      <Link
                        to={"/renteradmin/payment"}
                        className="underline text-blue-600"
                      >
                        {" "}
                        Add Payment Method{" "}
                      </Link>
                    ))}
                </div>
                <Button type={"submit"}>Submit</Button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      <h2
        className={`w-full text-white py-2 px-6 text-lg relative dark:bg-dark-light darkText ${headerClass}`}
      >
        <div>
          {item.company} - {item.model}
        </div>
        {isCloseBtn && (
          <button
            aria-label="delete"
            onClick={() => {
              Swal.fire({
                title: "Are You Sure?",
                showDenyButton: true,
                confirmButtonText: "Ok",
                denyButtonText: `Cancel`,
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteVehicle(item.vehicleId));
                }
              });
            }}
            className="bg-white px-1 absolute right-1 top-2 text-black w-7 h-7 rounded-full flex justify-center items-center text-lg dark:bg-transparent"
          >
            <span className="text-red-500">
              <Icons.Delete />
            </span>
          </button>
        )}
      </h2>
      <div className="flex justify-between items-start w-full md:p-6 p-3">
        <div>
          {item && item.parking && (
            <div className="flex justify-start items-center space-x-2">
              <p className="text-xs md:text-base">
                Reserved Parking: {item.parking.slot} - ${item.parking.price}{" "}
                (Monthly)
              </p>
              <span
                onClick={() => {
                  Swal.fire({
                    title: "Are You Sure?",
                    showDenyButton: true,
                    confirmButtonText: "Ok",
                    denyButtonText: `Cancel`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deletePaidParkingForRenter(item.vehicleId));
                    }
                  });
                }}
                className="text-red-500 cursor-pointer text-xs border border-red-500 p-1"
              >
                Cancel
              </span>
            </div>
          )}
          {item &&
            !item.parking &&
            owner === "Resident" &&
            (status === "Resident" ||
              status === "Resident (Renewed)" ||
              status === "Resident (Move-Out Accepted)") && (
              <button onClick={openModal} className="underline text-blue-600">
                Buy Reserved Parking
              </button>
            )}
          <p className="text-xs md:text-base">Plate: {item.plate}</p>
          <p className="text-xs md:text-base">Vin: {item.vin}</p>
          <p>
            Vehicle Owner:
            {owner === "Guest" ? (
              <span className="font-semibold pt-2 text-red-700"> Guest</span>
            ) : (
              <span className="font-semibold pt-2"> Resident</span>
            )}
          </p>
        </div>
        {owner === "Guest" && (
          <div className="flex flex-col justify-center items-center">
            <div
              className={`bg-blue-600 text-white px-2 py-1 text-center ${
                hasExpired ? "bg-red-600" : ""
              } `}
            >
              <p className="md:text-base text-xs">
                Permit: {permit_hour} Hours
              </p>
              <hr className="my-3" />
              <p className="md:text-base text-sm">
                {hasExpired
                  ? formatTime(timeRemaining)
                  : formatTime(timeRemaining)}
              </p>
              <p className="md:text-base text-xs">
                {" "}
                {hasExpired ? "Time Exceed" : "Remaining Time"}{" "}
              </p>
            </div>
          </div>
        )}
      </div>
      {owner === "Guest" && hasExpired && (
        <p className="px-5 mb-2 text-red-600 text-sm">
          Vehicles can be towed without notice for exceeding the parking time.
        </p>
      )}
    </div>
  );
};
