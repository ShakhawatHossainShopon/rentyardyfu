import { Button, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addRenewOrMoveOut } from "@/services/renewOrMoveOut/renewOrMoveOut";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  lease_term: "",
};

const validationSchema = Yup.object({
  lease_term: Yup.string().required("Required!"),
});

export const Renew = ({ applicationId, convertedOptions, formatted_date }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addRenewOrMoveOut({
        ...values,
        type: "Renew",
        applicationId: applicationId,
      })
    );
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-5 px-2 md:px-0">
        <p className="text-red-600 font-medium">
          Your move-out date: [{formatted_date}], You can request to renew lease
          on [date]
        </p>
        <Select
          name={"lease_term"}
          required={true}
          label={"Select Lease Term"}
          options={convertedOptions && convertedOptions}
          className={"w-full px-2 py-2"}
          parentClassName={"w-full px-0 py-0"}
        />
        <Button className={"min-w-max md:text-sm text-xs"}>
          Submit Request
        </Button>
      </Form>
    </Formik>
  );
};
