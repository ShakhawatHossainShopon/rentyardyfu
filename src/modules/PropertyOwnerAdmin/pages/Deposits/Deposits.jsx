import { AdminHeader, Input, Modal, Pagination, Select } from "@/components";
import {
  useAppDispatch,
  useGetAllDepositSelector,
  useGetPropertyListNameIdSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllDeposit } from "@/services/deposit/deposit";
import { getPropertyListNameId } from "@/services/property/property";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { UpdateDeposits } from "./components";

const initialValues = {
  user: "",
  propertyId: "",
};

const Deposits = () => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [depositId, setDepositId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deposit, setDeposit] = useState([]);
  const [refunded, setRefunded] = useState([]);

  const openModal = (id) => {
    setDepositId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useScrollToTop();
  const dispatch = useAppDispatch();

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllDeposit({
          user: values.user,
          propertyId: values.propertyId,
        })
      );
    }, 2000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };

  const { loading, data } = useGetAllDepositSelector();
  const allProperty = useGetPropertyListNameIdSelector();

  useEffect(() => {
    dispatch(getPropertyListNameId({ subscription: false }));
    dispatch(getAllDeposit({ propertyId: "", user: "" }));
  }, []);

  useEffect(() => {
    setDeposit(
      data?.deposits?.filter((item) => {
        return item.status === "Pending";
      })
    );
    setRefunded(
      data?.deposits?.filter((item) => {
        return item.status === "Refunded";
      })
    );
  }, [loading, data]);

  useEffect(() => {
    if (allProperty && allProperty.data && allProperty.data.length > 0) {
      const temp = allProperty.data.map((item) => {
        return { label: item.name, value: item.propertyId };
      });
      setPropertyOptions(temp);
    }
  }, [allProperty]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = deposit?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const [currentPage2, setCurrentPage2] = useState(1);
  const ITEMS_PER_PAGE2 = 5;

  const handlePageChange2 = (page) => setCurrentPage2(page);

  const paginatedData2 = refunded?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="w-full">
        <AdminHeader title={"Deposits"} />
        <div className="md:p-4 p-2 w-full space-y-5">
          <div className="space-y-3 w-full">
            <div>
              <h2 className="text-lg font-medium">Deposit List </h2>
              <hr />
            </div>
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
                      placeholder={"Search By Name or Email"}
                      name={"user"}
                      className={"py-2 px-2"}
                      onChange={(e) => {
                        handleChange(e); // Update Formik's state
                        submitForm(); // Submit the form on change
                      }}
                    />
                  </Form>
                );
              }}
            </Formik>
            {data?.total > 0 && (
              <div className="py-4 flex justify-between">
                <div>Total: ${data.total}</div>
              </div>
            )}
            {loading ? (
              <div className="w-full flex justify-center items-center h-[90vh]">
                <ClipLoader size={100} color="blue" />
              </div>
            ) : (
              <div>
                {paginatedData?.length > 0 ? (
                  <table className="w-full px-6 bg-gray-50 border">
                    <thead className="bg-blue-700 dark:bg-darkMode w-full">
                      <tr>
                        <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-full">
                          Name
                        </th>
                        <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                          Email
                        </th>
                        <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                          Amount
                        </th>
                        <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                          Payment Type
                        </th>

                        <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                          Action
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
                            {depositId === item.depositId && (
                              <Modal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                title={"Update Deposit"}
                              >
                                <UpdateDeposits
                                  closeModal={closeModal}
                                  depositId={depositId}
                                />
                              </Modal>
                            )}
                            <td className="py-4 text-center w-full px-2">
                              {item?.userId?.name}
                            </td>
                            <td className="py-4 text-center w-full px-2">
                              {item?.userId?.email}
                            </td>
                            <td className="py-4 text-center w-fit px-2">
                              ${item.amount}
                            </td>
                            <td className="py-4 text-center w-full whitespace-nowrap px-2">
                              {item.type}
                            </td>
                            <td className="py-4 text-center w-fit whitespace-nowrap px-2">
                              <button
                                onClick={() => openModal(item.depositId)}
                                className="underline text-blue-500"
                              >
                                {" "}
                                Update{" "}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center items-center w-full h-[20vh]">
                    {" "}
                    No Deposit Available...
                  </div>
                )}
              </div>
            )}
            {deposit?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={deposit?.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-medium">Deposit History </h2>
              <hr />
            </div>
            <div>
              {paginatedData2?.length > 0 ? (
                <table className="w-full px-6 bg-gray-50 border">
                  <thead className="bg-blue-700 dark:bg-darkMode w-full">
                    <tr>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-full">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Email
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Amount
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Payment Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:text-gray-400">
                    {paginatedData2?.map((item, index) => {
                      return (
                        <tr
                          className={`divide-x ${
                            index % 2 === 0
                              ? ""
                              : "bg-gray-100 dark:bg-dark-light"
                          }`}
                          key={index}
                        >
                          {depositId === item.depositId && (
                            <Modal
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              title={"Update Deposit"}
                            >
                              <UpdateDeposits
                                closeModal={closeModal}
                                depositId={depositId}
                              />
                            </Modal>
                          )}
                          <td className="py-4 text-center w-full px-2">
                            {item?.userId?.name}
                          </td>
                          <td className="py-4 text-center w-full px-2">
                            {item?.userId?.email}
                          </td>
                          <td className="py-4 text-center w-fit px-2">Paid</td>
                          <td className="py-4 text-center w-full whitespace-nowrap px-2">
                            {item.type}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center w-full h-[20vh]">
                  No History...
                </div>
              )}
              {refunded?.length > 0 && (
                <Pagination
                  currentPage={currentPage2}
                  totalItems={refunded?.length}
                  itemsPerPage={ITEMS_PER_PAGE2}
                  onPageChange={handlePageChange2}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposits;
