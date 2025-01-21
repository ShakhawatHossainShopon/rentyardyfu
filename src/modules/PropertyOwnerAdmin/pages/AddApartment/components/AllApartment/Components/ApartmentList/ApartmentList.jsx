import { Modal, Pagination } from "@/components";
import { useAppDispatch } from "@/hooks";
import { deleteApartment } from "@/services/apartment/apartment";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { lazy, memo, Suspense, useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

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
const CloneApartment = lazy(() => import("./CloneApartment"));
const UpdateApartment = lazy(() =>
  import("../UpdateApartment/UpdateApartment")
);

export const ApartmentList = memo(({ loading, data, propertyOptions }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(0);
  const [apartmentId, setApartmentId] = useState();
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id) => {
    setIsModalOpen(true);
    setApartmentId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteApartment = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteApartment(id));
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-2 overflow-hidden overflow-y-auto no-scrollbar">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[40vh] darkText">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : paginatedData?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[40vh] darkText">
          {" "}
          No Apartment Available...{" "}
        </div>
      ) : (
        <>
          {paginatedData?.map((item, index) => {
            return (
              <>
                {apartmentId === item.apartmentId && (
                  <Modal
                    title="Clone Apartment"
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    width={"w-full md:w-auto"}
                  >
                    <Suspense fallback={<div>Loading...</div>}>
                      <CloneApartment
                        closeModal={closeModal}
                        apartmentId={apartmentId}
                        propertyOptions={propertyOptions}
                      />
                    </Suspense>
                  </Modal>
                )}
                <Accordion key={index} open={open === index + 1}>
                  <AccordionHeader className="bg-blue-700 text-white py-0 hover:text-white text-sm dark:bg-dark-primary darkText">
                    <div className="flex justify-start items-center w-full">
                      <div
                        onClick={() => handleOpen(index + 1)}
                        className="flex-1 py-4 bg-red flex justify-between items-center px-2"
                      >
                        <div>
                          {item.property_name} - Unit#{item.unit_number} -{" "}
                          {item.bed_count} - {item.bath_count} -{" "}
                          {item.availability} -{" "}
                          {item.published ? `(Published)` : `(Unpublished)`}
                        </div>
                        <div className="flex justify-start items-center space-x-3 mt-3 md:mt-0">
                          <Icon
                            onClick={() => handleOpen(index + 1)}
                            id={index + 1}
                            open={open}
                          />
                        </div>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <div className="flex justify-start items-center space-x-3 md:mt-0 mt-3">
                          <Icons.Clone
                            onClick={() => openModal(item.apartmentId)}
                            className=""
                          />
                        </div>
                        <div className="flex justify-start items-center space-x-3 md:mt-0 mt-3">
                          <Icons.Delete
                            className=""
                            onClick={() =>
                              handleDeleteApartment(item.apartmentId)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionHeader>
                  <AccordionBody
                    className={
                      "md:p-4 p-2 w-full md:border md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode dark:border-dark-primary"
                    }
                  >
                    <Suspense
                      fallback={
                        <div className="w-full flex justify-center items-center">
                          <ClipLoader size={100} color="blue" />
                        </div>
                      }
                    >
                      <UpdateApartment
                        item={item}
                        propertyOptions={propertyOptions}
                      />
                    </Suspense>
                  </AccordionBody>
                </Accordion>
              </>
            );
          })}
        </>
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
});
