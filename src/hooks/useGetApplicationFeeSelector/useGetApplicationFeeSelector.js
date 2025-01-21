import { useSelector } from "react-redux";

export const useGetApplicationFeeSelector = () =>
  useSelector((state) => state.getApplicationFee);
