import { AdminHeader, Button } from "@/components";
import { useScrollToTop } from "@/hooks";
import { useState } from "react";
import { AddSingleHouseProperty } from "./components";
import { AllSingleProperty } from "./components/AllSingleProperty";

const SingleHouseProperty = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full">
      <AdminHeader title={"Single House Property"} />
      <div className="md:p-4 p-2 space-y-3">
        <div className="bg-red-500 py-2 w-full text-center text-white text-sm">
          This Page is Under Construction!!
        </div>
        <h2 className="md:text-lg text-base font-semibold">
          Add Single House Property
        </h2>
        <hr />
        <Button className={"my-4"} onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close Form" : "Add Property"}
        </Button>
        {showForm ? <AddSingleHouseProperty setShowForm={setShowForm} /> : null}
        <AllSingleProperty />
      </div>
    </div>
  );
};

export default SingleHouseProperty;
