import { AdminHeader, Button } from "@/components";
import { useAppDispatch, useGetStaffSelector, useScrollToTop } from "@/hooks";
import { getStaff } from "@/services/staff/staff";
import { useEffect, useState } from "react";
import { AddMaintenanceProvider, AllMaintenanceProvider } from "./Components";

const MaintenanceProvider = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();

  const { loading, data } = useGetStaffSelector();

  useEffect(() => {
    dispatch(getStaff({ staffId: "", role: "MP" }));
  }, []);

  return (
    <div>
      <AdminHeader title={"Maintenance Providers"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <div className="bg-red-500 py-2 w-full text-center text-white text-sm">
          This Page is Under Construction!!
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add New Maintenance Provider"}
        </Button>
        {showForm && <AddMaintenanceProvider setShowForm={setShowForm} />}
        <div>
          <h2 className="md:text-lg text-base font-semibold">
            All Maintenance Provider
          </h2>
          <hr className="" />
        </div>
        <div className="space-y-3">
          <AllMaintenanceProvider loading={loading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceProvider;
