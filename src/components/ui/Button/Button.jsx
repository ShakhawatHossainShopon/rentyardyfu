import { cn } from "@/utils";

export const Button = ({ className, children, type, disabled, ...classes }) => {
  return (
    <button
      className={cn(
        `text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium md:text-sm text-xs px-5 py-2.5 transition-all duration-200 dark:bg-blue-800 dark:hover:bg-blue-900 dark:text-gray-300 ${
          disabled
            ? "bg-blue-300 dark:bg-blue-300 hover:bg-blue-300 hover:dark:bg-blue-300 cursor-not-allowed"
            : ""
        } `,
        className
      )}
      type={type}
      disabled={disabled}
      {...classes}
    >
      {children}
    </button>
  );
};
