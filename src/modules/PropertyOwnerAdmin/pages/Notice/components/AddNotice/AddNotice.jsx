import { Button, Datepicker, Input, Select, TextArea } from "@/components";
import { useAppDispatch, useGetPropertyListNameIdSelector } from "@/hooks";
import { addNotice } from "@/services/notice/notice";
import { getPropertyListNameId } from "@/services/property/property";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const initialValues = {
  propertyId: "",
  subject: "",
  date: "",
  msg: "",
};
const validationSchema = Yup.object({
  propertyId: Yup.string().required("Required!"),
  subject: Yup.string().required("Required!"),
  msg: Yup.string().required("Required!"),
});
export const AddNotice = () => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const { data, loading } = useGetPropertyListNameIdSelector();
  useEffect(() => {
    dispatch(getPropertyListNameId(false));
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      const temp = data.map((item) => {
        return { label: item.name, value: item.propertyId };
      });
      setPropertyOptions(temp);
    }
  }, [data]);
  const onSubmit = (values, { resetForm }) => {
    dispatch(addNotice(values));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, setValues, values, errors, touched }) => {
        return (
          <Form className="space-y-5">
            <div className="md:grid md:grid-cols-3 w-full gap-6 space-y-5 md:space-y-0">
              <Select
                name={"propertyId"}
                required={true}
                label={"Select Property"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  ...propertyOptions,
                ]}
                className={"w-full border px-2 py-2.5"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Subject Line"}
                placeholder={"Subject"}
                name={"subject"}
                className={"py-2 px-2"}
              />
              <Datepicker
                parentClassName={"w-full px-0 py-0"}
                label={"Notice Duration (Optional)"}
                name={"date"}
                className={"py-2 px-2 border w-full bg-white"}
                minDate={new Date()}
                value={values.date}
                onChange={(e) => {
                  const date = formatDate(e);
                  setFieldValue("date", date);
                }}
                setFieldValue={setFieldValue}
                touched={touched.date}
                errors={errors.date}
              />
            </div>
            <div>
              <TextArea
                required={true}
                label={"Message"}
                placeholder={"Message"}
                row={5}
                className={" bg-white"}
                name={"msg"}
              />
            </div>
            <Button type={"submit"}>Submit Request</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
