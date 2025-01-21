import { cn, Icons } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Datepicker = ({
  label,
  className,
  parentClassName,
  placeholder,
  required,
  value,
  onChange,
  name,
  touched,
  errors,
  disabled,
  minDate,
  maxDate,
  setFieldValue,
  submitForm,
}) => {
  const handleClearDate = () => {
    setFieldValue(name, "");
    submitForm();
  };

  return (
    <div
      className={cn(
        `w-full md:px-2 md:py-1 bg-transparent dark:bg-darkMode`,
        parentClassName
      )}
    >
      <label
        htmlFor=""
        className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }`}
      >
        {label}
      </label>
      <div
        className={cn(
          `relative flex justify-between items-center space-x-3 text-gray-900 text-sm outline-none transition-all duration-200 w-full border border-blue-500 px-2 py-2 dark:bg-darkMode dark:border-blue-900 ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          } ${
            disabled
              ? "text-gray-500 border-gray-300 cursor-not-allowed dark:border-dark-primary"
              : ""
          }`,
          className
        )}
      >
        <DatePicker
          name={name}
          onChange={onChange}
          selected={value}
          disabled={disabled}
          showYearDropdown
          showMonthDropdown
          placeholderText={"MM-DD-YYYY"}
          className={`cursor-pointer bg-transparent outline-none p-0 w-11/12 darkText  ${
            disabled ? "text-gray-500 cursor-not-allowed" : ""
          }`}
          dropdownMode="select"
          autoComplete="off"
          showIcon={true}
          icon={<Icons.Calender className="darkText" />}
          calendarIconClassName="-left-1 -top-1.5"
          minDate={minDate}
          maxDate={maxDate}
        />
        {value && (
          <button
            type="button"
            onClick={handleClearDate}
            className="text-gray-500 hover:text-gray-700 darkText"
            aria-label="Clear date"
          >
            <Icons.Close />
          </button>
        )}
      </div>
    </div>
  );
};
