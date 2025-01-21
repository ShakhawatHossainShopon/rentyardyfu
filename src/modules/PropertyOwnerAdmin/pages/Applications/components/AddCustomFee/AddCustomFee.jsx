import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addInvoice } from "@/services/invoice/invoice";
import { Form, Formik } from "formik";
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
export const AddCustomFee = ({ setShowForm, applicationId, userId }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      addInvoice({ ...values, applicationId: applicationId, userId: userId })
    );
    setShowForm(false);
  };
  return (
    <div className="md:border md md:p-4 p-2 dark:border-blue-900">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl text-base md:pt-0 pt-5 font-bold">
          Add Custom Fee/Discount
        </h2>
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center dark:text-gray-900"
        >
          X
        </button>
      </div>
      <hr className="my-5 border-gray-200 dark:border-blue-900" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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
                  value: "Repeat Monthly",
                },
                {
                  label: "One Time Payment",
                  value: "One Time",
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
          <Button type={"submit"}>Add to statement</Button>
        </Form>
      </Formik>
    </div>
  );
};
