import { Button, Input, PhoneInput } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addPoUser } from "@/services/user/user";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
const initialValues = {
  company_name: "",
  company_address: "",
  company_url: "",
  company_phone_number: "",
  company_email: "",
};
const validationSchema = Yup.object({
  company_name: Yup.string().required("Required!"),
  company_address: Yup.string().required("Required!"),
  company_url: Yup.string().required("Required!"),
  company_phone_number: Yup.string().required("Required!"),
  company_email: Yup.string().required("Required!"),
});
export const Company = ({ res }) => {
  const dispatch = useAppDispatch();

  const {
    company_name,
    company_address,
    company_url,
    company_phone_number,
    company_email,
  } = res;

  const onSubmit = (values) => {
    dispatch(addPoUser(values));
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, touched, values, setValues }) => {
        useEffect(() => {
          setValues({
            company_name,
            company_address,
            company_url,
            company_phone_number,
            company_email,
          });
        }, [dispatch]);
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center space-y-5 md:space-y-0 md:space-x-6">
              <Input
                required={true}
                // disabled={disable.name ? true : false}
                label={"Company Name"}
                placeholder={"Google Inc."}
                name={"company_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Company Address"}
                // disabled={disable.company_address ? true : false}
                placeholder={"2612 Southwest Parkway"}
                name={"company_address"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Company Email"}
                // disabled={disable.company_email ? true : false}
                placeholder={"name@email.com"}
                name={"company_email"}
                type={"email"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:grid md:grid-cols-3 gap-6 space-y-4 md:space-y-0">
              <Input
                required={true}
                label={"company_url"}
                // disabled={disable.company_url ? true : false}
                placeholder={"https://www.google.com"}
                name={"company_url"}
                className={"py-2 px-2"}
                type={"url"}
              />
              <PhoneInput
                required={true}
                label={"Contact Number"}
                placeholder={"234345983"}
                names={"company_phone_number"}
                className={"py-2 px-2"}
                type={"tel"}
                errors={errors.company_phone_number}
                touched={touched.company_phone_number}
                setFieldValue={setFieldValue}
                value={values.company_phone_number}
              />
            </div>
            <Button className={"md:text-sm text-xs"} type={"submit"}>
              Save Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
