import { Button, CheckboxButton, Input, Modal, Select } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { CostBreakdownInfo } from "@/modules/UserClient/pages/ProjectDetails/sections/FloorPlan/Components";
import { addAutoPay, payUserBill } from "@/services/user/user";
import { Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  paymentMethodId: "",
  split_amount: "",
};

const validationSchema = Yup.object({
  paymentMethodId: Yup.string().required("Required!"),
});

export const BillCard = ({ billInfo, isCloseBtn, title, autoPay }) => {
  const [splitAmount, setSplitAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (values) => {
    dispatch(payUserBill(values));
  };

  const calculateTotalWithFee = (amount, methodType) => {
    if (methodType === "Card") {
      const temp =
        (Number(amount) + config.card.fixed) / (1 - config.card.percentage);
      return temp.toFixed(2);
    } else if (methodType === "Bank Account") {
      let bankFee = Math.round(Number(amount) * config.bank.percentage);
      if (bankFee > config.bank.fixed) bankFee = config.bank.fixed;
      const temp2 = Number(amount) + bankFee;
      return temp2.toFixed(2);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, touched, values, setValues }) => {
        useEffect(() => {
          let temp;
          if (billInfo && billInfo.paymentMethods) {
            temp = billInfo?.paymentMethods?.map((items) => {
              if (items.type === "Card") {
                const cardValueWithFee = calculateTotalWithFee(
                  values.split_amount,
                  "Card"
                );

                return {
                  label: `Card ...${items.number} ($${
                    values.split_amount
                      ? cardValueWithFee
                      : billInfo?.card?.final_amount
                  }  with fee)`,
                  value: items.paymentMethodId,
                };
              } else {
                const bankValueWithFee = calculateTotalWithFee(
                  values.split_amount,
                  "Bank Account"
                );
                return {
                  label: `Bank ...${items.number} ($${
                    values.split_amount
                      ? bankValueWithFee
                      : billInfo?.bank?.final_amount
                  }  with fee)`,
                  value: items.paymentMethodId,
                };
              }
            });
          }
          setPaymentMethod(temp);
        }, [billInfo, values.split_amount]);

        useEffect(() => {
          if (values.paymentMethodId) {
            const temp = billInfo?.paymentMethods?.find(
              (item) => item.paymentMethodId == values.paymentMethodId
            );
            if (values.split_amount && temp.type === "Bank Account") {
              const bankValueWithFee = calculateTotalWithFee(
                values.split_amount,
                "Bank Account"
              );
              setSplitAmount(bankValueWithFee);
            } else if (values.split_amount && temp.type === "Card") {
              const cardValueWithFee = calculateTotalWithFee(
                values.split_amount,
                "Card"
              );
              setSplitAmount(cardValueWithFee);
            }
          }
        }, [values]);

        useEffect(() => {
          setValues({
            paymentMethodId:
              billInfo &&
              billInfo.paymentMethods &&
              billInfo.paymentMethods.length > 0 &&
              billInfo.paymentMethods[0].paymentMethodId,
            split_amount: values.split_amount,
          });
        }, [paymentMethod]);
        const handleSplit = (spliter) => {
          if (spliter === "half") {
            setFieldValue(
              "split_amount",
              (
                billInfo &&
                billInfo.invoice_total &&
                billInfo.invoice_total / 2
              ).toFixed(2)
            );
            setSplitAmount(billInfo?.invoice_total / 2);
          } else if (spliter === "oneThird") {
            setFieldValue(
              "split_amount",
              (
                billInfo &&
                billInfo.invoice_total &&
                billInfo.invoice_total / 3
              ).toFixed(2)
            );
            setSplitAmount(billInfo?.invoice_total / 3);
          } else if (spliter === "custom") {
            setFieldValue("split_amount", "");
            setSplitAmount(null);
          }
        };
        return (
          <Form className="h-full w-full flex flex-col justify-start items-center min-h-[120px] bg-gray-100 space-y-2 dark:bg-transparent dark:border-2 dark:border-dark-primary dark:text-gray-400 shadow-md">
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={"Cost Breakdown"}
              width={"w-6/12"}
            >
              <CostBreakdownInfo
                fees={billInfo && billInfo.invoice && billInfo.invoice}
                total={
                  billInfo && billInfo.invoice_total && billInfo.invoice_total
                }
              />
            </Modal>
            <h2 className="w-full bg-black text-white font-bold py-2 text-center relative dark:bg-dark-primary darkText">
              {title}
              {isCloseBtn && (
                <button className="bg-white px-1 absolute right-1 top-2 text-black w-7 h-7 rounded-full flex justify-center items-center text-lg dark:bg-transparent">
                  <span className="text-red-500">
                    {" "}
                    <Icons.Delete />{" "}
                  </span>
                </button>
              )}
            </h2>
            {billInfo && billInfo.lastTrxDate && (
              <p>Last Payment: {billInfo.lastTrxDate} </p>
            )}
            {billInfo && billInfo.payment_due_date && (
              <p>Deadline: {billInfo.payment_due_date} </p>
            )}
            <p className="text-xl font-bold text-blue-600 dark:text-gray-300">
              ${billInfo && billInfo.invoice_total ? billInfo.invoice_total : 0}
            </p>
            <CheckboxButton
              label={"Enable Auto Payment"}
              checked={autoPay ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(addAutoPay({ status: true }));
                } else {
                  dispatch(addAutoPay({ status: false }));
                }
              }}
              parentClassName={""}
            />
            {billInfo && billInfo.invoice && billInfo.invoice.length > 0 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 border focus:border-blue-500 py-1 px-2 dark:bg-transparent dark:border-dark-primary"
                  onClick={openModal}
                >
                  View Statement
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSplit((prev) => !prev);
                    setFieldValue("split_amount", "");
                    setSplitAmount("");
                  }}
                  className="bg-gray-300 border focus:border-blue-500 py-1 px-2 dark:bg-transparent dark:border-dark-primary"
                >
                  Split Bill
                </button>
              </div>
            )}
            {isSplit && (
              <div className="flex justify-center items-center space-x-2 overflow-hidden">
                <div className="flex justify-center items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleSplit("half")}
                    className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs dark:bg-transparent dark:border-dark-primary"
                  >
                    1/2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSplit("oneThird")}
                    className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs dark:bg-transparent dark:border-dark-primary"
                  >
                    1/3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSplit("custom")}
                    className="bg-gray-300 border focus:border-blue-500 py-1 px-2 text-xs dark:bg-transparent dark:border-dark-primary"
                  >
                    Custom
                  </button>
                </div>
                <div className="max-w-24">
                  <Input
                    required={true}
                    placeholder={"300"}
                    name={"split_amount"}
                    className={"py-2 px-2"}
                    onChange={(e) => {
                      setFieldValue("split_amount", e.target.value);
                      setSplitAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
            {billInfo && billInfo.invoice && billInfo.invoice.length > 0 && (
              <div className="flex items-center w-full">
                <Select
                  name={"paymentMethodId"}
                  options={
                    paymentMethod
                      ? [
                          {
                            label: "Select Bank/Card",
                            value: "",
                          },
                          ...paymentMethod,
                        ]
                      : [
                          {
                            label: "Select Bank/Card",
                            value: "",
                          },
                        ]
                  }
                  className={"py-2.5 px-1 text-sm"}
                  parentClassName={"px-0 py-0 w-full"}
                />
                <Button
                  type={"submit"}
                  className={"w-fit whitespace-nowrap text-xs"}
                >
                  Pay Now
                </Button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
