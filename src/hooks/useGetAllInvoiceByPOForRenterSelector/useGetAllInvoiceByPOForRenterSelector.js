import { useSelector } from "react-redux";

export const useGetAllInvoiceByPOForRenterSelector = () =>
  useSelector((state) => state.getAllInvoiceByPOForRenter);
