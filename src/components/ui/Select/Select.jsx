import { cn, Icons } from "@/utils";
import { Field } from "formik";
import { useSelector } from "react-redux";
export const Select = ({
  label,
  className,
  options,
  id,
  parentClassName,
  required,
  placeholder,
  name,
  disabled,
  isDark,
  onChange,
  ...classes
}) => {
  const darkMode = useSelector((state) => state.darkMode.value);
  return (
    <div
      className={cn(
        `relative flex flex-col py-1 px-2 space-y-2`,
        parentClassName
      )}
    >
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-900 min-w-max darkText ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <div className="relative">
              <select
                aria-label={label}
                aria-placeholder={
                  meta.touched && meta.error ? meta.error : placeholder
                }
                id={id}
                className={cn(
                  `text-gray-900 text-xs pe-8 py-2.5 px-2 ring-blue-500 border border-blue-500 block w-full outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-8 dark:bg-darkMode dark:border-blue-900 ${
                    field.value === ""
                      ? "dark:text-gray-600"
                      : "dark:text-gray-400"
                  } ${
                    meta.touched && meta.error
                      ? "ring-1 ring-red-500 border-red-500 dark:ring-1 dark:ring-red-500 dark:border-red-500"
                      : ""
                  } ${
                    disabled ? "border-gray-300 dark:border-dark-primary" : ""
                  }`,
                  className
                )}
                disabled={disabled}
                {...field}
                {...classes}
                onChange={(e) => {
                  field.onChange(e); // Update Formik state
                  onChange && onChange(e); // Call the passed onChange prop if available
                }}
                style={{
                  WebkitBoxShadow: darkMode
                    ? isDark
                      ? ``
                      : "0 0 0 1000px #091729 inset"
                    : "",
                }}
              >
                {options.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className="min-w-max text-sm dark:text-gray-300 dark:bg-darkMode"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none dark:text-gray-400">
                <Icons.DownArrow />
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};
