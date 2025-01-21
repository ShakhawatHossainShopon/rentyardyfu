import { cn } from "@/utils";
import { Field } from "formik";
import { useSelector } from "react-redux";
export const Input = ({
  placeholder,
  name,
  id,
  className,
  label,
  required,
  type,
  parentClassName,
  disabled,
  search,
  onChange,
  ...classes
}) => {
  const darkMode = useSelector((state) => state.darkMode.value);
  return (
    <div className={cn(`w-full`, parentClassName)}>
      {label && (
        <label
          className={`block mb-2 sm:text-sm text-xs font-medium text-gray-900 min-w-max darkText ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }  `}
          htmlFor=""
        >
          {" "}
          {label}{" "}
        </label>
      )}
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <input
              type={type}
              id={id}
              className={cn(
                `border border-blue-500 text-gray-900 text-sm block w-full p-2.5 outline-none transition-all duration-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-darkMode dark:text-gray-400 dark:border-blue-900 ${
                  meta.touched && meta.error
                    ? "ring-1 ring-red-500 border-red-500 dark:ring-1 dark:ring-red-500 dark:border-red-500"
                    : ""
                } ${
                  disabled
                    ? "text-gray-500 border-gray-300 cursor-not-allowed dark:border-dark-primary"
                    : ""
                } `,
                className
              )}
              placeholder={
                meta.touched && meta.error ? meta.error : placeholder
              }
              disabled={disabled}
              {...field}
              {...classes}
              style={{
                WebkitBoxShadow: darkMode
                  ? `0 0 0 1000px ${search ? "#102A43" : "#091729"}  inset`
                  : "",
              }}
              spellCheck="false"
              onChange={(e) => {
                field.onChange(e); // Update Formik state
                onChange && onChange(e); // Call the passed onChange prop if available
              }}
            />
          );
        }}
      </Field>
    </div>
  );
};
