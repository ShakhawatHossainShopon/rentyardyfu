import { cn } from "@/utils";
import { Button, Input } from "../ui";
export const Searchbar = ({
  className,
  isShowButton,
  query,
  onChange,
  homeSearch,
  buttonClass,
  placeholder,
}) => {
  return (
    <div className={cn(`w-full flex items-center justify-center`, className)}>
      <Input
        name={query}
        placeholder={placeholder}
        className={cn(`darkText`, homeSearch)}
        onChange={onChange}
        search={true}
        parentClassName={"rounded md:rounded-lg"}
      />
      {isShowButton && (
        <Button className={cn("text-sm", buttonClass)} type={"submit"}>
          Search
        </Button>
      )}
    </div>
  );
};
