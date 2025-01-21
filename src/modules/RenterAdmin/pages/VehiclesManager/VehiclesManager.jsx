import { AdminHeader, Button } from "@/components";
import {
  useAppDispatch,
  useGetAllPaymentMethodsSelector,
  useGetAllVehicleSelector,
  useGetPaidParkingForRenterSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getPaidParkingForRenter } from "@/services/paidParking/paidParking";
import { getAllPaymentMethods } from "@/services/paymentMethods/paymentMethods";
import { getAllVehicle } from "@/services/vehicle/vehicle";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { VehicleManagerCard } from "../../components";
import { NewVehicleForm } from "./components";

const VehiclesManager = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const [parkingOptions, setParkingOptions] = useState([]);
  const [paymentMethodsState, setPaymentMethodsState] = useState([]);
  const paymentMethods = useGetAllPaymentMethodsSelector();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllVehicleSelector();
  const residentVehicles = data?.vehicles?.filter(
    (item) => item.owner === "Resident"
  );

  const parkings = useGetPaidParkingForRenterSelector();
  useEffect(() => {
    if (parkings?.data) {
      setParkingOptions(
        parkings?.data?.map((item) => {
          return {
            label: `${item.slot} - $${item.price} (Monthly)`,
            value: item.parkingId,
          };
        })
      );
    }
  }, [parkings?.data]);

  useEffect(() => {
    if (
      paymentMethods &&
      paymentMethods.data &&
      paymentMethods.data.length > 0
    ) {
      const temp = paymentMethods.data
        .filter((item) => {
          if (item.type === "Card") {
            return item;
          }
        })
        .map((elem) => {
          return {
            label: `End With ${elem.number}`,
            value: elem.paymentMethodId,
          };
        });
      setPaymentMethodsState(temp);
    }
  }, [paymentMethods]);

  useEffect(() => {
    dispatch(getAllPaymentMethods());
  }, []);
  const userRes = useGetUserSelector();
  useEffect(() => {
    dispatch(getAllVehicle());
    dispatch(getPaidParkingForRenter());
  }, []);
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Vehicles & Parking"} />
      <div className="w-full p-4 space-y-10">
        {userRes?.data?.apartment?.max_vehicle && (
          <div>
            {residentVehicles?.length >=
            userRes?.data?.apartment?.max_vehicle ? (
              <p className="text-red-600">
                You are allowed to park up to{" "}
                {userRes?.data?.apartment?.max_vehicle} vehicles for this unit.
                If you exceed this limit, your vehicle will be towed without
                notice.
              </p>
            ) : (
              <p className="text-red-600">
                Free Parking Permit: {userRes?.data?.apartment?.max_vehicle}{" "}
                Vehicles
              </p>
            )}
          </div>
        )}
        {!loading && data ? (
          data?.vehicles?.length > 0 ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {data?.vehicles?.map((item) => {
                return (
                  <VehicleManagerCard
                    key={item.vehicleId}
                    paymentMethodsState={paymentMethodsState}
                    permit_hour={data?.permit_hour}
                    isCloseBtn={true}
                    owner={item.owner}
                    item={item}
                    status={userRes?.data?.apartment?.status}
                    data={parkings?.data}
                    parkingOptions={parkingOptions}
                    setParkingOptions={setParkingOptions}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[20vh] flex justify-center items-center">
              {" "}
              No Vehicles added yet...{" "}
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        )}
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close Form" : "Add New Vehicle"}
        </Button>
        {showForm && (
          <NewVehicleForm
            paymentMethodsState={paymentMethodsState}
            data={parkings?.data}
            parkingOptions={parkingOptions}
            setParkingOptions={setParkingOptions}
          />
        )}
      </div>
    </div>
  );
};

export default VehiclesManager;
