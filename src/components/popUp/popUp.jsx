import { cn } from "@/utils";

/* this is reusable pop up which receives isOpen and onClose prop and children
here is the usage

const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  <button
    onClick={openModal}>
  </button>
*/
export const PopUp = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  parentClassName,
  childrenClassName,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={cn(
        `fixed top-[-100px] md:top-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999]`,
        parentClassName
      )}
    >
      <div
        className={cn(
          `bg-white rounded-lg shadow-lg lg:w-1/2 w-11/12`,
          className
        )}
      >
        <div className="flex justify-between items-center px-4 pb-5 text-blue-700 pt-8 no-print">
          <h2 className="md:text-2xl text-base font-semibold md:ml-5 underline underline-offset-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-4xl hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div
          className={cn(
            `max-h-[70vh] overflow-y-scroll no-scrollbar pb-6`,
            childrenClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
