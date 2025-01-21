import { cn } from "@/utils";
import Multiselect from "multiselect-react-dropdown";
import { useCallback, useEffect, useState } from "react";
const NOT_AVAILABLE_OPTION = { value: null, label: "Not Available" };
const demoOptions = [{ value: null, label: "Not Available" }];
export const MultiselectDropdown = ({
  label,
  id,
  parentClassName,
  required,
  options,
  touched,
  errors,
  setFieldValue,
  name,
  loading,
  preSelectedValues,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Select items");
  const [placeholderNumber, setplaceholderNumber] = useState();
  const onSelect = useCallback((selectedList, selectedItem) => {
    let newSelectedOptions = selectedList;
    if (selectedItem.value === null) {
      newSelectedOptions = [NOT_AVAILABLE_OPTION];
    } else {
      newSelectedOptions = selectedList.filter(
        (option) => option.value !== null
      );
    }
    setSelectedOptions(newSelectedOptions);
    const values = newSelectedOptions.map((option) => option.value);
    setFieldValue(name, values[0] === null ? [0] : values);
  }, []);
  const onRemove = useCallback((selectedList, removedItem) => {
    let newSelectedOptions = selectedList;
    if (removedItem.value === null && selectedList.length > 0) {
      newSelectedOptions = [];
    }
    setSelectedOptions(newSelectedOptions);
    const values = newSelectedOptions.map((option) => option.value);
    setFieldValue(name, values[0] === null ? [0] : values);
  }, []);
  useEffect(() => {
    const numSelected = selectedOptions.length;
    const placeholder =
      numSelected > 0 ? `Selected Items: ${numSelected}` : "Select items";
    setPlaceholderText(placeholder);
    setplaceholderNumber(numSelected);
  }, [selectedOptions]);
  useEffect(() => {
    if (preSelectedValues && preSelectedValues.length > 0) {
      const initialSelectedOptions = preSelectedValues.map((value) => {
        if (value.propertyId) {
          return { value: value.propertyId, label: value.name };
        }
        if (value.singlePropertyId) {
          return { value: value.singlePropertyId, label: value.name };
        }
      });
      setSelectedOptions(initialSelectedOptions);
    }
  }, [preSelectedValues]);
  const filteredOptions = options ? [...options] : demoOptions;
  return (
    <div className={cn(`flex flex-col w-full`, parentClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Multiselect
        disable={loading ? true : false}
        options={filteredOptions}
        selectedValues={selectedOptions}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="label"
        showCheckbox
        showChips={false}
        hidePlaceholder={false}
        hideSelectedList={true}
        placeholder={touched && errors ? errors : placeholderText}
        avoidHighlightFirstOption={true}
        disablePreSelectedValues={false}
        showArrow={true}
        className={`bg-white ${
          placeholderNumber > 0 ? "" : "multiselectPlaceholder"
        }  ${
          touched && errors
            ? "ring-1 ring-red-500 border border-red-500 text-sm py-0.5 "
            : "border border-blue-500 text-sm py-0.5 font-semibold dark:border-blue-900 dark:text-gray-400"
        }`}
      />
    </div>
  );
};
