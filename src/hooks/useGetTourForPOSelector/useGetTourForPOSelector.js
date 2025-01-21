import { useSelector } from "react-redux";

export const useGetTourForPOSelector = () =>
  useSelector((state) => state.getTourForPO);
