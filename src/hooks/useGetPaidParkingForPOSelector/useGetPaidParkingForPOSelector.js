import { useSelector } from "react-redux";

export const useGetPaidParkingForPOSelector = () =>
  useSelector((state) => state.getPaidParkingForPO);
