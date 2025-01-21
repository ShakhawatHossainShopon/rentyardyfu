import { useSelector } from "react-redux";

export const useGetAllSinglePropertySelector = () =>
  useSelector((state) => state.getAllSingleProperty);
