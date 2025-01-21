import { useAppDispatch, useGetUserSelector, useLoginSelector } from "@/hooks";
import { addTour } from "@/services/tour/tour";
import { formatDate, Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Select } from "../ui";
import { Datepicker } from "../ui/Datepicker/Datepicker";
import { Button } from "./../ui/Button/Button";
const initialValues = {
  type: "",
  date: "",
  time: "",
};
const validationSchema = Yup.object({
  type: Yup.string().required("Required!"),
  date: Yup.string().required("Required!"),
  time: Yup.string().required("Required!"),
});
export const BookTour = ({
  zip,
  tours,
  tourPropertyIds,
  office_working_days,
  tour_accept_hours,
  working_hours,
  onClose,
  name,
  address,
  location,
  city,
  state,
  country,
  unit_number,
  type,
  apartmentId,
  propertyId,
}) => {
  const [tourTime, setTourTime] = useState([]);
  const [options, setOptions] = useState([]);
  const res = useLoginSelector();
  const { data } = useGetUserSelector();
  const dispatch = useAppDispatch();
  const isSameDate = (date1, date2) => {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  };
  const checkTourDateAndTime = (date) => {
    const dateTime = new Set(
      tours
        .filter((item) => {
          const date1 = new Date(item.date);
          const date2 = new Date(date);
          if (isSameDate(date1, date2)) {
            return item;
          }
        })
        .map((item) => item.time)
    );
    setTourTime(
      tour_accept_hours.filter((item) => {
        return !dateTime.has(item);
      })
    );
  };
  const isTourExistForThisUserInThisProperty =
    tourPropertyIds && tourPropertyIds.length === 0
      ? [false]
      : tourPropertyIds &&
        tourPropertyIds.map((item) => {
          if (item === propertyId) {
            return item;
          }
          return false;
        });
  const onSubmit = (values) => {
    onClose();
    dispatch(
      addTour({ ...values, apartmentId: apartmentId, propertyId: propertyId })
    );
  };
  useEffect(() => {
    if (tourTime.length > 0) {
      setOptions([
        {
          label: "Select One",
          value: "",
        },
        ...tourTime.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      ]);
    }
  }, [tourTime]);
  return (
    <>
      {res.isRenter ? (
        data && data.profile_completion >= 80 ? (
          tour_accept_hours.length > 0 ? (
            isTourExistForThisUserInThisProperty[0] === false ? (
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, values, touched, errors }) => {
                  return (
                    <Form className="pb-4 pt-1 darkText">
                      <div>
                        <h2 className="md:text-2xl text-lg font-semibold">
                          {name}
                        </h2>
                        <div className="flex justify-start items-start space-x-2 md:text-base text-sm md:py-5 py-2">
                          <p className="pt-1">
                            <Icons.Location className="text-blue-700" />{" "}
                          </p>
                          <p className="flex flex-col items-start justify-center">
                            <span className=""> {location},</span>
                            <span className="">
                              {city} {state} {zip}, {country}
                            </span>
                          </p>
                        </div>
                        <p className="md:text-base text-sm">
                          <span className="font-semibold">Unit: </span>
                          {unit_number}({type})
                        </p>
                      </div>
                      <div className="mt-5 border border-yellow-800 p-2 md:text-base text-xs dark:bg-[#360000] darkText">
                        Note: Please Select a date from our working days (
                        {office_working_days.map((item) => (
                          <span> {item}, </span>
                        ))}
                        )
                      </div>
                      <div className="pt-7 md:flex gap-4 lg:gap-10 items-center md:space-y-0 space-y-4 w-full">
                        <Select
                          required={true}
                          className={"px-2"}
                          parentClassName={"w-full md:px-2 px-0"}
                          label={"Tour Type"}
                          options={[
                            {
                              label: "Select One",
                              value: "",
                            },
                            {
                              label: "Physical/On-site Tour",
                              value: "Physical/On-site Tour",
                            },
                            {
                              label: "Online Video Tour",
                              value: "Online Video Tour",
                            },
                          ]}
                          name={"type"}
                        />
                        <Datepicker
                          required={true}
                          parentClassName={
                            "w-full px-0 py-0 dark:bg-dark-light"
                          }
                          label={"Tour Day"}
                          name={"date"}
                          className={"px-2 border w-full bg-white"}
                          value={values.date}
                          onChange={(e) => {
                            const date = formatDate(e);
                            setFieldValue("date", date);
                            checkTourDateAndTime(date);
                          }}
                          setFieldValue={setFieldValue}
                          touched={touched.date}
                          errors={errors.date}
                          minDate={new Date()}
                        />
                        <Select
                          required={true}
                          disabled={options.length === 0 ? true : false}
                          className={"px-2"}
                          parentClassName={"w-full md:px-2 px-0"}
                          label={"Available Tour Time"}
                          name={"time"}
                          id={"time"}
                          options={
                            options.length > 0
                              ? options
                              : [
                                  {
                                    label: "Select One",
                                    value: "",
                                  },
                                ]
                          }
                        />
                      </div>
                      <Button
                        className="mt-9 md:ml-2 bg-cyan-600 hover:bg-cyan-700 px-7"
                        type={"Submit"}
                      >
                        Book Tour
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
                You have Already Applied for a Tour in this Property.
              </div>
            )
          ) : (
            <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
              No Tour Available for this Apartment.
            </div>
          )
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
            Please complete your profile first.
          </div>
        )
      ) : (
        <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
          Please Login First.
        </div>
      )}
    </>
  );
};
