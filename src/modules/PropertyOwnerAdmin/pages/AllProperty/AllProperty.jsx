import { AdminHeader, Button } from "@/components";
import {
  useAppDispatch,
  useGetAllPropertySelector,
  useScrollToTop,
} from "@/hooks";
import { getAllProperty } from "@/services/property/property";
import { useEffect, useState } from "react";
import { AddProperty, AllPropertiesComp, PropertyFilter } from "./Components";
const AllProperty = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, cities, countries, updatedProperties } =
    useGetAllPropertySelector();

  useEffect(() => {
    dispatch(
      getAllProperty({
        sort: "desc",
      })
    );
  }, []);

  return (
    <div className="w-full">
      <AdminHeader title={"All Property"} />
      <div className="md:p-4 p-2">
        <h2 className="md:text-lg text-base font-semibold">Add Property</h2>
        <hr />
        <Button className={"my-4"} onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Close Form" : "Add Property"}
        </Button>
        {showForm ? <AddProperty setShowForm={setShowForm} /> : null}

        <h2 className="md:text-lg text-base font-semibold md:mt-2 mt-8">
          All Properties
        </h2>
        <hr className="mb-4" />
        {updatedProperties && updatedProperties.length > 0 && (
          <PropertyFilter
            loading={loading}
            cities={cities}
            countries={countries}
          />
        )}
        <div className="space-y-3 mt-5">
          <AllPropertiesComp loading={loading} data={updatedProperties} />
        </div>
      </div>
    </div>
  );
};

export default AllProperty;
