import { Button, Select } from "@/components";
import { useAppDispatch, useGetPropertyListNameIdSelector } from "@/hooks";
import { getPropertyListNameId } from "@/services/property/property";
import { getSubsPricing } from "@/services/subscription/subscription";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  propertyId: "",
};

const validationSchema = Yup.object({
  propertyId: Yup.string().required("Required!"),
});

export const CheckPricingForm = () => {
  const [propertyOptions, setPropertyOptions] = useState([]);
  const dispatch = useAppDispatch();
  const { data, loading } = useGetPropertyListNameIdSelector();

  const onSubmit = (values) => {
    dispatch(getSubsPricing(values.propertyId));
  };

  useEffect(() => {
    dispatch(getPropertyListNameId({ subscription: true }));
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const temp = data?.map((item) => {
        return { label: item.name, value: item.propertyId };
      });
      setPropertyOptions(temp);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="md:grid md:grid-cols-3 md:gap-6 w-full place-items-end space-y-5 md:space-y-0">
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
            className={"w-full px-2"}
            parentClassName={"w-full px-0 py-0"}
          />
          <Button className={"py-2.5 px-2 w-full h-fit"}>Check Pricing</Button>
        </div>
      </Form>
    </Formik>
  );
};
