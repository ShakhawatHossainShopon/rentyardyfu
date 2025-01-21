import { useSelector } from "react-redux";

export const useGetSubsPricingSelector = () =>
  useSelector((state) => state.getSubsPricing);
