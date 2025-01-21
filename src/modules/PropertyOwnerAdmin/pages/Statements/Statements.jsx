import { AdminHeader, Input, Modal, Pagination, Select } from "@/components";
import {
  useAppDispatch,
  useGetPropertyListNameIdSelector,
  useGetStatementsSelector,
  useScrollToTop,
} from "@/hooks";
import { getStatements } from "@/services/statements/statements";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { UpdateStatements } from "./components/UpdateStatements/UpdateStatements";

const initialValues = {
  unit_number: "",
  propertyId: "",
};

const Statements = () => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [applicationId, setApplicationId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id) => {
    setApplicationId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const allProperty = useGetPropertyListNameIdSelector();
  useScrollToTop();
  const { loading, data } = useGetStatementsSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getStatements({
        unit_number: "",
        propertyId: "",
      })
    );
  }, []);

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllTransaction({
          unit_number: values.unit_number,
          propertyId: values.propertyId,
        })
      );
    }, 2000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };

  useEffect(() => {
    if (allProperty && allProperty.data && allProperty.data.length > 0) {
      const temp = allProperty.data.map((item) => {
        return { label: item.name, value: item.propertyId };
      });
      setPropertyOptions(temp);
    }
  }, [allProperty]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader title={"Monthly Statements"} />

      <div className="md:p-4 p-2 w-full space-y-5">
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
              <Form className="md:grid md:grid-cols-4 w-full md:gap-6 space-y-6 md:space-y-0 mt-4 md:mt-0">
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
              </Form>
            );
          }}
        </Formik>
        {loading ? (
          <div className="w-full flex justify-center items-center h-[90vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : paginatedData?.length > 0 ? (
          <table className="w-full px-6 bg-gray-50 border">
            <thead className="bg-blue-700 dark:bg-darkMode">
              <tr>
                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-full">
                  Name
                </th>
                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Ref. ID
                </th>
                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Unit #
                </th>
                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Due
                </th>

                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Deadline
                </th>
                <th className="whitespace-nowrap px-2 md:px-6 py-3 text-xs md:text-base text-center uppercase tracking-wider text-white dark:text-gray-400 w-fit">
                  Action
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
                  {applicationId === item.applicationId && (
                    <Modal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      title={"Pay Statement"}
                    >
                      <UpdateStatements
                        closeModal={closeModal}
                        applicationId={applicationId}
                      />
                    </Modal>
                  )}
                  <td className="py-4 text-center w-full">{item.name}</td>
                  <td className="py-4 text-center w-fit">
                    {item.referrenceId}
                  </td>
                  <td className="py-4 text-center w-fit">{item.unit_number}</td>
                  <td className="py-4 text-center w-fit">${item.total}</td>
                  <td className="py-4 text-center w-fit">{item.deadline}</td>
                  <td className="py-4 text-center w-fit">
                    <button
                      onClick={() => openModal(item.applicationId)}
                      className="underline text-blue-500"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center w-full h-[20vh]">
            {" "}
            No Statement Available...
          </div>
        )}
        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={data.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Statements;
