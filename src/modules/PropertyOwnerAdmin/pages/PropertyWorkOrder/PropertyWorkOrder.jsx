import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetAllWorkOrderByPOSelector,
  useScrollToTop,
} from "@/hooks";
import { getStaff } from "@/services/staff/staff";
import { getAllWorkOrderByPO } from "@/services/workOrder/workOrder";
import { useEffect } from "react";
import { WorkOrderComp, WorkOrderHistory } from "./Components";

const PropertyWorkOrder = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();

  const { loading, data } = useGetAllWorkOrderByPOSelector();

  const showData =
    data &&
    data.filter(
      (item) =>
        item.status === "Work in Progress" ||
        item.status === "Order Received" ||
        item.status === "Pending"
    );

  const historyData =
    data &&
    data.filter(
      (item) => item.status === "Resolved" || item.status === "Canceled"
    );

  useEffect(() => {
    dispatch(getAllWorkOrderByPO());
    dispatch(getStaff({ staffId: "", role: "MP" }));
  }, []);

  return (
    <div className="w-full">
      <AdminHeader title={"Maintenance Request"} />
      <div className="w-full md:p-4 p-2">
        <h2 className="md:text-xl text-base font-semibold md:pt-0 pt-3">
          New Maintenance Requests
        </h2>
        <hr className="mt-5 mb-8 border-gray-500" />
        <div className="space-y-2">
          <WorkOrderComp loading={loading} data={showData && showData} />
        </div>
      </div>

      <div className="w-full md:p-4 p-2">
        <div className="md:flex justify-start items-center md:space-x-5 md:pt-8 pt-3">
          <h3 className="font-semibold text-base md:text-lg min-w-max">
            Order History
          </h3>
        </div>
        <hr className="mt-5 mb-8 border-gray-500" />
        <WorkOrderHistory data={historyData && historyData} />
      </div>
    </div>
  );
};

export default PropertyWorkOrder;
