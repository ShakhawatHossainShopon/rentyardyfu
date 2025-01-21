import { Button, Datepicker, Input, Select } from "@/components";
import { useAppDispatch, useSearchSelector } from "@/hooks";
import { getPropertyPublicView } from "@/services/property/property";
import { formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const initialValues = {
  query: "",
  bed: "",
  bath: "",
  price: "",
  offer: "",
  date: "",
};
export const AllFilters = () => {
  const dispatch = useAppDispatch();
  const { query, bed, bath, price, offer, date } = useSearchSelector();
  const onSubmit = (values) => {
    dispatch(getPropertyPublicView(values));
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values, resetForm, setValues }) => {
          useEffect(() => {
            setValues({ query, bed, bath, price, offer, date });
            dispatch(getPropertyPublicView({ query, bed, bath, offer, date }));
          }, [dispatch]);
          return (
            <Form className="grid grid-cols-1 xl:grid-cols-6 gap-3 border-2 border-none w-full pt-5">
              <Input
                name={"query"}
                label={"Search"}
                placeholder={"Search by University/School or City"}
                className={
                  "border-0 bg-secondary-color py-2 md:py-3 px-2 md:rounded-lg rounded  text-xs text-gray-600"
                }
                parentClassName={"xl:col-span-2 px-2 md:px-0 place-self-end"}
              />
              <Datepicker
                label={"Move in Date"}
                onChange={(e) => {
                  const date = formatDate(e);
                  setFieldValue("date", date);
                }}
                setFieldValue={setFieldValue}
                name={"date"}
                value={values.date}
                className={
                  "border-0 bg-secondary-color py-2 md:py-3 px-2 md:px-2 md:rounded-lg rounded text-xs"
                }
                parentClassName={"py-0 md:py-0 col-span-1 px-2 md:px-0"}
                minDate={new Date()}
              />
              <Select
                name={"bed"}
                label={"Beds"}
                options={[
                  { value: "", label: "Select" },
                  { value: "Studio", label: "Studio" },
                  { value: "1 Bed", label: "1 Bed" },
                  { value: "2 Beds", label: "2 Beds" },
                  { value: "3 Beds", label: "3 Beds" },
                  { value: "4 Beds", label: "4 Beds" },
                  { value: "5 Beds", label: "5 Beds" },
                ]}
                className={
                  "border-0 bg-secondary-color py-2 md:py-3 px-2 md:px-2 md:rounded-lg rounded  text-xs text-gray-600"
                }
                parentClassName={"px-2 md:px-0 py-0 md:py-0"}
              />
              <Select
                name={"bath"}
                label={"Baths"}
                options={[
                  { value: "", label: "Select" },
                  { value: "1 Bath", label: "1 Bath" },
                  { value: "1.5 Baths", label: "1.5 Baths" },
                  { value: "2 Baths", label: "2 Baths" },
                  { value: "2.5 Baths", label: "2.5 Baths" },
                  { value: "3 Baths", label: "3 Baths" },
                  { value: "3.5 Baths", label: "3.5 Baths" },
                  { value: "4 Baths", label: "4 Baths" },
                  { value: "4.5 Baths", label: "4.5 Baths" },
                  { value: "5 Baths", label: "5 Baths" },
                  { value: "5.5 Baths", label: "5.5 Baths" },
                ]}
                className={
                  "border-0 bg-secondary-color py-2 md:py-3 px-2 md:px-2 md:rounded-lg rounded  text-xs text-gray-600"
                }
                parentClassName={"px-2 md:px-0 py-0 md:py-0"}
              />
              <div className="flex items-center justify-center w-full gap-3 pt-7 col-span-1 px-2 md:px-0">
                <Button
                  className={
                    "bg-primary-color text-base font-semibold py-2 md:py-2.5 px-6 rounded  text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg dark:bg-blue-900 dark:hover:bg-blue-800 w-full"
                  }
                >
                  Search
                </Button>
                <Button
                  className={
                    "bg-red-500 text-base font-semibold py-2 md:py-2.5 px-6 rounded  text-white transition-all duration-300 hover:bg-red-800 hover:shadow-lg dark:bg-red-900 dark:hover:bg-red-800 w-full"
                  }
                  type="button"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <p className="mt-5">
        Can't find your University?{" "}
        <Link
          className="underline text-blue-500 underline-offset-2"
          to={"/contact"}
        >
          Contact Us.
        </Link>{" "}
      </p>
    </div>
  );
};
