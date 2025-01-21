import { Button, CheckboxButton, Input, PhoneInput } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addUser } from "@/services/user/user";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const initialValues = {
  present_address: "",
  building_name: "",
  manager_owner_name: "",
  manager_owner_number: "",
  permanent_address: "",
};
const validationSchema = Yup.object({
  present_address: Yup.string().required("Required!"),
  building_name: Yup.string().required("Required!"),
  manager_owner_name: Yup.string().required("Required!"),
  manager_owner_number: Yup.string().required("Required!"),
  permanent_address: Yup.string().required("Required!"),
});
export const Address = ({ res }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(addUser(values));
  };
  const {
    present_address,
    building_name,
    manager_owner_name,
    manager_owner_number,
    permanent_address,
  } = res;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors, setValues, values }) => {
        useEffect(() => {
          setValues({
            present_address,
            building_name,
            manager_owner_name,
            manager_owner_number,
            permanent_address,
          });
        }, []);
        return (
          <Form className="space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                required={true}
                label={"Present Address"}
                placeholder={"2994 Pinewood Avenue"}
                name={"present_address"}
                className={"py-2 px-2"}
              />
            </div>
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Input
                required={true}
                label={"Property/House Name"}
                placeholder={"RentYard Village"}
                name={"building_name"}
                className={"py-2 px-2"}
              />
              <Input
                required={true}
                label={"Property Manager/Owner Name"}
                placeholder={"John Doe"}
                name={"manager_owner_name"}
                className={"py-2 px-2"}
              />
              <PhoneInput
                required={true}
                label={"Property Manager/Owner Contact Number"}
                placeholder={"234345983"}
                names={"manager_owner_number"}
                className={"py-2 px-2"}
                type={"tel"}
                setFieldValue={setFieldValue}
                errors={errors.manager_owner_number}
                touched={touched.manager_owner_number}
                value={values.manager_owner_number}
              />
            </div>
            <div className="w-full md:flex flex-col justify-center items-start space-y-5 md:space-y-0 checkbox">
              <CheckboxButton
                onChange={(e) => {
                  if (e.target.checked) {
                    setFieldValue("permanent_address", values.present_address);
                    setChecked(true);
                  } else {
                    setFieldValue("permanent_address", "");
                    setChecked(false);
                  }
                }}
                label="Same as present address"
                parentClassName={"py-5"}
              />
              <Input
                disabled={checked ? true : false}
                required={true}
                label={"Permanent Address"}
                placeholder={"4315 Ocala Street, Florida"}
                name={"permanent_address"}
                className={"py-2 px-2 mt-2"}
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
