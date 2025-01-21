import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getAllProperty } from "@/services/property/property";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

const initialValues = {
  country: "",
  city: "",
  name: "",
  sort: "desc",
};

export const PropertyFilter = ({ loading, cities, countries }) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const dispatch = useAppDispatch();

  const onSubmit = (values) => {
    dispatch(getAllProperty(values));
  };
  useEffect(() => {
    const temp = () => {
      if (!loading) {
        setCityOptions([
          {
            label: "Select Country",
            value: "",
          },
          ...cities.map((item) => {
            return {
              label: item,
              value: item,
            };
          }),
        ]);
        setCountryOptions([
          {
            label: "Select City",
            value: "",
          },
          ...countries.map((item) => {
            return {
              label: item,
              value: item,
            };
          }),
        ]);
      }
    };
    temp();
  }, [loading]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue }) => {
        return (
          <Form className="w-full space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                label={"Select Country"}
                name={"country"}
                options={countryOptions}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
                onChange={(e) => {
                  setFieldValue("country", e.target.value);
                }}
              />
              <Select
                label={"City"}
                name={"city"}
                options={cityOptions}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
                onChange={(e) => {
                  setFieldValue("city", e.target.value);
                }}
              />
              <Input
                name={"name"}
                label={"Search"}
                placeholder={"Search here"}
                className={"px-2 py-2"}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
              />
              <Select
                name={"sort"}
                label={"Sort By"}
                options={[
                  {
                    label: "Newest First",
                    value: "desc",
                  },
                  {
                    label: "Oldest First",
                    value: "asc",
                  },
                ]}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
                onChange={(e) => {
                  setFieldValue("sort", e.target.value);
                }}
              />
            </div>
            <div className="w-full md:text-end">
              <Button type={"submit"}>Search</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
