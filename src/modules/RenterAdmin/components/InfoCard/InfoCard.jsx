import { Modal } from "@/components";
import { config } from "@/config";
import { cn, Icons } from "@/utils";

export const InfoCard = ({
  children,
  isCloseBtn,
  title,
  className,
  onClick,
  asset,
  closeModal,
  isModalOpen,
  petId,
  itemPetId,
  name,
  photo,
  isModalOpen2,
  closeModal2,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[120px] h-full dark:text-gray-400 dark:border dark:border-dark-light">
      {petId === itemPetId && asset && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Vaccine Proof"}
          width={"md:w-4/6 w-full"}
        >
          <div className="flex justify-center items-center w-full py-6">
            <img
              src={`${config.url.ASSET_URL}${asset.link}`}
              alt=""
              className="object-cover max-h-96"
            />
          </div>
        </Modal>
      )}
      {petId === itemPetId && photo && (
        <Modal
          isOpen={isModalOpen2}
          onClose={closeModal2}
          title={"Pet Photo"}
          width={"md:w-4/6 w-full"}
        >
          <div className="flex justify-center items-center w-full py-6">
            <img
              src={`${config.url.ASSET_URL}${photo.link}`}
              alt=""
              className="object-cover max-h-96"
            />
          </div>
        </Modal>
      )}
      <h2 className="w-full bg-black text-white md:text-base text-sm font-bold py-2 text-center relative dark:bg-dark-primary darkText">
        {name} {name ? `(${title})` : title}
        {isCloseBtn && (
          <button
            onClick={onClick}
            className="bg-white px-1 absolute right-1 top-2 text-black w-7 h-7 rounded-full flex justify-center items-center text-lg dark:bg-transparent"
            aria-label="delete"
          >
            <span className="text-red-500">
              {" "}
              <Icons.Delete />{" "}
            </span>
          </button>
        )}
      </h2>
      <div
        className={cn(
          `w-full bg-gray-100 py-5 dark:bg-transparent shadow-md dark:border-dark-light h-full`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
