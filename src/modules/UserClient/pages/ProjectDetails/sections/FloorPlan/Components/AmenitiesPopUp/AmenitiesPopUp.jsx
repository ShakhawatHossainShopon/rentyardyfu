import { Chip } from "@/components";

export const AmenitiesPopUp = ({ amenities }) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 py-4 gap-5">
        {amenities.map((item, index) => (
          <Chip key={index} label={item.title} />
        ))}
      </div>
    </>
  );
};
