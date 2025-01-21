import { useEffect, useState } from "react";
const RenterInvoice = () => {
  const [total, setTotal] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    property: "",
    apartmentUnit: "",
    address: "",
    referrence: "",
    deadline: "",
    status: "",
    managerName: "",
    managerPhone: "",
    managerEmail: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const serializedInvoice = queryParams.get("invoices");
    const total = queryParams.get("total");
    if (serializedInvoice) {
      setInvoiceData(JSON.parse(decodeURIComponent(serializedInvoice)));
    }
    setDetails({
      name: decodeURIComponent(queryParams.get("name")),
      property: decodeURIComponent(queryParams.get("property")),
      apartmentUnit: decodeURIComponent(queryParams.get("apartmentUnit")),
      address: decodeURIComponent(queryParams.get("address")),
      referrence: decodeURIComponent(queryParams.get("referrence")),
      deadline: decodeURIComponent(queryParams.get("deadline")),
      status: decodeURIComponent(queryParams.get("status")),
      managerName: decodeURIComponent(queryParams.get("managerName")),
      managerPhone: decodeURIComponent(queryParams.get("managerPhone")),
      managerEmail: decodeURIComponent(queryParams.get("managerEmail")),
      city: decodeURIComponent(queryParams.get("city")),
      state: decodeURIComponent(queryParams.get("state")),
      zip: decodeURIComponent(queryParams.get("zip")),
      country: decodeURIComponent(queryParams.get("country")),
    });
    setTotal(total);
  }, []);
  return (
    <div className="p-4 dark:bg-darkMode darkText min-h-screen">
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
          <h2 className="w-full p-3 border-b-2 text-xl font-semibold">
            Invoice
          </h2>
          <div className="flex justify-between py-8 px-3">
            <div>
              <p className="text-lg font-semibold">
                Name: {details.name || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                Property: {details.property || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                Apt/Unit: {details.apartmentUnit || "N/A"}
              </p>
              <p className="text-lg font-semibold flex justify-start items-start space-x-1">
                <div>Address:</div>
                <div className="">
                  <div>{details.address},</div>
                  <div>
                    {details.city} {details.state} {details.zip},{" "}
                    {details.country}
                  </div>
                </div>
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Reference: {details.referrence || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                Deadline: {details.deadline || "N/A"}{" "}
              </p>
              <p className="text-lg font-semibold">
                Payment Status: {details.status || "N/A"}
              </p>
            </div>
          </div>
          <h2 className="w-full p-3 border-b-2 text-base font-semibold">
            Applied to Charges
          </h2>
          {invoiceData &&
            invoiceData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex justify-between p-3 border-b-2 border-gray"
                >
                  <h3 className="text-base">{item.title}</h3>
                  <div className="flex gap-4">
                    <p className="">
                      {item.payment === "Discount" ? "-" : null}${item.amount}
                    </p>
                  </div>
                </div>
              );
            })}
          <div className="w-full flex justify-between py-3 px-4  bg-blue-100">
            <h3 className="text-base font-bold dark:text-black">
              Total Payment:{" "}
            </h3>
            <div className="flex gap-4">
              <p className="text-base font-bold dark:text-black">
                ${total || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-start space-x-2 mt-5">
            <h2 className="text-base font-semibold">Manager Contact Info:</h2>
          </div>
          <div>
            <div className="text-sm">{details?.managerName},</div>
            <div className="text-sm">{details?.managerEmail},</div>
            <div className="text-sm">{details?.managerPhone}</div>
          </div>
          <div className="flex justify-center items-center text-xs mt-5">
            <p>
              This is auto-generated invoice by RentYard. To verify please
              contact us at{" "}
              <a
                href="https://rentyard.net/"
                target="_blank"
                className="underline text-blue-600"
              >
                www.rentyard.net
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RenterInvoice;
