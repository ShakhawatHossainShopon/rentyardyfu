import { AdminHeader, Input, Modal, Pagination, Select } from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetAllPetForPoSelector,
  useGetPropertyListNameIdSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllPetForPo } from "@/services/pet/pet";
import { getPropertyListNameId } from "@/services/property/property";
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
  const [petId, setPetId] = useState();
  const [petId2, setPetId2] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const { loading, data } = useGetAllPetForPoSelector();
  const allProperty = useGetPropertyListNameIdSelector();

  const openModal = (id) => {
    setPetId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = (id) => {
    setPetId2(id);
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

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
    dispatch(getAllPetForPo({ propertyId: "", query: "" }));
  }, []);

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllPetForPo({
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

  const paginatedData = data?.pets?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader title={"All Pet"} />
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
                        Permit #
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Name/Type
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Weight
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Photo/Vaccine
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
                          {petId === item.petId && (
                            <Modal
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              title={"Pet Photo"}
                            >
                              <div className="py-2 max-w-[50vw]">
                                <img
                                  src={`${config.url.ASSET_URL}${item?.photo?.link}`}
                                  alt=""
                                />
                              </div>
                            </Modal>
                          )}
                          {petId2 === item.petId && (
                            <Modal
                              isOpen={isModalOpen2}
                              onClose={closeModal2}
                              title={"Vaccine Proof"}
                            >
                              <div className="py-2 max-w-[50vw]">
                                <img
                                  src={`${config.url.ASSET_URL}${item?.vaccine_proof?.link}`}
                                  alt=""
                                />
                              </div>
                            </Modal>
                          )}
                          <td className="py-4 text-center w-fit">
                            {item.petId}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.permit_number}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.name ? item.name : item.type}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.weight}
                          </td>

                          <td className="py-4 text-center w-fit text-blue-500">
                            {" "}
                            <button
                              onClick={() => openModal(item.petId)}
                              className="underline"
                            >
                              Photo
                            </button>
                            /
                            <button
                              onClick={() => openModal2(item.petId)}
                              className="underline"
                            >
                              Vaccine
                            </button>
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
                  No Pet Available...
                </div>
              )}
            </div>
          )}
          {data?.pets?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={data?.pets?.length}
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
