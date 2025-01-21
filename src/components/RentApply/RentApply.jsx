import { useAppDispatch, useGetUserSelector, useLoginSelector } from "@/hooks";
import { addApplication } from "@/services/application/application";
import { formatDate, Icons } from "@/utils";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CheckboxButton, Datepicker, Select } from "../ui";

const initialValues = {
  move_in_date: "",
  lease_term: "",
};

const validationSchema = Yup.object({
  move_in_date: Yup.string().required("Required!"),
  lease_term: Yup.string().required("Required!"),
});

export const RentApply = ({
  available_date,
  location,
  zip,
  document,
  discount_amount,
  discount_name,
  pendingApartmentIds,
  residentApartmentIds,
  pendingApplication,
  residentApplication,
  fee,
  options,
  name,
  address,
  city,
  state,
  country,
  unit_number,
  type,
  apartmentId,
  propertyId,
  onClose,
}) => {
  const isUserResident =
    residentApartmentIds && residentApartmentIds.length === 0
      ? [false]
      : residentApartmentIds &&
        residentApartmentIds.map((item) => {
          if (item === apartmentId) {
            return item;
          }
          return false;
        });

  const isUserApplied =
    pendingApartmentIds && pendingApartmentIds.length === 0
      ? [false]
      : pendingApartmentIds &&
        pendingApartmentIds.map((item) => {
          if (item === apartmentId) {
            return item;
          }
          return false;
        });

  const res = useLoginSelector();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const { data } = useGetUserSelector();
  const [isChecked, setIsChecked] = useState(false);
  const convertedOptions = [
    { value: "", label: "Select One" },
    ...options.map((option) => {
      return {
        value: option.lease_term,
        label: `${option.lease_term}`,
      };
    }),
  ];

  const onSubmit = async (values) => {
    // onClose();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a token using Stripe's API
      const { token, error } = await stripe.createToken(cardElement);

      if (token) {
        dispatch(
          addApplication({
            ...values,
            apartmentId: apartmentId,
            propertyId: propertyId,
            token: token.id,
          })
        );
        onClose();
      }

      if (error) {
        toast.error(error.message);
        return;
      }

      // Send the token to your backend
      // await axios.post("/your-backend-endpoint", {
      // token: token.id,
      // Optionally include other details like the cardholder name if needed
      // });

      // Handle successful submission
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {res.isRenter ? (
        data && data.profile_completion >= 80 ? (
          isUserApplied[0] === false ? (
            isUserResident[0] === false ? (
              <div className="flex flex-col-reverse xl:flex-row justify-center items-start xl:space-x-5 w-full pb-6">
                <Formik
                  className={"flex-1"}
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {({ setFieldValue, values, touched, errors, setValues }) => {
                    useEffect(() => {
                      setValues({
                        move_in_date: available_date,
                      });
                    }, []);
                    return (
                      <Form className="space-y-5 md:px-0 px-2 pt-6 xl:pt-0 darkText">
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

                        {discount_name && (
                          <p className="my-4 w-fit border border-yellow-700 p-2 dark:bg-[#360000]">
                            {discount_name} - ${discount_amount}
                          </p>
                        )}
                        <div className="flex flex-col justify-center w-full space-y-3">
                          <Datepicker
                            required={true}
                            parentClassName={
                              "w-full px-2 py-0 dark:bg-dark-light"
                            }
                            label={"Move-In Date"}
                            name={"move_in_date"}
                            className={"py-2 px-2 border w-full bg-white"}
                            value={values.move_in_date}
                            onChange={(e) => {
                              const date = formatDate(e);
                              setFieldValue("move_in_date", date);
                            }}
                            setFieldValue={setFieldValue}
                            touched={touched.move_in_date}
                            errors={errors.move_in_date}
                            minDate={
                              available_date
                                ? new Date(available_date)
                                : new Date()
                            }
                          />
                          <Select
                            name={"lease_term"}
                            className="px-2"
                            label={"Select Lease Term"}
                            options={convertedOptions}
                            parentClassName={"w-full"}
                          />
                          <div className="mx-2">
                            <label
                              className={`block mb-2 md:text-sm text-xs font-medium text-gray-900 xl:min-w-max "after:content-['*'] darkText`}
                            >
                              You Will Be Charged{" "}
                              <span className="text-red-600">
                                ${fee?.data?.final_amount}
                              </span>
                              . Now, Enter Card Details
                            </label>
                            <CardElement className="border border-blue-500 py-2.5 px-2 dark:bg-gray-200" />
                          </div>
                        </div>
                        <div>
                          <CheckboxButton
                            type="checkbox"
                            id="agreement"
                            checked={isChecked}
                            label={
                              "  Give Permission to check background. Accept Terms & Condition"
                            }
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className={"w-9 sm:w-5"}
                          />
                        </div>

                        <Button
                          className={`px-7 xl:mx-0 mx-2 ${
                            isChecked
                              ? ""
                              : "bg-gray-400 cursor-not-allowed hover:bg-gray-400 dark:bg-blue-900 dark:hover:bg-blue-900"
                          }`}
                          type={"Submit"}
                          disabled={!isChecked}
                        >
                          Apply for Rent
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
                <div className="flex-1 xl:space-y-5 space-y-3 px-4 md:px-0 darkText">
                  <h3 className="underline md:text-xl text-base">
                    Rental Requirement
                  </h3>
                  <ul className="list-disc px-4 md:text-base text-sm">
                    {document.map((item, index) => {
                      return (
                        <li key={index}>
                          {item.type}: {item.name}
                        </li>
                      );
                    })}
                    {/* <li>Income must be ${rent * 2.5}+ </li> */}
                  </ul>
                  <div>
                    <p className="md:text-base text-sm">
                      Application Fee - $
                      {fee.data.applicant_fee && fee.data.applicant_fee}
                    </p>

                    {fee.data.total_co_applicants > 0 && (
                      <p className="md:text-base text-sm">
                        Co-Applicant Fee - $
                        {fee.data.co_applicant_fee &&
                          fee.data.total_co_applicants &&
                          fee.data.co_applicant_fee *
                            fee.data.total_co_applicants}
                      </p>
                    )}
                    {fee.data.total_dependents > 0 && (
                      <p className="md:text-base text-sm">
                        Dependent Fee (18/18+) - $
                        {fee.data.dependent_fee &&
                          fee.data.total_dependents &&
                          fee.data.dependent_fee * fee.data.total_dependents}
                      </p>
                    )}
                    {fee?.data?.fee > 0 && (
                      <p className="md:text-base text-sm">
                        Card Fee - ${fee?.data?.fee}
                      </p>
                    )}

                    <p className="md:text-base text-sm">
                      App Processing Fee - $1.99{" "}
                    </p>
                    <hr className="my-1" />
                    <p className="xl:text-xl md:text-base text-sm font-semibold">
                      Total Fee - ${fee?.data?.final_amount}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
                You are Already a Resident of this Apartment.
              </div>
            )
          ) : (
            <div className="w-full h-[40vh] flex justify-center items-center text-lg font-semibold darkText">
              You have Already Applied for this Apartment.
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
