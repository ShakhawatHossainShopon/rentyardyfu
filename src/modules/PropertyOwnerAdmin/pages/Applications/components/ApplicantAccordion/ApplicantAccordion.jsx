import { Button, Input, Modal, Pagination, TextArea } from "@/components";
import UpdateDecision from "@/modules/PropertyOwnerAdmin/components/UpdateDecision/UpdateDecision";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { SingleApplicantTabs } from "./components";

const initialValues = {
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  subject: Yup.string().required("required"),
  message: Yup.string().required("required"),
});

const onSubmit = (values) => {
  console.log(values);
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const ApplicantAccordion = ({ data, history }) => {
  const location = useLocation();
  const [open, setOpen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full space-y-2">
      <Modal
        title={"Send Instant Message"}
        isOpen={isModalOpen}
        onClose={closeModal}
        width={"md:w-4/6 w-full"}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Form className="space-y-5 pb-4">
                <Input
                  name={"subject"}
                  label={"Subject"}
                  placeholder={"Subject"}
                  id={"subject"}
                  required={true}
                />
                <TextArea
                  name={"message"}
                  label={"Message"}
                  row={6}
                  placeholder={"Write Message"}
                  id={"message"}
                  className={"dark:!bg-darkMode border dark:!border-blue-900"}
                  required={true}
                />
                <Button type="submit"> Send Now </Button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => {
          const openInNewTab = () => {
            const serializedOccupants = encodeURIComponent(
              JSON.stringify(item.user.occupants)
            );
            const serializedUser = encodeURIComponent(
              JSON.stringify(item.user)
            );
            const serializedApartment = encodeURIComponent(
              JSON.stringify(item.apartment)
            );

            const queryParams = new URLSearchParams({
              occupants: serializedOccupants,
              user: serializedUser,
              lease_term: encodeURIComponent(item.lease_term || ""),
              move_in_date: encodeURIComponent(item.move_in_date || ""),
              apartment: serializedApartment,
            });

            const newWindow = window.open(
              `${
                window.location.origin
              }/print-application?${queryParams.toString()}`,
              "_blank"
            );
            newWindow.document.close();
          };

          return (
            <Accordion
              key={item.applicationId}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-700 text-white px-4 hover:text-white text-sm dark:bg-dark-primary darkText"
                onClick={() => handleOpen(index + 1)}
              >
                <span>
                  {item.property.name},{" "}
                  {item.apartment ? `#${item.apartment.unit_number}` : null}
                  {item.apartment ? `(${item.apartment.type}),` : null}{" "}
                  {item.user.first_name}, Status:{" "}
                  {item.resident_exists && history ? (
                    "Resident"
                  ) : item.status === "Resident (Not Moved-In)" ? (
                    <span className="bg-red-900 py-2 px-2 rounded-lg">
                      Resident (Not Moved-In)
                    </span>
                  ) : (
                    item.status
                  )}{" "}
                  {item &&
                    location.pathname === "/propertyadmin/residents" &&
                    item.notif_move_out && (
                      <>
                        {", "}
                        <span className="bg-red-900 py-2 px-2 rounded-lg">
                          Move-Out Request on {item.move_out_date}
                        </span>
                      </>
                    )}
                  {item &&
                    location.pathname === "/propertyadmin/residents" &&
                    item.notif_renew && (
                      <>
                        {", "}
                        <span className="bg-red-900 py-2 px-2 rounded-lg">
                          Renew Request for {item.requested_lease_term}
                        </span>
                      </>
                    )}
                </span>
              </AccordionHeader>
              <AccordionBody
                className={
                  "md:px-4 px-2 w-full bg-gray-100 border border-blue-500 space-y-5 dark:bg-darkMode dark:border-dark-primary"
                }
              >
                <SingleApplicantTabs item={item} history={history} />
                {!history && (
                  <UpdateDecision
                    apartmentId={item.apartmentId}
                    applicationId={item.applicationId}
                    singlePropertyId={item.singlePropertyId}
                    propertyId={item.propertyId}
                    status={item.status}
                    note={item.note}
                  />
                )}
                {!history && (
                  <div className="w-full md:flex justify-between items-center md:space-y-0 space-y-5">
                    {!history && (
                      <Button onClick={openModal}>
                        Send Instant Message to this Person
                      </Button>
                    )}
                    <Button
                      onClick={openInNewTab}
                      className={
                        "flex justify-center md:text-base text-sm items-center space-x-2 min-w-max w-fit"
                      }
                    >
                      <Icons.Print className="" />{" "}
                      <span>Print this Application</span>
                    </Button>
                  </div>
                )}
              </AccordionBody>
            </Accordion>
          );
        })
      ) : (
        <div className="w-full h-[40vh] flex justify-center items-center darkText">
          {" "}
          No Application Available...{" "}
        </div>
      )}
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
