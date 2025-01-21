import {
  AdminHeader,
  Button,
  Datepicker,
  Input,
  Modal,
  Pagination,
  Select,
} from "@/components";
import {
  useAddWithdrawSelector,
  useAppDispatch,
  useGetAllTransactionSelector,
  useGetAllWithdrawnListSelector,
  useGetPropertyListNameIdSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import {
  getAllTransaction,
  getAllWithdrawnRequestList,
  withdrawAmount,
} from "@/services/paymentMethods/paymentMethods";
import { getPropertyListNameId } from "@/services/property/property";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { WithdrawOtp } from "./Components";

const initialValues = {
  amount: "",
};
const initialValues2 = {
  unit_number: "",
  propertyId: "",
  date_to: "",
  date_from: "",
};

const validationSchema = Yup.object({
  amount: Yup.string().required("Required!"),
});

const Transaction = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const { loading, data } = useGetAllWithdrawnListSelector();
  const allProperty = useGetPropertyListNameIdSelector();
  const transactionRes = useGetAllTransactionSelector();
  const withdraw = useAddWithdrawSelector();
  const res = useGetUserSelector();
  const tableRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Transactions</title>
          <style>
          body {
  font-family: "Inter", "sans-serif";
        }
        h1 {
            text-align: center;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #DEE2E6;
            padding: 12px;
            text-align: center;
        }
        th {
            background-color: #2563EB;
            color: white;
            font-weight: bold;
        }
        button {
            padding: .7rem 2rem;
            background: #2563EB;
            border: none;
            cursor: pointer;
            color: white;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #1E5DBF;
        }
        .button {
            display: flex;
            justify-content: center;
            margin: 1.5rem 0;
        }
            @media print {
          button {
          display: none; /* Hides all buttons */
            }
        }
          </style>
        </head>
        <body>
          <h1>Paid Transaction List</h1>
          <div class="button"><button onClick={print()}>Print Now</button></div>
          ${tableRef.current.innerHTML}
        </body>
      </html>
    `);
    // printWindow.document.close();
    function print() {
      Window.print();
    }
  };

  const onSubmit = (values) => {
    dispatch(withdrawAmount(values));
  };

  const debouncedSubmit2 = useCallback(
    debounce((values) => {
      dispatch(
        getAllTransaction({
          unit_number: values.unit_number,
          propertyId: values.propertyId,
          date_to: values.date_to,
          date_from: values.date_from,
        })
      );
    }, 2000),
    []
  );

  const onSubmit2 = (values) => {
    debouncedSubmit2(values);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    dispatch(getAllWithdrawnRequestList());
    dispatch(getPropertyListNameId({ subscription: false }));
    dispatch(
      getAllTransaction({
        unit_number: "",
        propertyId: "",
        date_to: "",
        date_from: "",
      })
    );
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = transactionRes?.data?.transactions?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Transactions"} />
      <div className="w-full p-4 space-y-5">
        <Modal
          title={"Withdraw"}
          isOpen={isModalOpen}
          onClose={closeModal}
          width={"w-full lg:w-[40vw]"}
        >
          {withdraw.isSuccess ? (
            <WithdrawOtp closeModal={closeModal} email={res?.data?.email} />
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="space-y-5 py-4">
                <Input
                  required={true}
                  label={"Amount"}
                  placeholder={"3000"}
                  name={"amount"}
                  className={"py-2 px-2"}
                />
                <div className="w-full text-end">
                  <Button type={"submit"}>Submit</Button>
                </div>
              </Form>
            </Formik>
          )}
        </Modal>
        <div className="flex justify-start items-center space-x-2">
          <p className="text-lg">
            Your Balance:{" "}
            <span className="font-semibold">${res.data.balance}</span>{" "}
          </p>
          <Button onClick={openModal} className={""}>
            Withdraw Now
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-medium"> Withdraw List </h2>
            <hr />
          </div>
          {loading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : data.length > 0 ? (
            <div className="md:grid md:grid-cols-3 md:gap-6 w-full">
              {data.map((item) => {
                return (
                  <div
                    key={item.requestId}
                    className="border border-blue-600 px-4 py-4 rounded-md"
                  >
                    <p className="font-bold"> Amount: ${item.amount} </p>
                    <p> Req. Date: {item.createdAt} </p>
                    <p className="text-blue-600 font-semibold">
                      {" "}
                      Status: {item.status}{" "}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-[20vh]">
              No Withdraw Request Made Yet.
            </div>
          )}
        </div>
        <div className="space-y-5 w-full">
          <div>
            <h2 className="text-lg font-medium">Paid Transaction List </h2>
            <hr />
          </div>
          <Formik initialValues={initialValues2} onSubmit={onSubmit2}>
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
                    placeholder={"Search By Unit Number"}
                    name={"unit_number"}
                    className={"py-2 px-2"}
                    onChange={(e) => {
                      handleChange(e); // Update Formik's state
                      submitForm(); // Submit the form on change
                    }}
                  />
                  <Datepicker
                    parentClassName={"w-full md:px-0 md:py-0"}
                    label={"Date From"}
                    name={"date_from"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.date_from}
                    onChange={(e) => {
                      const date = formatDate(e);
                      setFieldValue("date_from", date);
                      handleChange(date);
                      submitForm();
                    }}
                    submitForm={submitForm}
                    setFieldValue={setFieldValue}
                    touched={touched.date_from}
                    errors={errors.date_from}
                    maxDate={new Date()}
                  />
                  <Datepicker
                    parentClassName={"w-full md:px-0 md:py-0"}
                    label={"Date To"}
                    name={"date_to"}
                    className={"py-2 px-2 border w-full bg-white"}
                    value={values.date_to}
                    onChange={(e) => {
                      const date = formatDate(e);
                      setFieldValue("date_to", date);
                      handleChange(date); // Update Formik's state
                      submitForm(); // Submit the form on change
                    }}
                    setFieldValue={setFieldValue}
                    touched={touched.date_to}
                    errors={errors.date_to}
                    maxDate={new Date()}
                  />
                </Form>
              );
            }}
          </Formik>
          {transactionRes &&
            transactionRes.data &&
            transactionRes.data.total > 0 && (
              <div className="py-4 flex justify-between">
                <div>Total: ${transactionRes.data.total}</div>
                <Button onClick={handlePrint}>Print Now</Button>
              </div>
            )}
          {transactionRes.loading ? (
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : (
            <div ref={tableRef}>
              {paginatedData?.length > 0 ? (
                <table className="w-full px-6 bg-gray-50 border">
                  <thead className="bg-blue-700 dark:bg-darkMode w-full">
                    <tr>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Reference ID
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Paid By
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Unit #
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Amount
                      </th>
                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Payment Type
                      </th>

                      <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                        Date
                      </th>
                      {/* <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Action
                </th> */}
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
                            {item.trxId}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.userId?.name}
                          </td>
                          <td className="py-4 text-center w-fit">
                            {item.apartmentId?.unit_number}
                          </td>
                          <td className="py-4 text-center w-fit">
                            ${item.amount}
                          </td>
                          <td className="py-4 text-center w-fit whitespace-nowrap">
                            {item.type}
                          </td>
                          <td className="py-4 text-center w-fit whitespace-nowrap px-2">
                            {item.createdAt}
                          </td>
                          {/* <td className="py-4 text-center w-fit">
                        <button className="underline text-blue-500">
                          View
                        </button>
                      </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center w-full h-[20vh]">
                  {" "}
                  No Transaction Available...
                </div>
              )}
            </div>
          )}
          {transactionRes?.data?.transactions?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={transactionRes?.data?.transactions?.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
