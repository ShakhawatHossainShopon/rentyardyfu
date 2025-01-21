import { useSelector } from "react-redux";

export const useGetPaidParkingForRenterSelector = () =>
  useSelector((state) => state.getPaidParkingForRenter);
