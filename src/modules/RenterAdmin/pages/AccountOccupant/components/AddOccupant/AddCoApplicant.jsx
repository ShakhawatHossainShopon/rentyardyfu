import { Button, CheckboxButton, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addOccupant } from "@/services/occupant/occupant";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
  relation: "",
  email: "",
};
const validationSchema = Yup.object({
  relation: Yup.string().required("Required!"),
  email: Yup.string().required("Required!"),
});
export const AddCoApplicant = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(addOccupant({ ...values, type: "Co-Applicant" }));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-5 p-2 md:p-0">
        <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
          <Select
            name={"relation"}
            required={true}
            label={"Relation with the main applicant"}
            options={[
              {
                label: "Select relation",
                value: "",
              },
              {
                label: "Father",
                value: "Father",
              },
              {
                label: "Mother",
                value: "Mother",
              },
              {
                label: "Spouse",
                value: "Spouse",
              },
              {
                label: "Son",
                value: "Son",
              },
              {
                label: "Daughter",
                value: "Daughter",
              },
              {
                label: "Friend",
                value: "Friend",
              },
              {
                label: "Girl Friend",
                value: "Girl Friend",
              },
              {
                label: "Boy Friend",
                value: "Boy Friend",
              },
              {
                label: "Brother",
                value: "Brother",
              },
              {
                label: "Sister",
                value: "Sister",
              },
              {
                label: "Uncle",
                value: "Uncle",
              },
              {
                label: "Aunt",
                value: "Aunt",
              },
              {
                label: "Grand Father",
                value: "Grand Father",
              },
              {
                label: "Grand Mother",
                value: "Grand Mother",
              },
              {
                label: "Cousin",
                value: "Cousin",
              },
            ]}
            className={"w-full px-2 py-2"}
            parentClassName={"w-full px-0 py-0"}
          />
          <Input
            required={true}
            label={"RentYard Email"}
            placeholder={"Write Email"}
            type={"email"}
            name={"email"}
            className={"py-2 px-2"}
          />
        </div>
        <div className="md:flex md:flex-col justify-center items-start space-y-3">
          <CheckboxButton
            label="Accept me as guarantor and responsible for paying this occupant's rent, fees, and any damages or compensation."
            parentClassName={"py-2"}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Button
            className={`md:text-sm text-xs ${
              isChecked
                ? ""
                : "bg-gray-400 cursor-not-allowed hover:bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900"
            }`}
            type={"submit"}
            disabled={!isChecked}
          >
            Add Co-Applicant
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
