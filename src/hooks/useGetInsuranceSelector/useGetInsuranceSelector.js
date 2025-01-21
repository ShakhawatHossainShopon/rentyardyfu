import { useSelector } from "react-redux";

export const useGetInsuranceSelector = () =>
  useSelector((state) => state.getInsurance);
