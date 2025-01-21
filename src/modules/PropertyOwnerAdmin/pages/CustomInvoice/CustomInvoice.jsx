import {
  AdminHeader,
  Button,
  Datepicker,
  Input,
  Pagination,
  TextArea,
} from "@/components";
import {
  useAppDispatch,
  useCheckEmailForCustomInvoiceSelector,
  useGetCustomInvoicesSelector,
  useScrollToTop,
} from "@/hooks";
import {
  addCustomInvoice,
  checkEmailForCustomInvoice,
  getCustomInvoices,
} from "@/services/customInvoice/customInvoice";
import { formatDate, Icons } from "@/utils";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
const initialValues = {
  email: "",
  desc: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  due_days: "",
  items: [
    {
      name: "",
      amount: "",
    },
  ],
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required!"),
  due_days: Yup.string().required("Required!"),
  first_name: Yup.string().required("Required!"),
  last_name: Yup.string().required("Required!"),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required("required"),
      amount: Yup.string().trim().required("required"),
    })
  ),
});

const CustomInvoice = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const checkEmailRes = useCheckEmailForCustomInvoiceSelector();
  const { loading, data } = useGetCustomInvoicesSelector();
  const onSubmit = (values, { resetForm }) => {
    dispatch(addCustomInvoice(values));
    resetForm();
  };

  useEffect(() => {
    dispatch(getCustomInvoices());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader title={"Custom Invoice"} />
      <div className="md:p-4 p-2 w-full space-y-5">
        <div className="space-y-3">
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add Custom Invoice"}
          </Button>
          {showForm && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ setValues, values, errors, touched, setFieldValue }) => {
                useEffect(() => {
                  if (values.email) {
                    dispatch(
                      checkEmailForCustomInvoice({ email: values.email })
                    );
                  }
                }, [values.email]);
                useEffect(() => {
                  setValues({
                    first_name: checkEmailRes?.data?.first_name
                      ? checkEmailRes?.data?.first_name
                      : "",
                    middle_name: checkEmailRes?.data?.middle_name
                      ? checkEmailRes?.data?.middle_name
                      : "",
                    last_name: checkEmailRes?.data?.last_name
                      ? checkEmailRes?.data?.last_name
                      : "",
                    email: values.email,
                    desc: values.desc,
                    due_days: values.due_days,
                    items: values.items,
                  });
                }, [checkEmailRes]);
                return (
                  <Form className="space-y-4">
                    <div className="md:grid md:grid-cols-2 gap-6 w-full space-y-6 md:space-y-0">
                      <Input
                        required={true}
                        label={"Receiver Email"}
                        placeholder={"username@email.com"}
                        type={"email"}
                        name={"email"}
                        className={"py-2 px-2"}
                      />
                      <Datepicker
                        required={true}
                        parentClassName={"w-full md:px-0 md:py-0"}
                        label={"Deadline"}
                        name={"due_days"}
                        className={"py-2 px-2 border w-full bg-white"}
                        value={values.due_days}
                        onChange={(e) => {
                          const date = formatDate(e);
                          setFieldValue("due_days", date);
                        }}
                        setFieldValue={setFieldValue}
                        touched={touched.due_days}
                        errors={errors.due_days}
                        minDate={new Date()}
                      />
                    </div>
                    <div className="md:grid md:grid-cols-3 gap-6 w-full space-y-6 md:space-y-0">
                      <Input
                        required={true}
                        label={"Receiver First Name"}
                        placeholder={"John"}
                        type={"text"}
                        name={"first_name"}
                        className={"py-2 px-2"}
                      />
                      <Input
                        label={"Receiver Middle Name"}
                        placeholder={"Doe"}
                        type={"text"}
                        name={"middle_name"}
                        className={"py-2 px-2"}
                      />
                      <Input
                        required={true}
                        label={"Receiver Last Name"}
                        placeholder={"Doe"}
                        type={"text"}
                        name={"last_name"}
                        className={"py-2 px-2"}
                      />
                    </div>

                    <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-300 dark:md:bg-darkMode dark:md:border-dark-primary">
                      <FieldArray name="items">
                        {({
                          push,
                          remove,
                          form: {
                            values: { items },
                          },
                        }) => {
                          return (
                            <div className="space-y-2 w-full">
                              {items.map((_, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col justify-start items-end space-y-4 w-full"
                                  >
                                    <div className="md:flex justify-start items-center md:space-x-10 w-full relative space-y-5 md:space-y-0">
                                      <Input
                                        required={true}
                                        label={"Item name"}
                                        type={"text"}
                                        placeholder={"Extra Fee"}
                                        name={`items[${index}].name`}
                                        className={"py-2 px-2"}
                                      />
                                      <Input
                                        required={true}
                                        label={"Amount"}
                                        type={"number"}
                                        placeholder={"300"}
                                        name={`items[${index}].amount`}
                                        className={"py-2 px-2"}
                                      />
                                    </div>
                                    <div className="flex justify-start items-center space-x-2">
                                      <div>
                                        {index > 0 ? (
                                          <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                          >
                                            <Icons.Delete />
                                          </Button>
                                        ) : null}
                                      </div>
                                      {index === values.items.length - 1 ? (
                                        <Button
                                          type="button"
                                          onClick={() =>
                                            push({
                                              name: "",
                                              amount: "",
                                            })
                                          }
                                        >
                                          <Icons.Plus />
                                        </Button>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <div className="space-y-4">
                      <TextArea
                        row={4}
                        placeholder="Write a short Description"
                        name="desc"
                        label="Description"
                      />
                    </div>
                    <div className="w-full text-end">
                      <Button>Send</Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}
          <div>
            <h2 className="text-lg font-semibold">Invoices List</h2>
            <hr className="mb-4 border-gray-300" />
          </div>
          {loading ? (
            <div className="w-full flex justify-center items-center h-[30vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : paginatedData?.length > 0 ? (
            <table className="w-full px-6 bg-gray-50 border">
              <thead className="bg-blue-700 dark:bg-darkMode">
                <tr>
                  <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                    Email
                  </th>

                  <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                    Deadline
                  </th>
                  <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:text-gray-400">
                {paginatedData?.map((item, index) => (
                  <tr
                    className={`divide-x ${
                      index % 2 === 0 ? "" : "bg-gray-100 dark:bg-dark-light"
                    }`}
                    key={index}
                  >
                    <td className="py-4 text-center w-fit px-2 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-4 text-center w-fit px-2 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="py-4 text-center w-fit px-2 whitespace-nowrap">
                      {item.due_days}
                    </td>
                    <td className="py-4 text-center w-fit px-2 whitespace-nowrap">
                      ${item.amount}
                    </td>
                    <td className="py-4 font-bold text-center w-fit px-2 whitespace-nowrap text-green-600">
                      {item.status === "Unpaid" ? (
                        <span className="text-red-600">{item.status} </span>
                      ) : (
                        <span className="text-green-600">{item.status} </span>
                      )}
                      <span> </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center w-full h-[20vh]">
              {" "}
              No Invoice Available{" "}
            </div>
          )}
          {data.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={data?.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomInvoice;
