import { cn } from "@/utils";
import { Radio } from "@material-tailwind/react";
import { useSelector } from "react-redux";
export const RadioButton = ({ onChange, checked, label, name, className }) => {
  const darkMode = useSelector((state) => state.darkMode.value);
  return (
    <div className={cn(``, className)}>
      <Radio
        onChange={onChange}
        checked={checked}
        name={name}
        label={label}
        color={darkMode ? "blue" : "black"}
      />
    </div>
  );
};
