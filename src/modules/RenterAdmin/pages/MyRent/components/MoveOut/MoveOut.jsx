import { Button, Datepicker } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addRenewOrMoveOut } from "@/services/renewOrMoveOut/renewOrMoveOut";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const initialValues = {
  date: "",
};

const validationSchema = Yup.object({
  date: Yup.string().required("Required!"),
});

export const MoveOut = ({ applicationId, date, formatted_date }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addRenewOrMoveOut({
        ...values,
        type: "Move Out",
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
      {({ values, setFieldValue, touched, errors, setValues }) => {
        useEffect(() => {
          setValues({
            date: date,
          });
        }, []);
        return (
          <Form className="space-y-5 px-2 md:px-0">
            <p className="text-red-500 font-medium">
              <span className="text-gray-900 ">
                Your Move-Out Date: [{formatted_date}].
              </span>{" "}
              If you wish to move out before this date, it will be considered a
              lease term break, resulting in lease violation fees and other
              charges. Please contact the Property Manager if you would like to
              discuss breaking the lease.
            </p>
            <Datepicker
              required={true}
              parentClassName={"w-full px-0 py-0 relative z-50"}
              label={"Move-Out Date"}
              name={"date"}
              className={"py-2 px-2 w-full z-50 bg-white"}
              value={values.date}
              onChange={(e) => {
                const date = formatDate(e);
                setFieldValue("date", date);
              }}
              setFieldValue={setFieldValue}
              touched={touched.date}
              errors={errors.date}
              minDate={new Date()}
            />
            <Button type={"submit"} className={"min-w-max md:text-sm text-xs"}>
              Submit Request
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
