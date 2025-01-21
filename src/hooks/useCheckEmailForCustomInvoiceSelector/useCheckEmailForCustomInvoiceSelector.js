import { useSelector } from "react-redux";

export const useCheckEmailForCustomInvoiceSelector = () =>
  useSelector((state) => state.checkEmailForCustomInvoice);
