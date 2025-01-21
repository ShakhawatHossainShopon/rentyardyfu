import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateInvoice } from "@/services/invoice/invoice";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import * as Yup from "yup";

const initialValues = {
  title: "",
  type: "",
  payment: "",
  amount: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required!"),
  type: Yup.string().required("Required!"),
  payment: Yup.string().required("Required!"),
  amount: Yup.number().required("Required!"),
});

export const UpdateCustomFee = memo(
  ({ setShowForm, applicationId, userId, item }) => {
    const dispatch = useAppDispatch();
    const onSubmit = (values) => {
      dispatch(
        updateInvoice({
          ...values,
          applicationId: applicationId,
          userId: userId,
          invoiceId: item.invoiceId,
        })
      );
    };
    return (
      <div className="md:p-4 p-2">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, setValues, values }) => {
            useEffect(() => {
              setValues({
                type: item.type,
                payment: item.payment,
                amount: item.amount,
                title: item.title,
              });
            }, []);
            return (
              <Form className="space-y-5">
                <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
                  <Input
                    required={true}
                    label={"Invoice Description"}
                    placeholder={"Eg. Trash Fee or Move-in Discount"}
                    name={"title"}
                    className={"py-2 px-2 "}
                  />
                  <Select
                    name={"payment"}
                    required={true}
                    label={"Add Payment"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "Fee",
                        value: "Fee",
                      },
                      {
                        label: "Discount",
                        value: "Discount",
                      },
                    ]}
                    className={"w-full border px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                </div>
                <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
                  <Select
                    name={"type"}
                    required={true}
                    label={"Repeat/One-time payment"}
                    options={[
                      {
                        label: "Select One",
                        value: "",
                      },
                      {
                        label: "Repeat Monthly",
                        value: "Repeat",
                      },
                      {
                        label: "One-Time Payment",
                        value: "One-Time",
                      },
                    ]}
                    className={"w-full border px-2 py-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Input
                    required={true}
                    label={"Amount"}
                    placeholder={"$4.00"}
                    name={"amount"}
                    className={"py-2 px-2"}
                    type={"number"}
                  />
                </div>
                <Button type={"submit"}>Update statement</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
);
