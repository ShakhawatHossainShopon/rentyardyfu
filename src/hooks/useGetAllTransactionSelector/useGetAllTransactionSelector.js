import { useSelector } from "react-redux";

export const useGetAllTransactionSelector = () =>
  useSelector((state) => state.getAllTransaction);
