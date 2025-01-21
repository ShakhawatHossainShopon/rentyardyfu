import { AdminHeader, Button, TabCom } from "@/components";
import {
  useAppDispatch,
  useGetAllPaymentMethodsSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllPaymentMethods } from "@/services/paymentMethods/paymentMethods";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import {
  BankPaymentForm,
  CardPaymentForm,
  PaymentInfoCard,
} from "./components";

const PropertyPaymentSettings = () => {
  const dispatch = useAppDispatch();

  useScrollToTop();
  const [bankData, setBankData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const { loading, data } = useGetAllPaymentMethodsSelector();

  useEffect(() => {
    if (data) {
      setCardData(data.filter((item) => item.type === "Card"));
      setBankData(data.filter((item) => item.type === "Bank Account"));
    }
  }, [data]);

  useEffect(() => {
    dispatch(getAllPaymentMethods());
  }, []);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Payment Setting"} />
      <div className="w-full p-4 space-y-10">
        <div>
          <p className="tracking-wide font-medium md:text-base text-sm">
            Add payment method, that saves your time while making payment. You
            can add multiple payment method.
          </p>
        </div>
        {!loading && data ? (
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">
                  Your Bank Accounts to Withdraw Money
                </h4>
                <hr />
              </div>
              {bankData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bankData.map((item) => {
                    return (
                      <PaymentInfoCard key={item.paymentMethodId} item={item} />
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-[10vh]">
                  No bank Account Added yet...
                </div>
              )}
            </div>
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">
                  Your Cards for Spending
                </h4>
                <hr />
              </div>
              {cardData.length !== 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cardData.map((item) => {
                    return (
                      <PaymentInfoCard key={item.paymentMethodId} item={item} />
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-[10vh] darkText">
                  No Card Added yet...
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center">
            {" "}
            <ClipLoader size={100} color="blue" />{" "}
          </div>
        )}
        <Button
          className={"md:text-sm text-xs"}
          onClick={() => setIsShowPayment((prev) => !prev)}
        >
          {isShowPayment ? "Close Tab" : "Add New Payment Method"}
        </Button>
        {isShowPayment && (
          <TabCom
            data={[
              {
                label: "Add Credit/Debit Card for Spending",
                value: "Add Credit/Debit Card",
                component: <CardPaymentForm />,
              },
              {
                label: "Add Bank Account to Withdraw Money",
                value: "Add Bank Account",
                component: <BankPaymentForm />,
              },
            ]}
            defaultValue={"Add Credit/Debit Card"}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyPaymentSettings;
