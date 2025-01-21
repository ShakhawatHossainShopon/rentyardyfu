import {
  setBath,
  setBed,
  setDate,
  setPrice,
  setQuery,
} from "@/features/search/searchSlice/searchSlice";
import { useAppDispatch } from "@/hooks";
import { cn, formatDate } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../Searchbar";
import { Datepicker, Select } from "../ui";

// Define the initial values for Formik
const initialValues = {
  query: "",
  bed: "",
  bath: "",
  price: "",
  date: "",
};

export const Filters = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBed(""));
    dispatch(setBath(""));
    dispatch(setPrice(""));
    dispatch(setQuery(""));
    dispatch(setDate(""));
  }, []);

  const onSubmit = (values) => {
    navigate("/search");
  };
  return (
    <div className="w-full flex flex-col items-center justify-start space-y-2">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form className={cn(`w-full flex`, className)}>
            <div className="md:flex md:w-1/2 w-full px-4 md:px-0 flex-1 justify-start items-center md:space-y-0 space-y-3  md:space-x-3 space-x-0">
              <Datepicker
                label={"Move in Search"}
                parentClassName={"w-full px-2 py-1 md:rounded-none rounded-md"}
                className={"border-none"}
                onChange={(e) => {
                  const date = formatDate(e);
                  setFieldValue("date", date);
                  dispatch(setDate(date));
                }}
                setFieldValue={setFieldValue}
                name={"date"}
                value={values.date}
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
                className="min-w-max border-none py-2"
                parentClassName="bg-white md:rounded-none rounded-md"
                onChange={(e) => {
                  setFieldValue("bed", e.target.value);
                  dispatch(setBed(e.target.value));
                }}
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
                className="min-w-max border-none py-2"
                parentClassName="bg-white md:rounded-none rounded-md"
                onChange={(e) => {
                  setFieldValue("bath", e.target.value);
                  dispatch(setBath(e.target.value));
                }}
              />
              <Select
                name={"price"}
                label={"Price"}
                options={[
                  { value: "", label: "Select" },
                  { value: 600, label: "<600" },
                  { value: 1000, label: "<1000" },
                  { value: 1500, label: "<1500" },
                  { value: 2000, label: "<2000" },
                  { value: 3000, label: "<3000" },
                  { value: 4000, label: "<4000" },
                  { value: 5000, label: "<5000" },
                ]}
                className="min-w-max border-none py-2"
                parentClassName="bg-white md:rounded-none rounded-md"
                onChange={(e) => {
                  setFieldValue("price", e.target.value);
                  dispatch(setPrice(e.target.value));
                }}
              />
            </div>
            <div className="md:w-1/2 w-full px-4 md:px-0 flex-1">
              <Searchbar
                query={"query"}
                className="w-full"
                isShowButton={true}
                onChange={(e) => {
                  setFieldValue("query", e.target.value);
                  dispatch(setQuery(e.target.value));
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
