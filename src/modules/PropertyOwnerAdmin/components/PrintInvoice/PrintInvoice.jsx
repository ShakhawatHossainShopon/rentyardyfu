import { useEffect, useState } from "react";
import { PaymentInvoice } from "../PaymentInvoice";
const PrintInvoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    first_name: "",
    last_name: "",
    apartment: {},
    status: "",
    move_in_date: "",
    property_name: "",
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const serializedInvoice = queryParams.get("invoice");
    const totalAmount = queryParams.get("total");
    if (serializedInvoice) {
      setInvoiceData(JSON.parse(decodeURIComponent(serializedInvoice)));
    }
    setTotalAmount(totalAmount);
    setCustomerDetails({
      first_name: decodeURIComponent(queryParams.get("first_name") || ""),
      last_name: decodeURIComponent(queryParams.get("last_name") || ""),
      apartment: JSON.parse(
        decodeURIComponent(queryParams.get("apartment") || "{}")
      ),
      invoiceDetails: JSON.parse(
        decodeURIComponent(queryParams.get("invoiceDetails") || "{}")
      ),
      status: decodeURIComponent(queryParams.get("status") || ""),
      move_in_date: decodeURIComponent(queryParams.get("move_in_date") || ""),
      property_name: decodeURIComponent(queryParams.get("property_name") || ""),
    });
  }, []);
  return (
    <div className="p-4 w-full dark:bg-darkMode min-h-screen">
      <div className="w-full flex justify-center">
        <button
          onClick={() => window.print()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 no-print"
        >
          Print Now
        </button>
      </div>
      <PaymentInvoice
        first_name={customerDetails.first_name}
        last_name={customerDetails.last_name}
        apartment={customerDetails.apartment}
        status={customerDetails.status}
        move_in_date={customerDetails.move_in_date}
        property_name={customerDetails.property_name}
        invoiceDetails={customerDetails.invoiceDetails}
        invoiceData={invoiceData}
        totalAmount={totalAmount}
      />
    </div>
  );
};
export default PrintInvoice;
