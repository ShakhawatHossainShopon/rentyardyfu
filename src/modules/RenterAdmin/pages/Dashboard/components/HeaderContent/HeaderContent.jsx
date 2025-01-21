import { Icons } from "@/utils";
import { Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export const HeaderContent = ({ property, apartment }) => {
  const [isCopied, setIsCopied] = useState(false);
  const Address = `${
    apartment?.address ? apartment?.address : property?.address
  }, Apt
            ${apartment && apartment.unit_number && apartment.unit_number}, ${
    property && property.city && property.city
  }
            ${property && property.state && property.state}
            ${property && property.zip && property.zip}`;
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
    <div className="md:flex justify-between items-start dark:text-gray-400">
      <div className="space-y-3">
        <h2 className="md:text-lg text-base font-semibold">Mailing Address</h2>
        <div className="flex justify-start items-start space-x-2">
          <div className="">
            <p className="text-sm"></p>
            <p className="text-sm">
              {apartment?.address ? apartment?.address : property?.address}, Apt{" "}
              {apartment && apartment.unit_number && apartment.unit_number},
            </p>
            <p className="text-sm">
              {" "}
              {property && property.city && property.city}{" "}
              {property && property.state && property.state}{" "}
              {property && property.zip && property.zip}{" "}
            </p>
          </div>
          {isCopied ? (
            <Tooltip content="Text Copied">
              <Icons.Tik />
            </Tooltip>
          ) : (
            <Tooltip content="Copy">
              <button aria-label="copy" type="button" onClick={handleCopy}>
                <Icons.Copy className="text-lg" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="">
        {property?.deposits?.map((item) => {
          return (
            <p className="text-sm font-semibold">
              {item.type}: ${item.amount}
            </p>
          );
        })}
        {/* <div className="">
          <p className="text-sm">Rental Score: 92 Out of 100</p>
          <p className="text-sm">
            Rental score is important for next rent, so pay all bill on time
          </p>
        </div> */}
      </div>
    </div>
  );
};
