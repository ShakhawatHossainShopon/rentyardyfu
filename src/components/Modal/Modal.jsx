import { cn, Icons } from "@/utils";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
const container = document.getElementById("modal-container");
export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = false,
  title,
  width,
  height,
}) => {
  const modalRef = useRef();
  const darkMode = useSelector((state) => state.darkMode.value);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (closeOnOutsideClick) {
          onClose();
        }
      }
    };
    if (isOpen && closeOnOutsideClick) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnOutsideClick, onClose]);
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60] ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        ref={modalRef}
        className={cn(
          `bg-white px-6 no-scrollbar rounded-lg relative mx-4 overflow-y-auto max-h-[90vh] ${width} dark:bg-dark-light space-y-5`,
          height
        )}
      >
        <div className="border-b border-blue-200 sticky top-0 z-10 w-full flex justify-between items-center bg-white h-fit dark:bg-dark-light">
          {title && (
            <h2 className="font-semibold text-base md:text-2xl text-blue-700 py-2 darkText">
              {title}
            </h2>
          )}
          <button
            aria-label="close"
            onClick={onClose}
            className="top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <Icons.closeBtn className="text-3xl" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    container
  );
};
