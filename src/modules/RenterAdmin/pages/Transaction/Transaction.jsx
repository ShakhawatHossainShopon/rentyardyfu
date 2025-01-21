import { AdminHeader, Button, Datepicker, Pagination } from "@/components";
import {
  useAppDispatch,
  useGetAllTransactionForRenterSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllTransactionForRenter } from "@/services/paymentMethods/paymentMethods";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const initialValues = {
  date_to: "",
  date_from: "",
};

const Transaction = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const transactionRes = useGetAllTransactionForRenterSelector();
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

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllTransactionForRenter({
          date_to: values.date_to,
          date_from: values.date_from,
        })
      );
    }, 2000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };

  useEffect(() => {
    dispatch(
      getAllTransactionForRenter({
        date_to: "",
        date_from: "",
      })
    );
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = transactionRes?.data?.transactions?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Transactions"} />
      <div className="w-full p-4 space-y-5">
        <div className="space-y-5 w-full">
          <div>
            <h2 className="text-lg font-medium">Paid Transaction List </h2>
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
          {transactionRes?.data?.total > 0 && (
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
                          <td className="py-4 px-2 text-center w-fit">
                            ${item.amount}
                          </td>
                          <td className="py-4 px-2 text-center w-fit whitespace-nowrap">
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
                <div className="w-full flex justify-center items-center h-[20vh]">
                  No transactions available...
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
