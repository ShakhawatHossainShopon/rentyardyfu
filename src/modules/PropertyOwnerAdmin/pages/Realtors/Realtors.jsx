import { AdminHeader, Button } from "@/components";
import { useAppDispatch, useGetStaffSelector, useScrollToTop } from "@/hooks";
import { getStaff } from "@/services/staff/staff";
import { useEffect, useState } from "react";
import { AddRealtor, AllRealtor } from "./Components";

const Realtors = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();

  const { loading, data } = useGetStaffSelector();

  useEffect(() => {
    dispatch(getStaff({ staffId: "", role: "RT" }));
  }, []);

  return (
    <div>
      <AdminHeader title={"Realtors"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <div className="bg-red-500 py-2 w-full text-center text-white text-sm">
          This Page is Under Construction!!
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add New Realtor"}
        </Button>
        {showForm && <AddRealtor setShowForm={setShowForm} />}
        <div>
          <h2 className="md:text-lg text-base font-semibold">All Realtor</h2>
          <hr className="" />
        </div>
        <div className="space-y-3">
          <AllRealtor loading={loading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Realtors;
