import { useAppDispatch, useGetAllSinglePropertySelector } from "@/hooks";
import { getAllSingleProperty } from "@/services/singleProperty/singleProperty";
import { useEffect } from "react";
import { SinglePropertyFilter } from "./Components/SinglePropertyFilter/SinglePropertyFilter";
import { SinglePropertyList } from "./Components/SinglePropertyList/SinglePropertyList";

export const AllSingleProperty = () => {
  const dispatch = useAppDispatch();
  const { loading, cities, countries, updatedProperties } =
    useGetAllSinglePropertySelector();

  useEffect(() => {
    dispatch(
      getAllSingleProperty({
        sort: "desc",
      })
    );
  }, []);
  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Single House Property List</h2>
        <hr className="mb-4 border-gray-300" />
      </div>

      {updatedProperties && updatedProperties.length > 0 && (
        <SinglePropertyFilter
          loading={loading}
          cities={cities}
          countries={countries}
        />
      )}
      <div className="space-y-3 mt-5">
        <SinglePropertyList loading={loading} data={updatedProperties} />
      </div>
    </div>
  );
};
