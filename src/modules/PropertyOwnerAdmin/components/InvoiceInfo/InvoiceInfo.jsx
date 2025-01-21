import { Button, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { deleteInvoice } from "@/services/invoice/invoice";
import { Icons } from "@/utils";
import { memo, useState } from "react";
import Swal from "sweetalert2";
import { AddCustomFee } from "../../pages/Applications/components/AddCustomFee/AddCustomFee";
import { UpdateCustomFee } from "../../pages/Applications/components/UpdateCustomFee/UpdateCustomFee";

export const InvoiceInfo = memo(
  ({
    total,
    history,
    invoiceDetails,
    userId,
    applicationId,
    invoice,
    first_name,
    last_name,
    apartment,
    status,
    move_in_date,
    property_name,
  }) => {
    const dispatch = useAppDispatch();

    const [showForm, setShowForm] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (id) => {
      invoice.forEach((elem) => {
        if (elem.invoiceId === id) {
          setUpdateData(elem);
          setIsModalOpen(true);
        }
      });
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openInNewTab = () => {
      const serializedInvoice = encodeURIComponent(JSON.stringify(invoice));
      const serializedInvoiceDetails = encodeURIComponent(
        JSON.stringify(invoiceDetails)
      );
      const serializedApartment = encodeURIComponent(JSON.stringify(apartment));

      // Serialize additional details
      const queryParams = new URLSearchParams({
        invoice: serializedInvoice,
        invoiceDetails: serializedInvoiceDetails,
        total,
        first_name: encodeURIComponent(first_name),
        last_name: encodeURIComponent(last_name),
        apartment: serializedApartment,
        status: encodeURIComponent(status),
        move_in_date: encodeURIComponent(move_in_date),
        property_name: encodeURIComponent(property_name),
      });

      const newWindow = window.open(
        `${window.location.origin}/print-invoice?${queryParams.toString()}`,
        "_blank"
      );

      newWindow.document.close();
    };

    const handleDeleteInvoice = (id) => {
      Swal.fire({
        title: "Are You Sure?",
        showDenyButton: true,
        confirmButtonText: "Ok",
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(deleteInvoice(id));
        }
      });
    };

    return (
      <div className="md:p-10 p-0 space-y-5 darkText">
        {invoice &&
          invoice.map((item, index) => (
            <div
              key={index}
              className="w-full flex justify-between p-3 border-b-2 border-gray"
            >
              <h3 className="md:text-base text-sm">
                {index + 1}. {item.title}{" "}
                {item?.title?.includes("Pro-Rated Pet Rent") ||
                item?.title?.includes("Pro-Rated Rent")
                  ? ""
                  : `(${item.type})`}
              </h3>
              <div className="flex gap-4">
                <p className="md:text-base text-sm">
                  {item.payment === "Discount" && "-"}${item.amount}
                </p>
                {!history && (
                  <Icons.Edit
                    onClick={() => openModal(item.invoiceId)}
                    className="md:text-lg text-base cursor-pointer"
                  />
                )}
                {!history && (
                  <Icons.Delete
                    onClick={() => handleDeleteInvoice(item.invoiceId)}
                    className="md:text-lg text-base text-red-700 cursor-pointer"
                  />
                )}
              </div>
              {updateData &&
                updateData.invoiceId &&
                updateData.invoiceId === item.invoiceId && (
                  <Modal
                    parentClassName={"bg-opacity-20"}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={"Update Fee"}
                  >
                    <UpdateCustomFee
                      applicationId={applicationId}
                      setShowForm={setShowForm}
                      userId={userId}
                      item={updateData}
                    />
                  </Modal>
                )}
            </div>
          ))}

        {/* Total Fee */}
        <div className="w-full flex justify-between py-3 items-center px-4  bg-blue-100">
          <h3 className="md:text-base text-sm font-bold dark:text-gray-900">
            Total Payment:{" "}
          </h3>
          <div className="flex gap-4">
            <p className="md:text-base text-sm font-bold md:pe-[55px] dark:text-gray-900">
              ${total}
            </p>
          </div>
        </div>

        {/* Print Section */}
        {!history && (
          <div className="w-full md:flex justify-between mt-10 md:space-y-0 space-y-5 space-x-2 md:space-x-0">
            <Button
              onClick={() => setShowForm((prev) => !prev)}
              className={"bg-black md:ml-0 ml-2"}
            >
              {showForm ? "Close Form" : "Add Custom Fee/Discount"}
            </Button>
            <Button
              onClick={openInNewTab}
              className={
                "flex justify-center items-center space-x-2 md:text-lg text-sm"
              }
            >
              <Icons.Print className="cursor-pointer" />
              <span>Print Invoice</span>
            </Button>
          </div>
        )}
        {showForm && (
          <AddCustomFee
            applicationId={applicationId}
            setShowForm={setShowForm}
            userId={userId}
          />
        )}
      </div>
    );
  }
);
