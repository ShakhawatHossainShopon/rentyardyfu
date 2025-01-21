import { Button, Input } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { InvoiceDetails } from "./InvoiceDetails";

const initialValues = {
  name: "",
  invoice_by: "",
  invoice_to: "",
  payment_type: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  invoice_by: Yup.string().required("Required!"),
  invoice_to: Yup.string().required("Required!"),
  payment_type: Yup.string().required("Required!"),
});

export const AddCustomInvoice = () => {
  const [mapPreview, setMapPreview] = useState(null);
  const [infoDetails, setInfoDetails] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const calculateTotalAmount = () => {
    return infoDetails.reduce((total, item) => total + item.amount, 0);
  };

  const totalAmount = calculateTotalAmount();

  const onSubmit = (values, { resetForm }) => {
    if (infoDetails.length === 0) {
      setError(true);
    } else {
      dispatch(
        addExtraInvoice({
          ...values,
          type: "Custom",
          amount: totalAmount,
          items: infoDetails,
        })
      );
      resetForm();
      setInfoDetails([]);
    }
  };
  return (
    <div className="space-y-5 md:border md:border-blue-500 p-0 md:p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, touched, errors }) => {
          return (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Invoice Name"}
                  placeholder={"Eg. SamsClub bill"}
                  name={"name"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Invoice maker name"}
                  placeholder={"John Doe(Manager)"}
                  name={"invoice_by"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Who paid for the invoice"}
                  placeholder={"Eg. John Doe"}
                  name={"invoice_to"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Payment Type"}
                  placeholder={"Eg. Credit Card"}
                  name={"payment_type"}
                  className={"py-2 px-2"}
                />
              </div>
              <InvoiceDetails
                infoDetails={infoDetails}
                setInfoDetails={setInfoDetails}
                error={error}
                setError={setError}
                totalAmount={totalAmount}
              />
              <div className="w-full flex md:justify-end md:pb-0 pb-3">
                <Button type={"submit"}>Save Now</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
