import { RatingStars } from "@/components";
import { Icons } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export const Title = ({
  name,
  rating,
  address,
  contact_email,
  city,
  state,
  country,
  contact_number,
  website,
  zip,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const Address = `${address}, ${city}, ${state}, ${zip}`;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Address)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <div className="py-5 xl:flex xl:justify-between px-4">
      <div className="space-y-4">
        <h1 className="md:text-3xl sm:text-xl font-bold text-base">{name}</h1>
        <div className="flex justify-start items-center space-x-3">
          <p className="text-gray-700 md:text-lg text-sm flex items-center gap-x-1.5 darkText">
            <Icons.Location className="text-blue-700 dark:text-gray-300" />{" "}
            {address}, {city}, {state}, {zip}, {country}
          </p>
          {isCopied ? (
            <Tooltip content="Text Copied">
              <Icons.Tik />
            </Tooltip>
          ) : (
            <Tooltip content="Copy">
              <button aria-label="copy" onClick={handleCopy}>
                <Icons.Copy className="text-lg" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="space-y-2 flex flex-col xl:items-end md:pt-5 pt-3">
        <div className="flex justify-start items-center space-x-1 text-yellow-400">
          <RatingStars rating={rating ? rating : 0} />
        </div>
        <p className="flex justify-start items-center space-x-3 text-xl">
          <a href={`tel:${contact_number}`} aria-label="phone">
            <Icons.Phone />
          </a>
          <a href={`mailto:${contact_email}`} aria-label="email">
            <Icons.Email />
          </a>
          {website && (
            <a href={website} target="_blank" aria-label="website">
              <Icons.Website />
            </a>
          )}
        </p>
      </div>
    </div>
  );
};
