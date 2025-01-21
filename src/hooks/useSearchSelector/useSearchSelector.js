import { useSelector } from "react-redux";

export const useSearchSelector = () => useSelector((state) => state.search);
