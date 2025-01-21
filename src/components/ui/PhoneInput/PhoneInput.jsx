import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCountries } from "use-react-countries";
export const PhoneInput = ({
  setNumber,
  value,
  label,
  required,
  placeholder,
  names,
  type,
  setFieldValue,
  errors,
  touched,
  disabled,
}) => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const { countries } = useCountries();
  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  const defaultCountryIndex = sortedCountries.findIndex(
    (country) => country.name === "United States"
  );
  const [country, setCountry] = useState(defaultCountryIndex);
  const { name, flags, countryCallingCode } = sortedCountries[country];
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setFieldValue(names, `${countryCallingCode}${e.target.value}`);
    setNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchClick = (e) => {
    e.stopPropagation();
  };
  const handleCountrySelect = (index) => {
    setCountry(index);
    setSearchTerm(""); // Reset the search term on country select
  };
  const filteredCountries = sortedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full">
      {label && (
        <label
          className={`block mb-2 text-sm font-medium text-gray-900 min-w-max darkText ${
            required ? "after:content-['*'] after:text-red-400" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`relative flex w-full border border-blue-500 dark:border-blue-900 ${
          darkMode ? "dark" : ""
        } ${disabled ? "text-gray-500 border-gray-400" : ""} ${
          touched && errors ? "ring-1 ring-red-600 border-red-600" : ""
        }`}
      >
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={true}
              variant="text"
              color="blue-gray"
              className={`${
                disabled ? "text-gray-500 cursor-not-allowed" : ""
              }flex h-10 items-center gap-2 rounded-none bg-blue-gray-500/10 pl-3`}
            >
              <img
                src={flags.svg}
                alt={name}
                className="h-4 w-4 rounded-full object-cover"
              />
              {countryCallingCode}
            </Button>
          </MenuHandler>
          <MenuList
            className={`max-h-[20rem] max-w-[18rem] p-0 z-[999999999999999999] phone-input-max ${
              darkMode ? "dark" : ""
            } `}
          >
            <div className="dark:bg-dark-primary p-2">
              <div className="p-2">
                <input
                  disabled={disabled}
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={handleSearchClick}
                  className={`${
                    disabled ? "text-gray-500  cursor-not-allowed" : ""
                  } w-full px-3 py-2 border border-gray-300 rounded-md`}
                />
              </div>
              {filteredCountries.map(
                ({ name, flags, countryCallingCode }, index) => {
                  const originalIndex = sortedCountries.findIndex(
                    (country) => country.name === name
                  );
                  return (
                    <MenuItem
                      key={name}
                      value={name}
                      className="flex items-center gap-2 z-50"
                      onClick={() => handleCountrySelect(originalIndex)}
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}{" "}
                      <span className="ml-auto">{countryCallingCode}</span>
                    </MenuItem>
                  );
                }
              )}
            </div>
          </MenuList>
        </Menu>
        <input
          disabled={disabled}
          type={type}
          name={names}
          value={phone ? phone : value ? value.slice(2) : ""}
          onChange={handlePhoneChange}
          placeholder={touched && errors ? "Required!" : placeholder}
          className={`dark:text-gray-400 ${
            disabled ? "text-gray-500 cursor-not-allowed" : ""
          } h-10 w-full border-none px-3 outline-none dark:bg-darkMode`}
          style={{
            WebkitBoxShadow: darkMode ? `0 0 0 1000px #091729 inset` : "",
          }}
        />
      </div>
    </div>
  );
};
