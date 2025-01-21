import { cn, Icons } from "@/utils";

export const Upload = ({
  className,
  label,
  required,
  parentClassName,
  touched,
  errors,
  accept,
  onChange,
  name,
  id,
  placeholder,
}) => {
  return (
    <div className={cn(`w-full`, parentClassName)}>
      <label
        className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
          required ? "after:content-['*'] after:text-red-400" : ""
        }  `}
      >
        {label}
      </label>
      <div
        className={cn(
          `w-full flex flex-col justify-start items-start space-x-6 border border-blue-500 py-1 ${
            touched && errors ? "ring-1 ring-red-500 border-red-500" : ""
          }  `,
          className
        )}
      >
        <div className="flex justify-start items-center">
          <label
            htmlFor={id}
            className="flex justify-center items-center space-x-2 px-2 py-1 cursor-pointer"
          >
            <Icons.Upload /> <span> {errors ? errors : placeholder} </span>
          </label>
          <input
            type="file"
            id={id}
            accept={accept}
            onChange={onChange}
            multiple={true}
            name={name}
            hidden
          />
        </div>
      </div>
    </div>
  );
};
