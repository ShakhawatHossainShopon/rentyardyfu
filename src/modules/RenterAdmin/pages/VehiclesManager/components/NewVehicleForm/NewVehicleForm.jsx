import { Button, Input, Select } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { addVehicle } from "@/services/vehicle/vehicle";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { carCompanies } from "./data";

const initialValues = {
  year: "",
  company: "",
  model: "",
  plate: "",
  vin: "",
  color: "",
  owner: "",
  issuing_state: "",
  parkingId: "",
  paymentMethodId: "",
};

const validationSchema = Yup.object({
  year: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  model: Yup.string().required("Required!"),
  plate: Yup.string().required("Required!"),
  vin: Yup.string().required("Required!"),
  color: Yup.string().required("Required!"),
  owner: Yup.string().required("Required!"),
  issuing_state: Yup.string().required("Required!"),
});
const validationSchema2 = Yup.object({
  year: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  model: Yup.string().required("Required!"),
  plate: Yup.string().required("Required!"),
  vin: Yup.string().required("Required!"),
  color: Yup.string().required("Required!"),
  owner: Yup.string().required("Required!"),
  issuing_state: Yup.string().required("Required!"),
  parkingId: Yup.string(),
  paymentMethodId: Yup.string().when("parkingId", {
    is: (value) => value && value !== "",
    then: (schema) => schema.required("required!"), // Ensure `then` is a function
    otherwise: (schema) => schema, // Use schema directly for optional
  }),
});

