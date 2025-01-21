import { config } from "@/config";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PrintExtraInvoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    invoiceMaker: "",
    invoicePayer: "",
    paymentType: "",
    referrenceId: "",
    type: "",
    receipt: {},
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const serializedItems = queryParams.get("items");
    const total = decodeURIComponent(queryParams.get("amount") || "");
    const serializedReceipt = queryParams.get("receipt");

    if (serializedItems) {
      setInvoiceData(JSON.parse(decodeURIComponent(serializedItems)));
    }
    setTotalAmount(total);

    setCustomerDetails({
      name: decodeURIComponent(queryParams.get("name") || ""),
      invoiceMaker: decodeURIComponent(queryParams.get("invoiceMaker") || ""),
      invoicePayer: decodeURIComponent(queryParams.get("invoicePayer") || ""),
      paymentType: decodeURIComponent(queryParams.get("paymentType") || ""),
      referrenceId: decodeURIComponent(queryParams.get("referrenceId") || ""),
      type: decodeURIComponent(queryParams.get("type") || ""),
      receipt: JSON.parse(decodeURIComponent(serializedReceipt)),
    });
  }, []);
  return (
    <div className="p-4 w-full  h-[100vh]">
      <div className="w-full flex justify-center">
        <button
          onClick={() => window.print()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 no-print"
        >
          Print Now
        </button>
      </div>

      <div className="w-full min-w-[800px]">
        <div className="w-full">
          <h2 className="w-full p-3 border-b-2 text-lg font-semibold">
            Payment Receipt
          </h2>
          <div className="flex justify-between py-8 px-3">
            <div>
              <p className="text-lg font-semibold">
                Name: {customerDetails.name}
              </p>
              <p className="text-lg font-semibold">
                Invoice Maker: {customerDetails.invoiceMaker}
              </p>
              <p className="text-lg font-semibold">
                Invoice Payer: {customerDetails.invoicePayer}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">
                Reference:{" "}
                {customerDetails &&
                  customerDetails.referrenceId &&
                  customerDetails.referrenceId}
              </p>
              <p className="text-lg font-semibold">
                Payment Type:{" "}
                {customerDetails &&
                  customerDetails.paymentType &&
                  customerDetails.paymentType}
              </p>
            </div>
          </div>

          {customerDetails.type === "Custom" && (
            <h2 className="w-full p-3 border-b-2 text-base font-semibold">
              Applied to Charges
            </h2>
          )}

          {invoiceData &&
            invoiceData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-between p-3 border-b-2 border-gray"
                >
                  <h3 className="text-base">
                    {index + 1}. {item.name}
                  </h3>
                  <div className="flex gap-4">
                    <p className="">${item.amount}</p>
                  </div>
                </div>
              );
            })}

          {/* Total Fee */}
          <div className="w-full flex justify-between py-3 px-4  bg-blue-100 dark:text-gray-900">
            <h3 className="text-base font-bold">Total Payment: </h3>
            <div className="flex gap-4">
              <p className="text-base font-bold">
                ${totalAmount && totalAmount}{" "}
              </p>
            </div>
          </div>

          {customerDetails.receipt && (
            <div className="w-full mt-5">
              <LazyLoadImage
                src={`${config.url.ASSET_URL}${customerDetails.receipt.link}`}
                alt=""
                loading="lazy"
                className="w-1/2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintExtraInvoice;
