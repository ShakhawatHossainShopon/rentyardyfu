import { Button, RadioButton } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addUser } from "@/services/user/user";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { ForeignForm } from "./ForeignForm";
const initialValues = {
  living_country: "I am in My Country",
  destination_country: "",
  moving_reason: "",
  estimate_arrival_date: "",
  passport_bio_page: "",
  study_work_proof: "",
};
const validationSchema = Yup.object({
  living_country: Yup.string().required("Required!"),
  destination_country: Yup.string().test(
    "destination_country-required-if-true",
    "Required!",
    function (value) {
      const { living_country } = this.parent;
      if (living_country !== "I am in My Country") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  moving_reason: Yup.string().test(
    "moving_reason-required-if-true",
    "Required!",
    function (value) {
      const { living_country } = this.parent;
      if (living_country !== "I am in My Country") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  estimate_arrival_date: Yup.string().test(
    "estimate_arrival_date-required-if-true",
    "Required!",
    function (value) {
      const { living_country } = this.parent;
      if (living_country !== "I am in My Country") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  passport_bio_page: Yup.string().test(
    "passport_bio_page-required-if-true",
    "Required!",
    function (value) {
      const { living_country } = this.parent;
      if (living_country !== "I am in My Country") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
  study_work_proof: Yup.string().test(
    "study_work_proof-required-if-true",
    "Required!",
    function (value) {
      const { living_country } = this.parent;
      if (living_country !== "I am in My Country") {
        return !!value; // Return true if user_email has a value
      }
      return true; // Return true if not "Occupied"
    }
  ),
});
export const ForeignRental = ({ res }) => {
  const dispatch = useAppDispatch();
  const darkMode = useSelector((state) => state.darkMode.value);
  const {
    living_country,
    destination_country,
    moving_reason,
    estimate_arrival_date,
    passport_bio_page,
    study_work_proof,
  } = res;
  const onSubmit = (values) => {
    dispatch(addUser(values));
  };
  const [mapPreview, setMapPreview] = useState(null);
  const [mapPreview2, setMapPreview2] = useState(null);
  return (
    <div className="space-y-5">
      <Formik
        className=""
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, errors, touched, values, setValues }) => {
          useEffect(() => {
            setMapPreview(passport_bio_page && passport_bio_page);
            setMapPreview2(study_work_proof && study_work_proof);
            setValues({
              living_country: living_country
                ? living_country
                : "I am in My Country",
              destination_country,
              moving_reason,
              estimate_arrival_date,
              passport_bio_page: passport_bio_page && passport_bio_page.assetId,
              study_work_proof: study_work_proof && study_work_proof.assetId,
            });
          }, []);
          return (
            <Form className="space-y-3">
              <div className="md:flex gap-10 md:space-x-5 space-y-5 md:space-y-0 checkbox">
                <RadioButton
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("living_country", "I am in My Country");
                      setFieldValue("destination_country", "");
                      setFieldValue("moving_reason", "");
                      setFieldValue("estimate_arrival_date", "");
                      setFieldValue("passport_bio_page", "");
                      setFieldValue("study_work_proof", "");
                    }
                  }}
                  checked={
                    values.living_country === "I am in My Country"
                      ? true
                      : false
                  }
                  name={"type"}
                  label={"I am in My Country"}
                />
                <RadioButton
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue("living_country", "Planning for Abroad")
                      : null;
                  }}
                  checked={
                    values.living_country === "Planning for Abroad"
                      ? true
                      : false
                  }
                  name="type"
                  label="Planning for Abroad"
                />
                <RadioButton
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue("living_country", "Living in Abroad")
                      : null;
                  }}
                  checked={
                    values.living_country === "Living in Abroad" ? true : false
                  }
                  name="type"
                  label="Living in Abroad"
                />
              </div>
              {values.living_country === "I am in My Country" ? null : (
                <ForeignForm
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                  mapPreview={mapPreview}
                  mapPreview2={mapPreview2}
                  setMapPreview={setMapPreview}
                  setMapPreview2={setMapPreview2}
                  values={values}
                />
              )}
              <Button className={"md:text-sm text-xs"} type={"submit"}>
                Update Now
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
