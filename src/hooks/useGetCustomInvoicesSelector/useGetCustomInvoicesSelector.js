import { useSelector } from "react-redux";

export const useGetCustomInvoicesSelector = () =>
  useSelector((state) => state.getCustomInvoices);
