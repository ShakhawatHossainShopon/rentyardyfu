import { AdminHeader, Button, Input, Select } from "@/components";
import {
  useAppDispatch,
  useGetAllPackageSelector,
  useScrollToTop,
} from "@/hooks";
import {
  addPackage,
  deletePackage,
  getAllPackages,
} from "@/services/packages/packages";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { InfoCard } from "../../components";

const initialValues = {
  company: "",
  name: "",
};

const validationSchema = Yup.object({
  company: Yup.string().required("Required!"),
  name: Yup.string().required("Required!"),
});

const MailPackeges = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { data } = useGetAllPackageSelector();

  const onSubmit = (values, { resetForm }) => {
    dispatch(addPackage(values));
    resetForm();
  };

  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Mail/Packeges"} />
      <div className="w-full p-4 space-y-10">
        <div className="grid grid-cols-3 gap-6">
          {data &&
            data.map((item) => {
              return (
                <InfoCard
                  onClick={() => {
                    Swal.fire({
                      title: "Are You Sure?",
                      showDenyButton: true,
                      confirmButtonText: "Ok",
                      denyButtonText: `Cancel`,
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        dispatch(deletePackage(item.mailId));
                      }
                    });
                  }}
                  key={item.mailId}
                  isCloseBtn={true}
                  title={item.company}
                  className={"flex flex-col justify-center items-center"}
                >
                  <h3 className="text-3xl text-blue-600 font-bold">
                    {item.id}
                  </h3>
                  <p>{item.name}</p>
                </InfoCard>
              );
            })}
        </div>
        {/* <InfoCard
          isCloseBtn={true}
          title={"Amazon"}
          className={"flex flex-col justify-center items-center"}
        >
          <h3 className="text-3xl text-blue-600 font-bold">1</h3>
          <p> at Mailbox - Ready to Pickup</p>
        </InfoCard> */}
        <div>
          <h2 className="text-lg font-semibold">Add Mail/Packages </h2>
          <hr className="my-5" />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="space-y-5">
              <div className="md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
                <Select
                  name={"company"}
                  required={true}
                  label={"Select Company"}
                  options={[
                    {
                      label: "Select Company",
                      value: "",
                    },
                    {
                      value: "Amazon",
                      label: "Amazon",
                    },
                    {
                      value: "DHL",
                      label: "DHL",
                    },
                    {
                      value: "FedEx",
                      label: "FedEx",
                    },
                    {
                      value: "USPS",
                      label: "USPS",
                    },
                    {
                      value: "UPS",
                      label: "UPS",
                    },
                  ]}
                  className={"w-full px-2"}
                  parentClassName={"w-full px-0 py-0"}
                />
                <Input
                  label={"Username"}
                  required={true}
                  placeholder={"Enter your username"}
                  name={"name"}
                  className={"py-2 px-2 bg-white"}
                />
              </div>
              <Button>Add Now</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MailPackeges;
