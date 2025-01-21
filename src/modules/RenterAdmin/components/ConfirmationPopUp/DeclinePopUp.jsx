import { Button, Select } from "@/components";
import { Form, Formik } from "formik";

export const Confirmation = () => {
  const options = [
    {
      label: "Reason of Decline",
    },
    {
      label: "Select Another One",
    },
    {
      label: "Not Interested Now",
    },
    {
      label: "Extra Move-in Fees",
    },
  ];
  return (
    <Formik>
      <Form className="text-center px-16 mx-2 pb-16">
        <h2 className="text-2xl">Are you sure to Decline?</h2>
        <Select
          name={"a"}
          labe={"hello"}
          className={"border-2 border-[#000] p-3 w-full mt-4"}
          options={options}
        />
        <Button className={"w-full bg-red-700 text-lg mt-5 hover:bg-red-800"}>
          Decline Now
        </Button>
      </Form>
    </Formik>
  );
};
