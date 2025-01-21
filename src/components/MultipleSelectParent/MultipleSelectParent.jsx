import { MultiselectDropdown } from "@/components/ui/MultiselectDropdown";

export const MultipleSelectParent = ({
  parentClassName,
  name,
  required,
  label,
  touched,
  errors,
  setFieldValue,
  options,
  preSelectedValues,
}) => {
  return (
    <>
      <MultiselectDropdown
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        parentClassName={parentClassName}
        name={name}
        required={required}
        label={label}
        options={options}
        preSelectedValues={preSelectedValues}
      />
    </>
  );
};
