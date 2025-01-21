import { Button, Select } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { getPaidParkingForPO } from "@/services/paidParking/paidParking";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
const initialValues = {
  propertyId: "",
};
export const AllParking = ({ data, loading }) => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const res = useGetUserSelector();
  const onSubmit = (values) => {
    dispatch(getPaidParkingForPO({ propertyId: Number(values.propertyId) }));
  };
  useEffect(() => {
    if (res.data.properties) {
      setPropertyOptions(
        res.data.properties.map((item) => {
          return { label: item.name, value: item.propertyId };
        })
      );
    }
  }, [res]);
  return (
    <div className=" space-y-5">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue }) => {
          return (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-end md:space-x-6 space-y-5 md:space-y-0">
                <Select
                  name={"propertyId"}
                  required={true}
                  label={"Filter by Property"}
                  options={[
                    {
                      label: "Select Property",
                      value: "",
                    },
                    ...propertyOptions,
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Button type={"submit"}>Search</Button>
              </div>
              <div className="w-full md:text-end"></div>
            </Form>
          );
        }}
      </Formik>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : data.length > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data.map((item) => {
            return (
              <div
                key={item.parkingId}
                className={`${
                  item.status === "Vacant"
                    ? "bg-green-100 dark:bg-dark-primary darkText"
                    : "bg-red-100 dark:text-gray-800"
                }  py-5 rounded-lg shadow-md  relative flex flex-col items-center px-1 justify-center`}
              >
                <div className="flex justify-center items-center space-x-1">
                  <Icons.Parking />
                  <p>{item.slot}</p> <span>-</span> <p>${item.price}</p>
                </div>
                {item.status !== "Vacant" && (
                  <div className="flex justify-center items-center space-x-1">
                    <p>#{item.apartment_unit_number}</p>
                    <span>-</span>
                    <p>{item.user_name}</p>
                  </div>
                )}
                {item.status !== "Vacant" && (
                  <div className="absolute right-0 -top-2 bg-red-600 rounded-full py-1 px-2 text-xs text-white">
                    {" "}
                    Booked{" "}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[40vh]">
          Np Parking for this Property...
        </div>
      )}
    </div>
  );
};
