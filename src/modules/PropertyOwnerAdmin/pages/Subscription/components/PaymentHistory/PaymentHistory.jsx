import { Datepicker } from "@/components";

export const PaymentHistory = () => {
  return (
    <div>
      <div className="md:flex justify-start items-center md:space-x-5">
        <h3 className="font-semibold md:text-lg text-base min-w-max">
          Payment History
        </h3>
        <Datepicker
          name="date"
          className="py-2 px-1"
          parentClassName="p-0 w-fit"
        />
        <p className="pt-3 md:pt-0">From</p>
        <Datepicker
          name="date"
          className="py-2 px-1"
          parentClassName="p-0 w-fit"
        />
      </div>
      <hr className="mt-5 mb-8 border-gray-500" />
      <div className="space-y-2">
        <p>
          #37363 - Green Village Bill for July - Paid, Total: 23.00 -{" "}
          <span className="text-blue-500 underline underline-offset-2 cursor-pointer darkText">
            Download
          </span>
        </p>
      </div>
    </div>
  );
};
