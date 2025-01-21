import { Button, RadioButton, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addUser } from "@/services/user/user";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
const initialValues = {
  crime_comitted: false,
  crime_type: "",
  jail_served: "",
};
const validationSchema = Yup.object({
  crime_comitted: Yup.boolean().required("Required!"),
  crime_type: Yup.string().test(
    "crime_type-required-if-true",
    "Required!",
    function (value) {
      const { crime_comitted } = this.parent;
      if (crime_comitted === true) {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  jail_served: Yup.string().test(
    "jail_served-required-if-true",
    "Required!",
    function (value) {
      const { crime_comitted } = this.parent;
      if (crime_comitted === true) {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
});
export const CrimeRecords = ({ res }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      addUser({
        ...values,
        jail_served: values.jail_served === "Yes" ? true : false,
      })
    );
  };
  const { crime_comitted, crime_type, jail_served } = res;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, setValues, values, touched, errors }) => {
        useEffect(() => {
          setValues({
            crime_comitted: crime_comitted === true ? crime_comitted : false,
            crime_type,
            jail_served: () => {
              if (jail_served === true) {
                return "Yes";
              } else if (jail_served === false) {
                return "No";
              } else {
                return "";
              }
            },
          });
        }, []);
        return (
          <Form className="flex flex-col justify-start items-start space-y-6 checkbox">
            <div>
              <p className="font-medium dark:text-gray-300 pb-4">
                Have you ever convicted of a crime?{" "}
              </p>
              <div className="flex gap-10">
                <RadioButton
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("crime_comitted", false);
                      setFieldValue("crime_type", "");
                      setFieldValue("jail_served", "");
                    }
                  }}
                  checked={
                    values.crime_comitted === false ||
                    values.crime_comitted === null
                      ? true
                      : false
                  }
                  name="crime_comitted"
                  label="No"
                  color="blue"
                />
                <RadioButton
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue("crime_comitted", true)
                      : null;
                  }}
                  checked={values.crime_comitted === true ? true : false}
                  name="crime_comitted"
                  label="Yes"
                />
              </div>
            </div>
            {values.crime_comitted === true && (
              <div className="md:flex justify-start items-center md:space-x-6 space-y-5 md:space-y-0 w-full">
                <Select
                  name={"crime_type"}
                  required={"true"}
                  label={"Crime Type"}
                  options={[
                    {
                      label: "Select Crime Type",
                      value: "",
                    },
                    {
                      label: "Sexual Crime",
                      value: "Sexual Crime",
                    },
                    {
                      label: "Kidnapping",
                      value: "Kidnapping",
                    },
                    {
                      label: "Homicide",
                      value: "Homicide",
                    },
                    {
                      label: "Burglary",
                      value: "Burglary",
                    },
                    {
                      label: "Drug Crimes",
                      value: "Drug Crimes",
                    },
                    {
                      label: "Others",
                      value: "Others",
                    },
                  ]}
                  className={"w-full px-2 py-2"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Select
                  name={"jail_served"}
                  required={true}
                  label={"Have you ever been in jail?"}
                  options={[
                    {
                      label: "Select One",
                      value: "",
                    },
                    {
                      label: "Yes",
                      value: "Yes",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ]}
                  className={"w-full px-2 py-2"}
                  parentClassName={"w-full px-0 py-0"}
                />
              </div>
            )}
            <Button className={"md:text-sm text-xs"} type={"submit"}>
              Update Now
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