export const NewVehicleForm = ({
  paymentMethodsState,
  parkingOptions,
  setParkingOptions,
  data,
}) => {
  const [proRatedRent, setProRatedRent] = useState();
  const [proratedText, setProratedText] = useState();
  const dispatch = useAppDispatch();
  const user = useGetUserSelector();
  const res = useGetUserSelector();

  const onSubmit = (values, { resetForm }) => {
    dispatch(addVehicle(values));
    resetForm();
  };

  return (
    <div className="md:p-4 space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Add New Vehicle</h2>
        <hr className="border-gray-200" />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={
          user?.data?.apartment?.status === "Resident"
            ? validationSchema2
            : validationSchema
        }
      >
        {({ setFieldValue, values, setValues, errors, touched }) => {
          useEffect(() => {
            if (user?.data?.apartment?.status === "Resident") {
              setValues({
                year: "",
                company: "",
                model: "",
                plate: "",
                vin: "",
                color: "",
                owner: "",
                issuing_state: "",
                parkingId: "",
                paymentMethodId: paymentMethodsState[0]?.value,
              });
            }
          }, []);

          return (
            <Form className="space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Year"}
                  placeholder={"2021"}
                  name={"year"}
                  className={"py-2 px-2"}
                  type={"number"}
                />
                <Select
                  name={"company"}
                  required={true}
                  label={"Making Company"}
                  options={carCompanies}
                  className={"w-full  px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Input
                  required={true}
                  label={"Model"}
                  placeholder={"BMW X5"}
                  name={"model"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Number Plate"}
                  placeholder={"ERS 8579"}
                  name={"plate"}
                  className={"py-2 px-2 uppercase"}
                />
                <Input
                  required={true}
                  label={"Number Plate Issuing State"}
                  placeholder={"Texas"}
                  name={"issuing_state"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"VIN Number"}
                  placeholder={"4Y1SL65848Z411439"}
                  name={"vin"}
                  className={"py-2 px-2 uppercase"}
                />
              </div>
              <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                <Select
                  name={"color"}
                  required={true}
                  label={"Color"}
                  options={[
                    {
                      label: "Select Color",
                      value: "",
                    },
                    {
                      label: "White",
                      value: "White",
                    },
                    {
                      label: "Gray",
                      value: "Gray",
                    },
                    {
                      label: "Black",
                      value: "Black",
                    },
                    {
                      label: "Silver",
                      value: "Silver",
                    },
                    {
                      label: "Blue",
                      value: "Blue",
                    },
                    {
                      label: "Red",
                      value: "Red",
                    },
                    {
                      label: "Green",
                      value: "Green",
                    },
                    {
                      label: "Brown",
                      value: "Brown",
                    },
                    {
                      label: "Orange",
                      value: "Orange",
                    },
                    {
                      label: "Yellow",
                      value: "Yellow",
                    },
                    {
                      label: "Gold",
                      value: "Gold",
                    },
                    {
                      label: "Purple",
                      value: "Purple",
                    },
                  ]}
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Select
                  required={true}
                  name={"owner"}
                  label={"Vehicle Owner"}
                  onChange={(e) => {
                    if (e.target.value === "Guest") {
                      setFieldValue("owner", e.target.value);
                      setFieldValue("parkingId", "");
                      setFieldValue("paymentMethodId", "");
                    } else {
                      setFieldValue("owner", e.target.value);
                    }
                  }}
                  options={
                    res?.data?.apartment?.status === "Resident" ||
                    res?.data?.apartment?.status === "Resident (Renewed)" ||
                    res?.data?.apartment?.status ===
                      "Resident (Move-Out Accepted)"
                      ? [
                          {
                            label: "Select Owner",
                            value: "",
                          },
                          {
                            label: "Resident/Myself",
                            value: "Resident",
                          },
                          {
                            label: "Guest",
                            value: "Guest",
                          },
                        ]
                      : [
                          {
                            label: "Select Owner",
                            value: "",
                          },
                          {
                            label: "Resident/Myself",
                            value: "Resident",
                          },
                        ]
                  }
                  className={"w-full px-2 py-2.5"}
                  parentClassName={"w-full px-0 py-0"}
                />
                {(res?.data?.apartment?.status === "Resident" ||
                  res?.data?.apartment?.status === "Resident (Renewed)" ||
                  res?.data?.apartment?.status ===
                    "Resident (Move-Out Accepted)") &&
                  values.owner === "Resident" && (
                    <Select
                      name={"parkingId"}
                      onChange={(e) => {
                        setFieldValue("parkingId", e.target.value);
                        const temp = data?.find((elem) => {
                          if (elem.parkingId == e.target.value) {
                            return elem;
                          }
                        });
                        setProRatedRent(temp.price_final_amount);
                        setProratedText(temp.price_prorated_text);
                      }}
                      disabled={parkingOptions.length === 0 ? true : false}
                      label={
                        parkingOptions.length === 0
                          ? "No Reserved Parking Available"
                          : "Available Reserved Parking (Optional)"
                      }
                      options={[
                        {
                          label: "Select Parking Spot",
                          value: "",
                        },
                        ...parkingOptions,
                      ]}
                      className={"w-full px-2 py-2.5"}
                      parentClassName={"w-full px-0 py-0"}
                    />
                  )}
              </div>
              {values.owner !== "Guest" && values.parkingId && (
                <div className="w-full md:grid md:grid-cols-3 md:gap-6 space-y-5 md:space-y-0">
                  {paymentMethodsState.length > 0 ? (
                    <div>
                      {proRatedRent && (
                        <label
                          className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*'] darkText`}
                        >
                          Pro-rated Fee:{" "}
                          <span className="text-red-600 dark:text-gray-100">
                            ${proRatedRent} {`(${proratedText})`} (With Card
                            Fee)
                          </span>
                        </label>
                      )}
                      <Select
                        required={true}
                        name={"paymentMethodId"}
                        options={[
                          {
                            label: "Select Card",
                            value: "",
                          },
                          ...paymentMethodsState,
                        ]}
                        className={"py-2 md:py-2.5 px-2"}
                        parentClassName={"w-full px-0 py-0"}
                      />
                    </div>
                  ) : (
                    <Link
                      to={"/renteradmin/payment"}
                      className="underline text-blue-600"
                    >
                      {" "}
                      Add Payment Card{" "}
                    </Link>
                  )}
                </div>
              )}
              <Button type={"submit"}>Add Vehicle</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
