import { useSelector } from "react-redux";

export const useGetExtraInvoiceSelector = () =>
  useSelector((state) => state.getExtraInvoice);
