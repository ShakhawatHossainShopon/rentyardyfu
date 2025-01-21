import { AdminHeader } from "@/components";
import { useScrollToTop } from "@/hooks";
import { InsuranceForm } from "./components";

const InsuranceDocs = () => {
  useScrollToTop();
  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Insurance Docs"} />
      <div className="w-full p-4 space-y-10">
        <p className="tracking-wider md:text-base text-sm">
          For any accidental damage to the apartment's amenities or other items,
          you will be charged. To ensure your safety, consider enrolling in
          renter's insurance.
        </p>
        <InsuranceForm />

        {/* <MonthlyStatement /> */}
      </div>
    </div>
  );
};

export default InsuranceDocs;
