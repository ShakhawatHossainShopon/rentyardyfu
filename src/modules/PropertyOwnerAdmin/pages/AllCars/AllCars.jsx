import { AdminHeader, Input, Pagination, Select } from "@/components";
import {
  useAppDispatch,
  useGetAllVehicleForPoSelector,
  useGetPropertyListNameIdSelector,
  useScrollToTop,
} from "@/hooks";
import { getPropertyListNameId } from "@/services/property/property";
import { getAllVehicleForPo } from "@/services/vehicle/vehicle";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const initialValues = {
  propertyId: "",
};

const AllCars = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const [propertyOptions, setPropertyOptions] = useState([]);
  const { loading, data } = useGetAllVehicleForPoSelector();
  const allProperty = useGetPropertyListNameIdSelector();

  useEffect(() => {
    if (allProperty && allProperty.data && allProperty.data.length > 0) {
      const temp = allProperty.data.map((item) => {
        return { label: item.name, value: item.propertyId };
      });
      setPropertyOptions(temp);
    }
  }, [allProperty]);

  useEffect(() => {
    dispatch(getPropertyListNameId({ subscription: false }));
    dispatch(getAllVehicleForPo({ propertyId: "", query: "" }));
  }, []);

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllVehicleForPo({
          propertyId: values.propertyId,
          query: values.query,
        })
      );
    }, 1000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.vehicles?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader title={"All Vehicle"} />
      <div className="md:p-4 p-2">
        <div className="space-y-5 w-full">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
              setFieldValue,
              errors,
              touched,
              values,
              setValues,
              handleChange,
              submitForm,
            }) => {
              return (
                <Form className="md:grid md:grid-cols-4 w-full gap-6 space-y-6 md:space-y-0">
                  <Select
                    name={"propertyId"}
                    label={"Select Property"}
                    options={[
                      {
                        label: "Select Property",
                        value: "",
                      },
                      ...propertyOptions,
                    ]}
                    className={"w-full px-2"}
                    parentClassName={"w-full px-0 py-0"}
                    onChange={(e) => {
                      handleChange(e); // Update Formik's state
                      submitForm(); // Submit the form on change
                    }}
                  />
                  <Input
                    label={"Search"}
                    placeholder={"Search by Unit Number"}
                    name={"query"}
                    onChange={(e) => {
                      handleChange(e); // Update Formik's state
                      submitForm(); // Submit the form on change
                    }}
                    className={"py-2 px-2"}
                    parentClassName={"col-span-2"}
                  />
                </Form>
              );
            }}
          </Formik>
          {data?.total > 0 && (
            <div className="py-2">
              <div className="font-bold">Total: {data?.total}</div>
            </div>
          )}
          {loading ? (
            <div className="w-full flex justify-center items-center h-[30vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : (
            <div>
              {paginatedData?.length > 0 ? (
                <table className="w-full px-6 bg-gray-50 border">
                  <thead className="bg-blue-700 dark:bg-darkMode w-full">
                    <tr>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        ID
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Year
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Model
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        VIN
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Color
                      </th>

                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Number Plate
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Unit #
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:text-gray-400">
                    {paginatedData?.map((item, index) => {
                      return (
                        <tr
                          className={`divide-x ${
                            index % 2 === 0
                              ? ""
                              : "bg-gray-100 dark:bg-dark-light"
                          }`}
                          key={index}
                        >
                          <td className="py-4 text-center w-fit">
                            {item.vehicleId}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.year}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.model}
                          </td>
                          <td className="py-4 text-center w-fit">{item.vin}</td>
                          <td className="py-4 text-center w-fit whitespace-nowrap">
                            {item.color}
                          </td>
                          <td className="py-4 text-center w-fit whitespace-nowrap px-2">
                            {item.plate}
                          </td>
                          <td className="py-4 text-center w-fit whitespace-nowrap px-2">
                            {item.apartment?.unit_number}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center w-full h-[20vh]">
                  {" "}
                  No Vehicle Available...
                </div>
              )}
            </div>
          )}
          {data?.vehicles?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={data?.vehicles?.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCars;
