import { Button, CheckboxButton, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import {
  addSubs,
  deleteSubs,
  updateAutoRenewal,
} from "@/services/subscription/subscription";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const initialValues = {
  paymentMethodId: "",
};

const validationSchema = Yup.object({
  paymentMethodId: Yup.string().required("Required!"),
});

export const SubscriptionCard = ({ active, data }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.paymentMethods && data.paymentMethods.length > 0) {
      setCardData(data.paymentMethods.filter((item) => item.type === "Card"));
    }
  }, [data]);

  useEffect(() => {
    if (cardData.length > 0) {
      const temp = cardData.map((item) => {
        return {
          label: `End with ${item.number}`,
          value: item.paymentMethodId,
        };
      });
      setPaymentMethods(temp);
    }
  }, [cardData]);

  const onSubmit = (values) => {
    dispatch(
      addSubs({
        propertyId: data.propertyId,
        auto: isChecked ? true : false,
        ...values,
      })
    );
  };

  return (
    <div className="rounded-lg  w-fit border border-blue-500 overflow-hidden space-y-3 pb-5 bg-gray-50 dark:bg-dark-light dark:border-dark-light ">
      <h4 className="bg-blue-600 text-white py-2 px-4 md:text-lg text-base darkText dark:bg-dark-primary w-full text-center">
        Priority Package(Monthly) {active ? `- Active` : null}
      </h4>
      <div className="flex flex-col justify-center items-center px-4 md:space-y-5 space-y-3">
        <div className="flex flex-col justify-center items-center w-full">
          {!active && (
            <p className="text-blue-600 md:text-xl text-base font-medium darkText">
              {data && data.name && data.name}
            </p>
          )}
          {active && (
            <p className="text-blue-600 md:text-xl text-base font-medium darkText">
              {data &&
                data.propertyId &&
                data.propertyId.name &&
                data.propertyId.name}
            </p>
          )}
          {!active && (
            <p className="md:text-base text-sm text-center">
              {data && data.address && data.address},{" "}
              {data && data.city && data.city},{" "}
              {data && data.state && data.state}, {data && data.zip && data.zip}
            </p>
          )}
          {active && (
            <p className="md:text-base text-sm text-center">
              {data &&
                data.propertyId &&
                data.propertyId.address &&
                data.propertyId.address}
              ,{" "}
              {data &&
                data.propertyId &&
                data.propertyId.city &&
                data.propertyId.city}
              ,{" "}
              {data &&
                data.propertyId &&
                data.propertyId.state &&
                data.propertyId.state}
              ,{" "}
              {data &&
                data.propertyId &&
                data.propertyId.zip &&
                data.propertyId.zip}
            </p>
          )}
        </div>
        {!active && (
          <h2 className="md:text-xl text-base">
            Total Unit: {data && data.unit && data.unit}{" "}
          </h2>
        )}
        {active && (
          <h2 className="md:text-xl text-base">
            Total Unit:{" "}
            {data &&
              data.propertyId &&
              data.propertyId.unit &&
              data.propertyId.unit}{" "}
          </h2>
        )}
        <div className="space-y-5">
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <h4 className="underline text-base underline-offset-2">Benefits</h4>
            <ul className="list-disc md:text-base text-sm">
              <li>Property Listing</li>
              <li>Management</li>
            </ul>
          </div>
          {!active && <p>Price: ${data && data.price && data.price}/Month</p>}
          {active && (
            <div className="flex flex-col justify-center md:text-base text-sm items-center text-blue-600 lightDark checkbox space-y-1 py-4">
              {active && (
                <p>
                  Price: $
                  {data &&
                    data.first_payment_amount &&
                    data.first_payment_amount}
                  /Month
                </p>
              )}
              <p>
                Paid Till: {data.first_payment_date && data.first_payment_date}
              </p>
              {data && !data.canceled && (
                <p className="text-red-600 pt-2 md:py-2">
                  Next Deadline:{" "}
                  {data.next_payment_date && data.next_payment_date}{" "}
                </p>
              )}
              {data && !data.canceled && (
                <CheckboxButton
                  checked={data && data.auto ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(
                        updateAutoRenewal({
                          auto: true,
                          subscribedId:
                            data && data.subscribedId && data.subscribedId,
                        })
                      );
                    } else {
                      dispatch(
                        updateAutoRenewal({
                          auto: false,
                          subscribedId:
                            data && data.subscribedId && data.subscribedId,
                        })
                      );
                    }
                  }}
                  label="Enable auto renewal"
                />
              )}
              {data && data.canceled && data.canceled && (
                <div className="text-red-600">Subscription canceled.</div>
              )}

              {data && !data.canceled && (
                <Button
                  type={"button"}
                  onClick={() =>
                    Swal.fire({
                      title: "Are You Sure?",
                      showDenyButton: true,
                      confirmButtonText: "Ok",
                      denyButtonText: `Cancel`,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        dispatch(
                          deleteSubs(
                            data &&
                              data.propertyId &&
                              data.propertyId.propertyId &&
                              data.propertyId.propertyId
                          )
                        );
                      }
                    })
                  }
                  className={
                    "bg-red-600 w-full hover:bg-red-700 focus:ring-red-300 focus:ring-2 "
                  }
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
        {!active && (
          <div className="flex flex-col justify-center items-center">
            <h4 className="underline underline-offset-2 text-blue-600 lightDark md:pb-3">
              Price
            </h4>
            <div className="flex justify-center items-center md:text-base text-sm gap-4">
              {/* <CheckboxButton
                label={`$${data && data.price && data.price}/Month`}
              /> */}
              <p>{`$${data && data.price && data.price}/Month`}</p>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="flex flex-col justify-center items-center space-y-3 md:pt-3">
                <div className="md:flex justify-center items-center md:space-x-2 space-y-3 md:space-y-0">
                  <Input
                    name={"a"}
                    placeholder={"Coupon code"}
                    className={"mt-2 md:mt-0"}
                  />
                  <p className="min-w-max text-center py-1 md:py-0">
                    Total: ${data && data.price && data.price}
                  </p>
                </div>
                <CheckboxButton
                  label={"Enable auto renewal"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIsChecked(true);
                    } else {
                      setIsChecked(false);
                    }
                  }}
                  parentClassName={"pt-6"}
                />
                <div className="flex justify-center items-center w-full">
                  <Select
                    name={"paymentMethodId"}
                    options={[
                      {
                        label: "Select Bank/Card",
                        value: "Select Bank/Card",
                      },
                      ...paymentMethods,
                    ]}
                    className={"py-2 md:py-2.5 px-2"}
                    parentClassName={"w-full px-0 py-0"}
                  />
                  <Button type={"submit"} className={"w-full min-w-max"}>
                    Buy Now
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
