import { useSelector } from "react-redux";

export const useGetAllTransactionForRenterSelector = () =>
  useSelector((state) => state.getAllTransactionForRenter);
