import { Button, SinglePdfUpload } from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { addDocs } from "@/services/application/application";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  assetId: "",
};

const validationSchema = Yup.object({
  assetId: Yup.string().required("Required!"),
});

export const Docs = ({ applicationId, propertyId, singlePropertyId }) => {
  const dispatch = useAppDispatch();

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addDocs({
        applicationId,
        propertyId: propertyId ? propertyId : singlePropertyId,
        single: singlePropertyId ? true : false,
        ...values,
      })
    );
    resetForm();
  };

  const { loading, data } = useGetAllAssetSelector();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, setValues, values, errors, touched }) => {
        return (
          <Form className="space-y-5">
            <SinglePdfUpload
              id={`assetId`}
              name={`assetId`}
              label={"Upload File(.pdf)"}
              accept={"application/pdf"}
              placeholder={values.assetId ? "1 PDF Uploaded" : "Upload PDF"}
              parentClassName={"w-fit"}
              className={"min-w-max pr-5"}
              setFieldValue={setFieldValue}
              loading={loading}
              data={data}
            />
            <Button type={"submit"}>Submit Request</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
