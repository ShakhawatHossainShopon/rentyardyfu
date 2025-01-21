import { cn } from "@/utils";
import { Checkbox } from "@material-tailwind/react";
export const CheckboxButton = ({
  onChange,
  label,
  className,
  checked,
  id,
  type,
  parentClassName,
}) => {
  return (
    <div className={cn(`checkbox`, parentClassName)}>
      <Checkbox
        aria-label="checkbox"
        id={id}
        label={label}
        className={cn(``, className)}
        checked={checked}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
