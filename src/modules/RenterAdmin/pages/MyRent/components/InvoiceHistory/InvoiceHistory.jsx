import { Select } from "@/components";
import { Form, Formik } from "formik";

export const InvoiceHistory = () => {
  return (
    <Formik>
      <Form>
        <div className="flex justify-start items-center space-x-2">
          <h3 className="md:text-xl font-bold text-base">
            Monthly Statement History
          </h3>
          <Select
            name={"a"}
            options={[
              {
                label: "2022",
                value: "2022",
              },
              {
                label: "2023",
                value: "2023",
              },
              {
                label: "2024",
                value: "2024",
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
            <span className="text-blue-500 underline underline-offset-2 darkText">
              Download
            </span>
          </li>
          <li className="md:text-base text-sm">
            June Statement-Paid -
            <span className="text-blue-500 underline underline-offset-2 darkText">
              Download
            </span>
          </li>
        </ul>
      </Form>
    </Formik>
  );
};
