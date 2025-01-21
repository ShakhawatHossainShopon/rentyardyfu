import { cn, Icons } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";

export const SelectCheckbox = ({
  className,
  parentClassName,
  label,
  required,
}) => {
  const [ShowCheckBox, setShowCheckBox] = useState(false);
  return (
    <div className={cn(`relative w-full`, parentClassName)}>
      <label
        className={`block mb-2 text-sm font-medium text-gray-900 min-w-max ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }  `}
        htmlFor=""
      >
        {label}
      </label>
      <button
        onClick={() => setShowCheckBox((prev) => !prev)}
        className={cn(
          `flex justify-between items-center w-fit min-w-max space-x-3`,
          className
        )}
      >
        <p>Where is the issue?</p>
        <Icons.DownArrow />
      </button>
      {ShowCheckBox && (
        <div className="absolute top-20 right-0 bg-white border min-w-max text-sm flex flex-col justify-center items-start px-2 py-3 shadow-2xl w-full">
          <Checkbox label="Bathroom" />
          <Checkbox label="Bedroom" />
          <Checkbox label="Kitchen" />
          <Checkbox label="Living room" />
        </div>
      )}
    </div>
  );
};
