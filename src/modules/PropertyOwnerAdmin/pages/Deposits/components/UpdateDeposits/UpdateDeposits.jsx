import { Button, Input } from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateDeposit } from "@/services/deposit/deposit";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  amount: "",
  note: "",
};

const validationSchema = Yup.object({
  amount: Yup.string().required("Required!"),
  note: Yup.string().required("Required!"),
});

export const UpdateDeposits = ({ depositId, closeModal }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(updateDeposit({ depositId: depositId, note: values.note }));
    closeModal();
  };
  return (
    <div className="pb-5">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, errors, touched, values, setValues }) => {
          return (
            <Form className="space-y-2">
              <div className="flex justify-start items-end space-x-6">
                <Input
                  required={true}
                  label={"Amount"}
                  placeholder={"300"}
                  name={"amount"}
                  type={"number"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Note"}
                  placeholder={"Note"}
                  name={"note"}
                  type={"text"}
                  className={"py-2 px-2"}
                />
              </div>
              <Button className={"md:text-sm text-xs"} type={"submit"}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
