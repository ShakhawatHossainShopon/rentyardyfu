import { useGetAllApartmentSelector } from "@/hooks";
import { memo } from "react";
import { ApartmentList, ApartmentListFilter } from "./Components";

export const AllApartment = memo(({ propertyOptions }) => {
  const { loading, data, properties } = useGetAllApartmentSelector();

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Apartment List</h2>
        <hr className="mb-4 border-gray-300" />
      </div>
      {data && data.length > 0 && (
        <ApartmentListFilter
          loading={loading}
          data={data}
          properties={properties}
        />
      )}
      <ApartmentList
        loading={loading}
        data={data}
        propertyOptions={propertyOptions}
      />
    </div>
  );
});
