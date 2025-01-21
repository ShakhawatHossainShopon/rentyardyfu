import { Button, FileUpload, Input } from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { addExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
  name: "",
  invoice_by: "",
  invoice_to: "",
  payment_type: "",
  amount: "",
  receipt: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  invoice_by: Yup.string().required("Required!"),
  invoice_to: Yup.string().required("Required!"),
  payment_type: Yup.string().required("Required!"),
  amount: Yup.string().required("Required!"),
  receipt: Yup.string().required("Required!"),
});
export const AddReceiptInvoice = () => {
  const [mapPreview, setMapPreview] = useState(null);
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    dispatch(addExtraInvoice({ ...values, type: "Receipt" }));
    resetForm();
    setMapPreview(null);
  };
  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };
  const { loading, data } = useGetAllAssetSelector();
  return (
    <div className="space-y-5 md:border md:border-blue-500 p-0 md:p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, touched, errors }) => {
          return (
            <Form className="w-full space-y-5">
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Invoice Name"}
                  placeholder={"Eg. SamsClub bill"}
                  name={"name"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Invoice maker name"}
                  placeholder={"John Doe(Manager)"}
                  name={"invoice_by"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Who paid for the invoice"}
                  placeholder={"Eg. John Doe"}
                  name={"invoice_to"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Input
                  required={true}
                  label={"Payment Type"}
                  placeholder={"Eg. Credit Card"}
                  name={"payment_type"}
                  className={"py-2 px-2"}
                />
                <Input
                  required={true}
                  label={"Total invoice amount"}
                  placeholder={"60"}
                  name={"amount"}
                  className={"py-2 px-2"}
                />
              </div>
              <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
                <FileUpload
                  required={true}
                  label={"Upload receipt"}
                  placeholder={
                    mapPreview ? "1 Photo Uplaoded" : "Upload receipt"
                  }
                  name="receipt"
                  data={data}
                  loading={loading}
                  touched={touched.receipt}
                  errors={errors.receipt}
                  id={"receipt"}
                  accept={"image/jpeg, image/png, image/jpg"}
                  setPreview={setMapPreview}
                  setFieldValue={setFieldValue}
                  parentClassName={"w-fit"}
                  className={"w-fit pr-5"}
                />
                {/* {mapPreview && (
                  <div className="mt-4">
                    <Button type="button" onClick={handleOpenUnitMap}>
                      View All
                    </Button>
                  </div>
                )}
                {mapPreview && (
                  <Modal
                    title="Uploaded Unit Map"
                    isOpen={isOpenUnitMap}
                    onClose={handleCloseUnitMap}
                    width="w-full"
                    height="md:h-screen"
                  >
                    <div className="rounded-lg max-w-96 overflow-hidden border relative">
                      <LazyLoadImage
                        className="w-full rounded-lg object-cover"
                        src={`${config.url.ASSET_URL}${mapPreview.link}`}
                        alt={`Preview`}
                        loading="lazy"
                      />
                      <button
                        onClick={() => {
                          setMapPreview(null);
                          setFieldValue("unit_image", null);
                        }}
                        className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
                      >
                        <Icons.Close />
                      </button>
                    </div>
                  </Modal>
                )} */}
              </div>
              <div className="w-full flex md:justify-end md:pb-0 pb-3">
                <Button type={"submit"}>Save Now</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
