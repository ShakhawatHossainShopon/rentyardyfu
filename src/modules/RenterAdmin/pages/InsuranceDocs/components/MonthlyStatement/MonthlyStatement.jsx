import { Select } from "@/components";
import { Form, Formik } from "formik";

export const MonthlyStatement = () => {
  return (
    <Formik>
      <Form>
        <div className="flex justify-start items-center space-x-2">
          <h3 className="md:text-xl font-bold text-lg">Payment History</h3>
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
            className={"w-full border border-blue-500 px-2 py-2"}
            parentClassName={"w-fit px-0 py-0"}
          />
        </div>

        <hr className="my-5" />
        <ul className="list-disc px-5">
          <li className="md:text-base text-sm">
            July Statement-No Paid -
            <span className="text-blue-500 underline underline-offset-2">
              Download
            </span>
          </li>
          <li className="md:text-base text-sm">
            June Statement-Paid -
            <span className="text-blue-500 underline underline-offset-2">
              Download
            </span>
          </li>
        </ul>
      </Form>
    </Formik>
  );
};
