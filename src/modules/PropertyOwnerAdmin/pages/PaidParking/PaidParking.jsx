import { AdminHeader, Button } from "@/components";
import { useAppDispatch, useScrollToTop } from "@/hooks";
import { useGetPaidParkingForPOSelector } from "@/hooks/useGetPaidParkingForPOSelector/useGetPaidParkingForPOSelector";
import { getPaidParkingForPO } from "@/services/paidParking/paidParking";
import { useEffect, useState } from "react";
import { AddParking, AllParking } from "./components";

const PaidParking = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPaidParkingForPO({ propertyId: "" }));
  }, []);

  const { loading, data } = useGetPaidParkingForPOSelector();

  return (
    <div className="w-full">
      <AdminHeader title={"Reserved Parking"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close Form" : "Add New Reserved Parking"}
        </Button>
        {showForm && <AddParking />}
        <div>
          <h2 className="md:text-lg text-base font-semibold">
            All Reserved Parkings
          </h2>
          <hr />
        </div>
        <AllParking loading={loading} data={data} />
      </div>
    </div>
  );
};

export default PaidParking;
