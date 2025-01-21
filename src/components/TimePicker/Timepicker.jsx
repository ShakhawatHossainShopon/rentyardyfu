import { cn } from "@/utils";
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export const Timepicker = ({
  label,
  className,
  name,
  setFieldValue,
  required,
  touched,
  errors,
}) => {
  const [selectedTime, setSelectedTime] = useState();
  return (
    <div className="w-fit px-2 bg-white">
      <label
        htmlFor=""
        className={`block dark:mb-0 mb-2 text-sm font-medium text-gray-900 min-w-max ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }`}
      >
        {label}
      </label>
      <div
        className={cn(
          `flex justify-between items-center space-x-3 text-gray-900 text-sm outline-none transition-all duration-200 w-full border border-blue-500 px-2 py-2 ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          }`,
          className
        )}
      >
        <TimePicker
          value={selectedTime}
          onChange={(time) => {
            setSelectedTime(time);
            setFieldValue(name, time);
          }}
          className="outline-none w-full pr-3"
          disableClock={true}
        />
      </div>
    </div>
  );
};
