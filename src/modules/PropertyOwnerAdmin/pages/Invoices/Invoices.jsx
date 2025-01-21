import { AdminHeader } from "@/components";
import { useAppDispatch, useScrollToTop } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { getExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { cn, Icons } from "@/utils";
import { useEffect, useState } from "react";
import { AddCustomInvoice, AddReceiptInvoice, AllInvoice } from "./components";

const Invoices = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllAsset());
    dispatch(getExtraInvoice({ date_to: "", date_from: "" }));
  }, [dispatch]);

  return (
    <div className="w-full">
      <AdminHeader title={"Invoices"} />
      <div className="w-full md:p-4 p-2 space-y-5">
        <div>
          <h2 className="font-semibold text-lg min-w-max">Add Invoices</h2>
          <hr className="mt-3" />
        </div>
        <div className={cn(`relative flex flex-col w-fit px-0 py-0`, "")}>
          <label
            className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText `}
          >
            Select Invoice System
          </label>
          <div className="relative">
            <select
              aria-label="invoice type"
              className={cn(
                `text-gray-900 text-xs pe-8 py-2.5 px-2 ring-blue-500 border border-blue-500 block w-full outline-none transition-all duration-200 pr-8 dark:bg-darkMode darkText`,
                ""
              )}
              onChange={(e) => setShowForm(e.target.value)}
            >
              <option value={""} className="min-w-max text-sm">
                Select One
              </option>
              <option value={"Custom"} className="min-w-max text-sm">
                Custom Invoice
              </option>
              <option value={"Receipt"} className="min-w-max text-sm">
                Receipt Based Invoice
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Icons.DownArrow />
            </div>
          </div>
        </div>
        {showForm === "Custom" && <AddCustomInvoice />}
        {showForm === "Receipt" && <AddReceiptInvoice />}

        <AllInvoice />
      </div>
    </div>
  );
};

export default Invoices;
