export const PaymentInvoice = ({
  invoiceData,
  totalAmount,
  first_name,
  last_name,
  apartment,
  status,
  move_in_date,
  property_name,
  invoiceDetails,
}) => {
  return (
    <div className="w-full min-w-[800px] darkText">
      <div className="w-full">
        <h2 className="w-full p-3 border-b-2 text-lg font-semibold">
          Payment Receipt
        </h2>
        <div className="flex justify-between py-8 px-3">
          <div>
            <p className="text-lg font-semibold ">
              Name: {first_name} {last_name}{" "}
            </p>
            <p className="text-lg font-semibold">
              Apt/Unit: #{apartment.unit_number}({apartment.type}){" "}
            </p>
            <p className="text-lg font-semibold">Property: {property_name} </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Reference:{" "}
              {invoiceDetails &&
                invoiceDetails.referrenceId &&
                invoiceDetails.referrenceId}
            </p>
            <p className="text-lg font-semibold">
              Deadline:{" "}
              {invoiceDetails &&
                invoiceDetails.deadline &&
                invoiceDetails.deadline}
            </p>
            <p className="text-lg font-semibold">
              Payment Status:{" "}
              {invoiceDetails && invoiceDetails.status && invoiceDetails.status}{" "}
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
                <h3 className="text-base">
                  {index + 1}. {item.title}({item.type})
                </h3>
                <div className="flex gap-4">
                  <p className="">
                    {item.payment === "Discount" ? "-" : null}${item.amount}
                  </p>
                </div>
              </div>
            );
          })}
        {/* Total Fee */}
        <div className="w-full flex justify-between py-3 px-4  bg-blue-100">
          <h3 className="text-base font-bold dark:text-black">
            Total Payment:{" "}
          </h3>
          <div className="flex gap-4">
            <p className="text-base font-bold dark:text-black">
              ${totalAmount && totalAmount}{" "}
            </p>
          </div>
        </div>
        {/* <h2 className="w-full py-14 px-3 text-lg font-semibold">
          Paid on 29 July 2024
        </h2> */}
      </div>
    </div>
  );
};
