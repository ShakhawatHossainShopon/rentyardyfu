import { Button, MultipleFileUpload, Select, TextArea } from "@/components";
import { config } from "@/config";
import { useAppDispatch } from "@/hooks";
import { Icons } from "@/utils";
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";

const initialValues = {
  checklist: [
    {
      area: "",
      spot: "",
      priority: "",
      desc: "",
      images: [],
    },
  ],
};

const validationSchema = Yup.object().shape({
  checklist: Yup.array().of(
    Yup.object().shape({
      area: Yup.string().trim().required("required"),
      priority: Yup.string().trim().required("required"),
      desc: Yup.string().trim().required("required"),
      images: Yup.array()
        .of(Yup.string())
        .required("Image required!")
        .min(1, "Image required!"),
    })
  ),
});

export const MoveInChecklistForm = ({ data, loading }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useAppDispatch();
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
  };
  return (
    <div className="space-y-5">
      <div>
        <h3>Moved-In Check List</h3>
        <hr />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, touched, errors, values }) => {
          return (
            <Form className="w-full space-y-5">
              <div className="md:bg-gray-50 md:p-4 md:border md:border-blue-500 dark:md:bg-darkMode dark:md:border-dark-primary">
                <h3 className="font-medium">Rent and Lease</h3>
                <hr className="border-gray-300 mt-1 mb-3" />
                <FieldArray name="checklist">
                  {({
                    push,
                    remove,
                    form: {
                      values: { checklist },
                    },
                  }) => {
                    return (
                      <div className="space-y-2 w-full">
                        {checklist.map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-col justify-start items-end space-y-4 w-full"
                            >
                              <div className="grid grid-cols-3 gap-6 w-full">
                                <Select
                                  name={`checklist[${index}].area`}
                                  required={true}
                                  label={"Select Area"}
                                  options={[
                                    {
                                      label: "Select Property",
                                      value: "",
                                    },
                                    {
                                      label: "Bedroom",
                                      value: "Bedroom",
                                    },
                                    {
                                      label: "Bathroom",
                                      value: "Bathroom",
                                    },
                                    {
                                      label: "Living Room",
                                      value: "Living Room",
                                    },
                                    {
                                      label: "Kitchen",
                                      value: "Kitchen",
                                    },
                                    {
                                      label: "Balcony",
                                      value: "Balcony",
                                    },
                                  ]}
                                  className={"w-full px-2 py-2"}
                                  parentClassName={"w-full px-0 py-0"}
                                />
                                <Select
                                  name={`checklist[${index}].spot`}
                                  label={"Specific Spot/Point(Optional)"}
                                  options={[
                                    {
                                      label: "Select Unit Type",
                                      value: "",
                                    },
                                    {
                                      label: "High - Need to Fix ASAP",
                                      value: "High - Need to Fix ASAP",
                                    },
                                    {
                                      label: "Medium - Manageable 1/2 Days",
                                      value: "Medium - Manageable 1/2 Days",
                                    },
                                    {
                                      label: "Low - Manageable for Week",
                                      value: "Low - Manageable for Week",
                                    },
                                  ]}
                                  className={"w-full px-2 py-2"}
                                  parentClassName={"w-full px-0 py-0"}
                                />
                                <Select
                                  name={`checklist[${index}].priority`}
                                  required={true}
                                  label={"Priority"}
                                  options={[
                                    {
                                      label: "Select Unit Type",
                                      value: "",
                                    },
                                    {
                                      label: "High - Need to Fix ASAP",
                                      value: "High - Need to Fix ASAP",
                                    },
                                    {
                                      label: "Medium - Manageable 1/2 Days",
                                      value: "Medium - Manageable 1/2 Days",
                                    },
                                    {
                                      label: "Low - Manageable for Week",
                                      value: "Low - Manageable for Week",
                                    },
                                  ]}
                                  className={"w-full px-2 py-2"}
                                  parentClassName={"w-full px-0 py-0"}
                                />
                              </div>
                              <div className="w-full">
                                <TextArea
                                  required={true}
                                  label={"Short Description"}
                                  placeholder={
                                    "Example: Kitchen Tap is not working, Bathroom Flash is not working"
                                  }
                                  row={5}
                                  className={" bg-white"}
                                  name={"checklist[${index}].desc"}
                                />
                              </div>
                              <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0 w-full">
                                <MultipleFileUpload
                                  touched={touched.floor_plans}
                                  errors={errors.floor_plans}
                                  id={"floor_plans"}
                                  name={"floor_plans"}
                                  placeholder={"Upload Floor Plan"}
                                  label={"Upload Apartment Floor Plan"}
                                  required={true}
                                  parentClassName={"w-fit"}
                                  className={"w-fit pr-5"}
                                  setFieldValue={setFieldValue}
                                  data={data}
                                  loading={loading}
                                  preview={previewUrls}
                                  setPreview={setPreviewUrls}
                                  accept={
                                    "image/jpeg, image/png, image/jpg, image/webp"
                                  }
                                />
                                {previewUrls.length > 0 && (
                                  <div>
                                    {previewUrls.length > 0 && (
                                      <div className="flex flex-wrap justify-start items-center gap-4">
                                        {previewUrls
                                          .slice(0, 4)
                                          .map((url, index) => (
                                            <div
                                              key={index}
                                              className="h-32 w-32 overflow-hidden border relative rounded-lg"
                                            >
                                              <LazyLoadImage
                                                className="h-32 w-32 rounded-lg object-cover"
                                                src={`${config.url.ASSET_URL}${url.link}`}
                                                alt={`Preview ${index}`}
                                                loading="lazy"
                                              />
                                              <button
                                                type="button"
                                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                                onClick={() =>
                                                  handleRemoveImage(index)
                                                }
                                                aria-label={`Remove image ${index}`}
                                              >
                                                <Icons.Close />
                                              </button>
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                    {previewUrls.length > 4 && (
                                      <div className="mt-4">
                                        <Button
                                          type={"button"}
                                          onClick={openModal}
                                        >
                                          View More
                                        </Button>
                                      </div>
                                    )}
                                    {isModalOpen && (
                                      <Modal
                                        title="Floor Plan"
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        width="w-full"
                                        height="md:h-screen"
                                      >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                                          {previewUrls.map((url, index) => (
                                            <div
                                              key={index + 4}
                                              className="relative overflow-hidden"
                                            >
                                              <LazyLoadImage
                                                className="w-full h-full object-cover"
                                                src={`${config.url.ASSET_URL}${url.link}`}
                                                alt={`Preview ${index + 4}`}
                                                loading="lazy"
                                              />
                                              <button
                                                type="button"
                                                className="absolute right-2 top-2 bg-white rounded-full p-1 text-black"
                                                onClick={() =>
                                                  handleRemoveImage(index)
                                                }
                                                aria-label={`Remove image ${index}`}
                                              >
                                                <Icons.Close />
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      </Modal>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-start items-center space-x-2">
                                <div>
                                  {index > 0 ? (
                                    <Button
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      <Icons.Delete />
                                    </Button>
                                  ) : null}
                                </div>
                                {index === values.checklist.length - 1 ? (
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      push({
                                        area: "",
                                        spot: "",
                                        priority: "",
                                        desc: "",
                                      })
                                    }
                                  >
                                    <Icons.Plus />
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <Button type={"submit"}>Save</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
