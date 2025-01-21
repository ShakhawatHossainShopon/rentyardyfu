import { useSelector } from "react-redux";

export const useGetAllPropertySelector = () =>
  useSelector((state) => state.getAllProperty);
