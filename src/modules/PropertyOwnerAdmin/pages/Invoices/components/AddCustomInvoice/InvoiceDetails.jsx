import { Button, Datepicker, Input } from "@/components";
import { formatDate, Icons } from "@/utils";
import { useState } from "react";
export const InvoiceDetails = ({
  infoDetails,
  setInfoDetails,
  error,
  setError,
  totalAmount,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    name: "",
    amount: "",
    date: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemInfo.name && itemInfo.amount) {
      setInfoDetails([
        ...infoDetails,
        {
          name: itemInfo.name,
          amount: Number(itemInfo.amount),
          date: itemInfo.date,
        },
      ]);
      setError(false);
      setItemInfo({
        name: "",
        amount: "",
        date: "",
      });
    }
  };
  const handleChangeDate = (value) => {
    const dates = formatDate(value);
    const date = new Date(dates);
    setItemInfo({ ...itemInfo, date: date });
  };
  const handleChange = (e) => {
    setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
  };
  const handleDelete = (info) => {
    setInfoDetails(infoDetails.filter((i) => i !== info));
  };
  return (
    <div className="space-y-5">
      <div>
        <h3 className="md:text-lg font-semibold">Invoice Details</h3>
        <hr className="mt-1 mb-2" />
      </div>
      {error ? (
        <div className="text-red-600 text-center text-lg font-semibold darkText">
          {" "}
          Please Add an Item First{" "}
        </div>
      ) : null}
      <div className="space-y-3">
        {infoDetails.map((info, index) => {
          return (
            <div
              className="flex justify-between items-center border-b border-b-gray-400 py-1"
              key={index}
            >
              <div className="md:text-base text-sm">
                {" "}
                {index + 1}. {info.name}{" "}
              </div>
              <div className="flex justify-center items-center space-x-2 ">
                <p className="font-medium md:text-base text-sm">
                  ${info.amount}{" "}
                </p>
                <Icons.Delete
                  onClick={() => handleDelete(info)}
                  className="text-red-500 md:text-base text-sm cursor-pointer"
                />
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center px-0">
          <div className="font-medium md:text-base text-sm">Total</div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold md:text-base text-sm">
              ${Number(totalAmount).toFixed(2)}{" "}
            </p>
          </div>
        </div>
      </div>
      <Button type={"button"} onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Close Form" : "Add New Item"}
      </Button>
      {showForm && (
        <form className="w-full space-y-5">
          <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
            <div className={`w-full`}>
              <label
                className={`block mb-2 text-sm font-medium text-gray-900 min-w-max after:content-['*'] after:text-red-400 darkText`}
                htmlFor=""
              >
                Items/Service Description
              </label>
              <Input
                type={"text"}
                className={`border border-blue-500 text-gray-900 text-sm block w-full p-2 outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-50 dark:bg-darkMode dark:border-dark-primary`}
                name="name"
                placeholder={"Eg. Hand Towel, 3CT"}
                value={itemInfo.name}
                onChange={handleChange}
              />
            </div>
            <div className={`w-full`}>
              <label
                className={`block mb-2 text-sm font-medium text-gray-900 min-w-max after:content-['*'] after:text-red-400 darkText`}
                htmlFor=""
              >
                Amount
              </label>
              <Input
                type={"number"}
                className={`p-2 border border-blue-500 text-gray-900 text-sm block w-full outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-50 dark:bg-darkMode dark:border-dark-primary`}
                name="amount"
                placeholder={"$4.00"}
                value={itemInfo.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full md:grid md:grid-cols-2 gap-6 space-y-5 md:space-y-0">
            <Datepicker
              name="date"
              label="Date (Optional)"
              className="py-2 px-1 w-full"
              parentClassName="md:px-0 md:py-0 w-full"
              value={itemInfo.date}
              onChange={handleChangeDate}
              maxDate={new Date()}
            />
          </div>
          <div className="w-full flex justify-start">
            <Button onClick={handleSubmit} type={"submit"}>
              Add Item
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
