import { useSelector } from "react-redux";

export const useGetApplicationListForPOSelector = () =>
  useSelector((state) => state.getApplicationListForPO);
