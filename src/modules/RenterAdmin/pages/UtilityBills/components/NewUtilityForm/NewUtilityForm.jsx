import { Button, Input, Select } from "@/components";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  utilityType: "",
  company: "",
  accountNumber: "",
  userName: "",
  pinNumber: "",
};

const validationSchema = Yup.object({
  utilityType: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  accountNumber: Yup.string().required("Required!"),
  userName: Yup.string().required("Required!"),
  pinNumber: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log(values);
};

export const NewUtilityForm = ({ setShowUtilityForm }) => {
  return (
    <div className="md:p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Add new Utility</h2>
        <button
          onClick={() => setShowUtilityForm(false)}
          className="bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center dark:text-darkMode"
        >
          X
        </button>
      </div>
      <hr className="my-5 border-gray-200" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="space-y-5">
          <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
            <Select
              name={"a"}
              label={"Select Utility Type"}
              options={[
                {
                  label: "Electricity",
                  value: "Electricity",
                },
                {
                  label: "Internet",
                  value: "Internet",
                },
              ]}
              className={"w-full  px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
            <Select
              name={"b"}
              label={"Select Company"}
              options={[
                {
                  label: "Duke Energy",
                  value: "Duke Energy",
                },
                {
                  label: "Exelon",
                  value: "Exelon",
                },
                {
                  label: "Constellation Energy",
                  value: "Constellation Energy",
                },
                {
                  label: "Gexa Energy",
                  value: "Gexa Energy",
                },
                {
                  label: "GenOn Energy",
                  value: "GenOn Energy",
                },
                {
                  label: "Cirro Energy",
                  value: "Cirro Energy",
                },
                {
                  label: "Green Mountain Energy",
                  value: "Green Mountain Energy",
                },
                {
                  label: "4Change Energy",
                  value: "4Change Energy",
                },
                {
                  label: "Direct Energy",
                  value: "Direct Energy",
                },
                {
                  label: "TXU Energy",
                  value: "TXU Energy",
                },
                {
                  label: "Champion Energy",
                  value: "Champion Energy",
                },
              ]}
              className={"w-full  px-2 py-2"}
              parentClassName={"w-full px-0 py-0"}
            />
          </div>
          <div className="w-full md:flex justify-center items-center md:space-x-6 md:space-y-0 space-y-5">
            <Input
              required={true}
              label={"Account Number"}
              placeholder={"Enter Account Number"}
              name={"accountNumber"}
              className={"py-2 px-2"}
            />
            <Input
              required={true}
              label={"Username"}
              placeholder={"Enter User Name"}
              name={"userName"}
              className={"py-2 px-2"}
            />
          </div>
          <div className="w-full flex justify-center items-center space-x-6">
            <Input
              required={true}
              label={"Pin Number"}
              placeholder={"Enter Pin Name"}
              name={"pinNumber"}
              className={"py-2 px-2"}
            />
          </div>
          <Button>Submit Utility</Button>
        </Form>
      </Formik>
    </div>
  );
};
