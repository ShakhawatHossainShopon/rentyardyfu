import { Button, Input, Select } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { addPaymentMethodForPO } from "@/services/paymentMethods/paymentMethods";
import { useStripe } from "@stripe/react-stripe-js";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  type: "",
  nickname: "",
  card_holder_name: "",
  card_number: "",
  card_cvv: "",
  card_expiry_month: "",
  card_expiry_year: "",
  address_zip: "",
  default: "",
};

const validationSchema = Yup.object({
  card_holder_name: Yup.string().required("Required!"),
  card_number: Yup.string().required("Required!"),
  card_cvv: Yup.string().required("Required!"),
  address_zip: Yup.string().required("Required!"),
  card_expiry_month: Yup.string().required("Required!"),
  card_expiry_year: Yup.string().required("Required!"),
});

export const CardPaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const dispatch = useAppDispatch();
  const onSubmit = async (values, { resetForm }) => {
    if (!stripe) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(config.url.STRIPE_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${config.key.PUBLISHABLE_KEY}`, // Your Stripe publishable key
        },
        body: new URLSearchParams({
          "card[number]": values.card_number,
          "card[exp_month]": Number(values.card_expiry_month),
          "card[exp_year]": Number(values.card_expiry_year),
          "card[cvc]": values.card_cvv,
          "card[name]": values.card_holder_name,
          "card[address_zip]": values.address_zip,
        }),
      });

      const token = await response.json();
      if (token.error) {
        toast.error(token.error.message);
      } else {
        dispatch(
          addPaymentMethodForPO({
            nickname: values.nickname,
            card_holder_name: values.card_holder_name,
            type: "Card",
            token: token.id,
            default: values.default === "Yes" ? true : false,
            usage: "Spend",
          })
        );
        resetForm();
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to add payment method. Please try again.");
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex justify-between items-center">
        <h2 className="text-xl font-bold darkText">New Credit/Debit Card</h2>
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
              <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
                <Input
                  label={"Nick Name(Optional)"}
                  placeholder={"Mike-Amex Card"}
                  name={"nickname"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Name on Card"}
                  placeholder={"John Doe"}
                  name={"card_holder_name"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
                <Input
                  required={true}
                  label={"Card Number"}
                  placeholder={"Enter Card Number"}
                  name={"card_number"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Security Code(CVV)"}
                  placeholder={"Enter Security code"}
                  name={"card_cvv"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
                <Select
                  name={"card_expiry_month"}
                  required={true}
                  label={"Expiration Month"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "01",
                      value: "01",
                    },
                    {
                      label: "02",
                      value: "02",
                    },
                    {
                      label: "03",
                      value: "03",
                    },
                    {
                      label: "04",
                      value: "04",
                    },
                    {
                      label: "05",
                      value: "05",
                    },
                    {
                      label: "06",
                      value: "06",
                    },
                    {
                      label: "07",
                      value: "07",
                    },
                    {
                      label: "08",
                      value: "08",
                    },
                    {
                      label: "09",
                      value: "09",
                    },
                    {
                      label: "10",
                      value: "10",
                    },
                    {
                      label: "11",
                      value: "11",
                    },
                    {
                      label: "12",
                      value: "12",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Select
                  name={"card_expiry_year"}
                  required={true}
                  label={"Expiration Year"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "2024",
                      value: "2024",
                    },
                    {
                      label: "2025",
                      value: "2025",
                    },
                    {
                      label: "2026",
                      value: "2026",
                    },
                    {
                      label: "2027",
                      value: "2027",
                    },
                    {
                      label: "2028",
                      value: "2028",
                    },
                    {
                      label: "2029",
                      value: "2029",
                    },
                    {
                      label: "2030",
                      value: "2030",
                    },
                    {
                      label: "2031",
                      value: "2031",
                    },
                    {
                      label: "2032",
                      value: "2032",
                    },
                    {
                      label: "2033",
                      value: "2033",
                    },
                    {
                      label: "2034",
                      value: "2034",
                    },
                    {
                      label: "2035",
                      value: "2035",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
              </div>
              <div className="md:grid md:grid-cols-2 gap-6 w-full">
                <Input
                  required={true}
                  label={"Zip Code"}
                  placeholder={"12345"}
                  name={"address_zip"}
                  className={"py-2 px-2"}
                />
                <Select
                  name={"default"}
                  label={"Make This Card Primary (Optional)"}
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
                {loading ? "Loading..." : "Add Card"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
