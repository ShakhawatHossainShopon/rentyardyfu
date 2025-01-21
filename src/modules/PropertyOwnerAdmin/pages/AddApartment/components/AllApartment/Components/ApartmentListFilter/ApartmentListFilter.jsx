import { Button, Input, Select } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getAllApartment } from "@/services/apartment/apartment";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

const initialValues = {
  propertyId: "",
  unit_number: "",
  availability: "",
  sort: "desc",
};

export const ApartmentListFilter = ({ loading, data, properties }) => {
  const [options, setOptions] = useState([]);
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(getAllApartment(values));
  };
  useEffect(() => {
    const temp = () => {
      if (!loading) {
        setOptions([
          {
            label: "Select One",
            value: "",
          },
          ...properties
            .filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.property_name === item.property_name &&
                    t.propertyId === item.propertyId
                )
            )
            .map((item) => ({
              label: item.property_name,
              value: item.propertyId,
            })),
        ]);
      }
    };
    temp();
  }, [loading, data]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue }) => {
        return (
          <Form className="w-full space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"propertyId"}
                label={"Property Name"}
                options={options}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
                onChange={(e) => {
                  setFieldValue("propertyId", Number(e.target.value));
                }}
              />
              <Input
                label={"Search Apartment"}
                placeholder={"Search by Unit Number"}
                type={"number"}
                name={"unit_number"}
                className={"py-2 px-2"}
                onChange={(e) => {
                  setFieldValue("unit_number", Number(e.target.value));
                }}
              />
              <Select
                name={"availability"}
                label={"Availability"}
                options={[
                  {
                    label: "Select One",
                    value: "",
                  },
                  {
                    label: "Vacant",
                    value: "Vacant",
                  },
                  {
                    label: "Move out This Month",
                    value: "Move out This Month",
                  },
                  {
                    label: "Move out Next Month",
                    value: "Move out Next Month",
                  },
                ]}
                className={"w-full px-2"}
                parentClassName={"w-full px-0 py-0"}
                onChange={(e) => {
                  setFieldValue("availability", e.target.value);
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
            <div className="w-full text-end">
              <Button type={"submit"}>Search</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
