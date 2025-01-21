import { Datepicker } from "@/components";
import { useAppDispatch, useGetExtraInvoiceSelector } from "@/hooks";
import { getExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback } from "react";
import { ClipLoader } from "react-spinners";

const initialValues = {
  date_to: "",
  date_from: "",
};

export const AllInvoice = () => {
  const { data, loading } = useGetExtraInvoiceSelector();
  const dispatch = useAppDispatch();

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getExtraInvoice({
          date_to: values.date_to,
          date_from: values.date_from,
        })
      );
    }, 1000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };
  return (
    <div>
      <div className="md:flex justify-start items-center md:space-x-5">
        <div className="w-full flex justify-start items-end space-x-4">
          <h3 className="font-semibold text-lg min-w-max">Add Invoices</h3>
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
                    submitForm={submitForm}
                    setFieldValue={setFieldValue}
                    touched={touched.date_to}
                    errors={errors.date_to}
                    maxDate={new Date()}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <hr className="mt-5 mb-8 border-gray-500" />
      <div className="space-y-2">
        {!loading ? (
          data.length > 0 ? (
            data.map((item) => {
              const openInNewTab = () => {
                const serializedItems = encodeURIComponent(
                  JSON.stringify(item.items && item.items)
                );
                const serializedReceipt = encodeURIComponent(
                  JSON.stringify(item.receipt && item.receipt)
                );

                // Serialize additional details
                const queryParams = new URLSearchParams({
                  items: serializedItems,
                  amount: encodeURIComponent(item.amount),
                  invoiceMaker: encodeURIComponent(item.invoice_by),
                  invoicePayer: encodeURIComponent(item.invoice_to),
                  name: encodeURIComponent(item.name),
                  paymentType: encodeURIComponent(item.payment_type),
                  receipt: serializedReceipt,
                  referrenceId: encodeURIComponent(item.referrenceId),
                  type: encodeURIComponent(item.type),
                });

                const newWindow = window.open(
                  `${
                    window.location.origin
                  }/print-extra-invoice?${queryParams.toString()}`,
                  "_blank"
                );

                newWindow.document.close();
              };
              return (
                <p key={item.extraInvoiceId} className="md:text-base text-sm">
                  #{item.referrenceId} - {item.name} - Paid by {item.invoice_to}
                  , Total: {item.amount} -{" "}
                  <span
                    onClick={openInNewTab}
                    className="text-blue-500 underline underline-offset-2 cursor-pointer darkText"
                  >
                    Download
                  </span>
                </p>
              );
            })
          ) : (
            <div className="w-full h-[20vh] flex justify-center items-center">
              {" "}
              No Invoice Available...{" "}
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};
