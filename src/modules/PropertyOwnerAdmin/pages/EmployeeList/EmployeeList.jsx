import { AdminHeader, Button } from "@/components";
import {
  useAppDispatch,
  useGetAllEmployeeSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllEmployee } from "@/services/employee/employee";
import { useEffect, useState } from "react";
import { AddEmployeeForm, AllEmployee } from "./Components";

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  useScrollToTop();
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const { loading, data } = useGetAllEmployeeSelector();

  useEffect(() => {
    dispatch(getAllEmployee());
  }, []);

  return (
    <div className="w-full">
      <AdminHeader title={"Employee List"} />

      <div className="w-full md:p-4 p-2 space-y-5">
        <Button
          className={"mt-2 md:mt-0"}
          onClick={() => setShowAddEmployeeForm((prev) => !prev)}
        >
          {showAddEmployeeForm ? "Hide Add Employee Form" : "Add Employee"}
        </Button>
        {showAddEmployeeForm && <AddEmployeeForm />}
        <h2 className="md:text-lg text-base font-semibold">All Employees</h2>
        <hr className="" />
        <div className="space-y-3">
          <AllEmployee loading={loading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
