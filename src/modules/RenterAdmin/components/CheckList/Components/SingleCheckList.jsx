export const SingleCheckList = ({ property }) => {
  return (
    <div
      className={`pb-5 bg-[#F3F3F3] mt-6 dark:bg-transparent dark:border-2 dark:border-dark-primary`}
    >
      <h2 className="md:text-lg text-base w-full py-2 px-6 bg-[#E7E7E7] font-bold dark:bg-dark-primary">
        How to Get the Apartment/Flat Key?
      </h2>
      <div className="px-6 py-3">
        <p>To get the key please contact here: </p>
        <p>
          Email:{" "}
          <a
            href={`mailto:${
              property && property.contact_email && property.contact_email
            }`}
            className="underline cursor-pointer"
          >
            {property && property.contact_email && property.contact_email}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a
            href={`tel:${
              property && property.contact_number && property.contact_number
            }`}
            className="underline cursor-pointer"
          >
            {property && property.contact_number && property.contact_number}
          </a>
        </p>
      </div>
    </div>
  );
};
