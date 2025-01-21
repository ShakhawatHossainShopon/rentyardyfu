import { useSelector } from "react-redux";

export const useGetAllPaymentMethodsSelector = () =>
  useSelector((state) => state.getAllPaymentMethods);
