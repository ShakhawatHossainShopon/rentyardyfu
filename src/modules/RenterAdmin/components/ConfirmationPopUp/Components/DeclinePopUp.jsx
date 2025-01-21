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
const ConfirmationPopUp = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[460px]">
        <div className="flex justify-between items-center px-4 pb-5 text-blue-700 pt-8">
          <h2 className="text-2xl font-semibold ml-5 underline underline-offset-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-4xl hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
