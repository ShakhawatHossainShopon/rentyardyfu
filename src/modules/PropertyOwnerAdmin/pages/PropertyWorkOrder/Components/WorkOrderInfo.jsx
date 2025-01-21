import {
  Button,
  Datepicker,
  Imageslider,
  Input,
  Modal,
  Select,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { updateWorkOrder } from "@/services/workOrder/workOrder";
import { formatDate, Icons } from "@/utils";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AssignProvider } from "./AssignProvider";
const initialValues = {
  status: "",
  working_time: "",
  working_date: "",
  fixer: "",
};

const validationSchema = Yup.object({
  status: Yup.string().required("Required!"),
});

export const WorkOrderInfo = ({ item, history, historyData }) => {
  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(
      updateWorkOrder({
        ...values,
        propertyId:
          item &&
          item.property &&
          item.property.propertyId &&
          item.property.propertyId,
        workOrderId: item && item.workOrderId && item.workOrderId,
      })
    );
  };
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const OpenGallery = () => {
    setIsModalOpenGallery(true);
  };

  const CloseModal = () => {
    setIsModalOpenGallery(false);
  };
  return (
    <div className="md:p-4 p-0">
      <div className="md:flex justify-between items-center">
        <div>
          <p className="text-sm">
            <span className="font-semibold">Name: </span>
            {item && item.user_name && item.user_name}
          </p>
          {item?.apartment?.unit_number && (
            <p className="text-sm">
              <span className="font-semibold">Unit: </span>
              {item && item.apartment && item.apartment.unit_number}(
              {item && item.apartment && item.apartment.type})
            </p>
          )}
          <p className="text-sm">
            <span className="font-semibold">Contact: </span>
            {item && item.contact_number && item.contact_number}
          </p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">Pet: </span>
            {item && item.pet && item.pet}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Entry Permission: </span>
            {item && item.permission && item.permission}
          </p>
        </div>
        <div className="space-y-1">
          <p className="md:text-lg text-sm">
            {" "}
            {item &&
              item.property &&
              item.property.name &&
              item.property.name}{" "}
          </p>
          <div className="flex justify-start items-start space-x-2">
            <p className="text-gray-700 text-base pt-0.5">
              <Icons.Location className="text-blue-700 darkText" />{" "}
            </p>
            <p className="text-gray-700 text-base flex flex-col items-start justify-center darkText">
              <span className="text-sm">
                {" "}
                {item &&
                  item.property &&
                  item.property.address &&
                  item.property.address}
                ,
              </span>
              <span className="text-sm">
                {" "}
                {item &&
                  item.property &&
                  item.property.city &&
                  item.property.city}
                ,{" "}
                {item &&
                  item.property &&
                  item.property.state &&
                  item.property.state}
                ,{" "}
                {item &&
                  item.property &&
                  item.property.zip &&
                  item.property.zip}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="py-6 space-y-6">
        <div className="">
          <p className="font-semibold underline md:text-lg text-base py-1">
            Brief Description :{" "}
          </p>
          <p className="text-sm">
            {item && item.description && item.description}
          </p>
          <Button onClick={OpenGallery} className={"bg-black mt-3"}>
            Click to preview images
          </Button>
        </div>
        <AssignProvider
          staffId={item?.staffId}
          workOrderId={item?.workOrderId}
        />
      </div>

      {/* Gallerry pop up */}
      <Modal
        title={"Work Order Gallery"}
        isOpen={isModalOpenGallery}
        onClose={CloseModal}
        height={"h-screen"}
        width={"max-w-full"}
      >
        <Imageslider
          title={"Work Order Gallery"}
          images={item && item.images && item.images}
        />
      </Modal>
      <hr className="border border-gray-400 mb-4" />
      {history ? (
        <div>
          <p className="text-sm">
            <span className="font-semibold">Status : </span>
            {item && item.status && item.status}
          </p>
          {item && item.working_time && (
            <p className="text-sm">
              <span className="font-semibold">Working time : </span>{" "}
              {item.working_time}
            </p>
          )}
          {item && item.fixer && (
            <p className="text-sm">
              <span className="font-semibold">Who fix it : </span> {item.fixer}
            </p>
          )}
        </div>
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, touched, errors, setValues, values }) => {
              useEffect(() => {
                setValues({
                  status: item && item.status && item.status,
                  working_time: item && item.working_time && item.working_time,
                  working_date: item && item.working_date && item.working_date,
                  fixer: item && item.fixer && item.fixer,
                });
              }, []);
              return (
                <Form className="w-full flex flex-col justify-start items-start">
                  <div className="md:flex items-center md:gap-6 space-y-5 md:space-y-0 w-full">
                    <Select
                      name={"status"}
                      required={true}
                      label={"Status"}
                      options={[
                        {
                          label: "Select One",
                          value: "",
                        },
                        {
                          label: "Pending",
                          value: "Pending",
                        },
                        {
                          label: "Resolved",
                          value: "Resolved",
                        },
                        {
                          label: "Work in Progress",
                          value: "Work in Progress",
                        },
                        {
                          label: "Order Received",
                          value: "Order Received",
                        },
                        {
                          label: "Canceled",
                          value: "Canceled",
                        },
                      ]}
                      className={"w-full px-2 py-2"}
                      parentClassName={"w-full px-0 py-0"}
                    />

                    <Datepicker
                      parentClassName={"w-full px-0 py-0 bg-gray-50"}
                      label={"Expected Starting Date (Optional)"}
                      name={"working_date"}
                      className={"py-2 px-2 border w-full bg-white"}
                      minDate={new Date()}
                      value={values.working_date}
                      onChange={(e) => {
                        const date = formatDate(e);
                        setFieldValue("working_date", date);
                      }}
                      setFieldValue={setFieldValue}
                      touched={touched.working_date}
                      errors={errors.working_date}
                    />

                    <Select
                      name={"working_time"}
                      label={"Expected Starting Time (Optional)"}
                      options={[
                        {
                          label: "Select One",
                          value: "",
                        },
                        {
                          value: "Anytime",
                          label: "Anytime",
                        },
                        {
                          value: "06:00AM - 07:00AM",
                          label: "06:00AM - 07:00AM",
                        },
                        {
                          value: "07:00AM - 08:00AM",
                          label: "07:00AM - 08:00AM",
                        },
                        {
                          value: "08:00AM - 09:00AM",
                          label: "08:00AM - 09:00AM",
                        },
                        {
                          value: "09:00AM - 10:00AM",
                          label: "09:00AM - 10:00AM",
                        },
                        {
                          value: "10:00AM - 11:00AM",
                          label: "10:00AM - 11:00AM",
                        },
                        {
                          value: "11:00AM - 12:00PM",
                          label: "11:00AM - 12:00PM",
                        },
                        {
                          value: "12:00PM - 01:00PM",
                          label: "12:00PM - 01:00PM",
                        },
                        {
                          value: "01:00PM - 02:00PM",
                          label: "01:00PM - 02:00PM",
                        },
                        {
                          value: "02:00PM - 03:00PM",
                          label: "02:00PM - 03:00PM",
                        },
                        {
                          value: "03:00PM - 04:00PM",
                          label: "03:00PM - 04:00PM",
                        },
                        {
                          value: "04:00PM - 05:00PM",
                          label: "04:00PM - 05:00PM",
                        },
                        {
                          value: "05:00PM - 06:00PM",
                          label: "05:00PM - 06:00PM",
                        },
                        {
                          value: "06:00PM - 07:00PM",
                          label: "06:00PM - 07:00PM",
                        },
                        {
                          value: "07:00PM - 08:00PM",
                          label: "07:00PM - 08:00PM",
                        },
                        {
                          value: "08:00PM - 09:00PM",
                          label: "08:00PM - 09:00PM",
                        },
                        {
                          value: "09:00PM - 10:00PM",
                          label: "09:00PM - 10:00PM",
                        },
                        {
                          value: "10:00PM - 11:00PM",
                          label: "10:00PM - 11:00PM",
                        },
                        {
                          value: "11:00PM - 12:00AM",
                          label: "11:00PM - 12:00AM",
                        },
                      ]}
                      className={"w-full border  px-2 py-2"}
                      parentClassName={"w-full px-0 py-0"}
                    />
                  </div>
                  <div className="md:grid md:grid-cols-3 w-full gap-6 pt-4">
                    <div>
                      <Input
                        label={"Note (Optional)"}
                        placeholder={"Fullname of who fixed it"}
                        name={"fixer"}
                        className={"py-2 px-2"}
                        parentClassName={"col-span-2"}
                      />
                    </div>
                    <Button className={"md:mt-7 mt-3"} type="submit">
                      Update
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
