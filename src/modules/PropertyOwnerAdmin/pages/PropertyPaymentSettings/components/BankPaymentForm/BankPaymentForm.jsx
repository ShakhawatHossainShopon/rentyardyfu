import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addPaymentMethodForPO } from "@/services/paymentMethods/paymentMethods";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  type: "",
  nickname: "",
  bank_account_type: "",
  bank_account_holder_name: "",
  bank_routing_number: "",
  bank_account_number: "",
  bank_account_holder_type: "",
  default: "",
};

const validationSchema = Yup.object({
  bank_account_type: Yup.string().required("Required!"),
  bank_account_holder_name: Yup.string().required("Required!"),
  bank_routing_number: Yup.string().required("Required!"),
  bank_account_number: Yup.string().required("Required!"),
  bank_account_holder_type: Yup.string().required("Required!"),
});

export const BankPaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const onSubmit = async (values, { resetForm }) => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.createToken("bank_account", {
      country: "US",
      currency: "usd",
      routing_number: values.bank_routing_number,
      account_number: values.bank_account_number,
      account_holder_name: values.bank_account_holder_name,
      account_holder_type: values.bank_account_holder_type, // or 'company'
    });
    if (result.error) {
      toast.error(result.error.message);
    } else {
      dispatch(
        addPaymentMethodForPO({
          ...values,
          type: "Bank Account",
          token: result.token.id,
          usage: "Withdraw",
          default: values.default === "Yes" ? true : false,
        })
      );
      resetForm();
    }
    setLoading(false);
  };

  return (
    <div className=" p-2 md:p-4">
      <div className="md:flex justify-between items-center">
        <h2 className="text-xl font-bold darkText">New Bank Account</h2>
      </div>
      <hr className="my-5 border-gray-200" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setValues, setFieldValue, touched, errors }) => {
          return (
            <Form className="space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6">
                <Input
                  label={"Nick Name (Optional)"}
                  placeholder={"Mike-Chase Bank"}
                  name={"nickname"}
                  className={"py-2 md:mb-0 mb-3 px-2"}
                />
                <Select
                  name={"bank_account_type"}
                  required={true}
                  label={"Account Type"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "Checking",
                      value: "checking",
                    },
                    {
                      label: "Savings",
                      value: "savings",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Account Holder Name"}
                  placeholder={"Enter Account Holder Name"}
                  name={"bank_account_holder_name"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Account Number"}
                  placeholder={"Enter Account Number"}
                  name={"bank_account_number"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Routing Number"}
                  placeholder={"Enter Routing Number"}
                  name={"bank_routing_number"}
                  className={"py-2 px-2"}
                />
                <Select
                  name={"bank_account_holder_type"}
                  required={true}
                  label={"Account Holder Type"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "Individual",
                      value: "individual",
                    },
                    {
                      label: "Company",
                      value: "company",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
              </div>
              <div className="md:grid md:grid-cols-2 gap-6 space-y-5 md:space-y-0">
                <Select
                  name={"default"}
                  label={"Make This Bank Account Primary (Optional)"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "Yes",
                      value: "Yes",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
              </div>
              <Button
                type={"submit"}
                disabled={loading ? true : false}
                className={`md:text-sm text-xs ${
                  loading
                    ? "bg-blue-300 hover:bg-blue-300 cursor-not-allowed"
                    : ""
                } `}
              >
                {loading ? "Loading..." : "Add Bank A/C"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
