import { AdminHeader, Button } from "@/components";
import { useScrollToTop } from "@/hooks";
import { useState } from "react";
import { BillCard } from "../../components";
import { NewUtilityForm, PaymentHistory } from "./components";

const UtilityBills = () => {
  useScrollToTop();
  const [ShowUtilityForm, setShowUtilityForm] = useState(false);
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"UtilityBills"} />
      <div className="w-full p-4">
        <div className="md:flex justify-start items-center md:space-x-5 space-y-8 md:space-y-0">
          <BillCard title={"Electricity Bill"} isCloseBtn={true} />
          <BillCard title={"Internet Bill"} isCloseBtn={true} />
        </div>
        <hr className="my-10 border" />
        <div className="space-y-4">
          <Button onClick={() => setShowUtilityForm(true)}>
            Add New Utility
          </Button>
          {ShowUtilityForm && (
            <NewUtilityForm setShowUtilityForm={setShowUtilityForm} />
          )}
        </div>
        <div className="my-10">
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default UtilityBills;
