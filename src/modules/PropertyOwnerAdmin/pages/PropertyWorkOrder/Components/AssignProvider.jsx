import { Button, Select } from "@/components";
import { useAppDispatch, useGetStaffSelector } from "@/hooks";
import { assignProvider } from "@/services/workOrder/workOrder";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const initialValues = {
  staffId: "",
};

const validationSchema = Yup.object({
  staffId: Yup.string().required("Required!"),
});

export const AssignProvider = ({ staffId, workOrderId }) => {
  const [provider, setProvider] = useState([]);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    console.log(values);
    dispatch(assignProvider({ ...values, workOrderId: workOrderId }));
  };

  const { loading, data } = useGetStaffSelector();

  useEffect(() => {
    if (data.length > 0) {
      const temp = data.map((item) => {
        return {
          label: `${item.first_name} ${item.last_name} (${item.service_identifier})`,
          value: item.staffId,
        };
      });
      setProvider(temp);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, setValues, values }) => {
        useEffect(() => {
          setValues({
            staffId: staffId,
          });
        }, []);
        return (
          <Form className="w-full flex flex-col justify-start items-start">
            <div className="w-full grid grid-cols-3 gap-6">
              <Select
                name={"staffId"}
                required={true}
                label={"Assign Provider"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  ...provider,
                ]}
                className={"w-full px-2 py-2.5"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Button className={"md:mt-7 mt-3"} type="submit">
                Assign
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
