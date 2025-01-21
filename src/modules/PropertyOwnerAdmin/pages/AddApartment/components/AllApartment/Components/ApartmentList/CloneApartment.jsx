import { Button, Input, Select, TextArea } from "@/components";
import { useAppDispatch } from "@/hooks";
import { cloneApartment } from "@/services/apartment/apartment";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  propertyId: "",
  type: "",
  total_units: "",
  unit_numbers: "",
};

const validationSchema = Yup.object().shape({
  propertyId: Yup.string().required("Required!"),
  type: Yup.string().required("Required!"),
  total_units: Yup.number()
    .required("Required!")
    .integer("Total units must be an integer")
    .min(1, "Total units must be at least 1"),
  unit_numbers: Yup.string()
    .required("Required!")
    .matches(/^[a-zA-Z0-9,]+$/, "Only numbers and commas are allowed!")
    .test(
      "match-total-units",
      "The number of unit numbers must match the total units",
      function (value) {
        const { total_units } = this.parent;
        if (!total_units || !value) return false;

        const unitArray = value.split(",").filter(Boolean);

        // Check if there are duplicate unit numbers
        const uniqueUnits = new Set(unitArray);
        if (uniqueUnits.size !== unitArray.length) {
          return this.createError({
            message: "Unit numbers must be unique!",
          });
        }

        return unitArray.length === Number(total_units);
      }
    ),
});

const CloneApartment = ({ propertyOptions, apartmentId, closeModal }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      cloneApartment({
        ...values,
        propertyId: Number(values.propertyId),
        apartmentId: apartmentId,
      })
    );
    closeModal();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className="pb-6 space-y-5">
            <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
              <Select
                name={"propertyId"}
                required={true}
                label={"Select Property"}
                options={[
                  {
                    label: "Select Property",
                    value: "",
                  },
                  ...propertyOptions,
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Select
                name={"type"}
                required={true}
                label={"Unit Type"}
                options={[
                  {
                    label: "Select Unit Type",
                    value: "",
                  },
                  {
                    label: "Apt",
                    value: "Apt",
                  },
                  {
                    label: "Flat",
                    value: "Flat",
                  },
                  {
                    label: "House",
                    value: "House",
                  },
                  {
                    label: "Condo",
                    value: "Condo",
                  },
                  {
                    label: "Town House",
                    value: "Town House",
                  },
                  {
                    label: "Duplexes",
                    value: "Duplexes",
                  },
                ]}
                className={"w-full px-2 py-2"}
                parentClassName={"w-full px-0 py-0"}
              />
              <Input
                required={true}
                label={"Total Units"}
                placeholder={"4"}
                type={"number"}
                name={"total_units"}
                className={"py-2 px-2"}
              />
            </div>
            <div>
              <TextArea
                label={"Unit Numbers separate by comma (,)"}
                name={"unit_numbers"}
                placeholder={"10,101,2020,2010"}
                required={true}
                row={4}
                className={"uppercase bg-white dark:bg-darkMode"}
                onKeyDown={(e) => {
                  if (!/[a-zA-Z0-9,]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
              {touched.unit_numbers && errors.unit_numbers && (
                <div>
                  <p className="text-red-500">{errors.unit_numbers}</p>
                </div>
              )}
            </div>
            <Button type={"submit"}>Submit</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CloneApartment;
