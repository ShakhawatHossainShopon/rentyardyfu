import { Select } from "@/components";
import { Form, Formik } from "formik";

export const PaymentHistory = () => {
  return (
    <Formik>
      <Form>
        <div className="flex justify-start items-center space-x-2">
          <h3 className="font-semibold">Payment History</h3>
          <Select
            name={"a"}
            options={[
              {
                label: "3 Months",
                value: "3 Months",
              },
              {
                label: "6 Months",
                value: "6 Months",
              },
              {
                label: "12 Months",
                value: "12 Months",
              },
              {
                label: "15 Months",
                value: "15 Months",
              },
            ]}
            className={"w-full px-2 py-2"}
            parentClassName={"w-fit px-0 py-0"}
          />
        </div>

        <hr className="my-5" />
        <ul className="list-disc pl-5">
          <li>Electricity bill of TXU Energy Paid on 09/11/2024</li>
          <li>Internet bill of Spectrum Paid on 09/11/2024</li>
        </ul>
      </Form>
    </Formik>
  );
};
