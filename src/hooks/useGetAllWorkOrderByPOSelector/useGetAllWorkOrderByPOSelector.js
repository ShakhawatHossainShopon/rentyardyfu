import { useSelector } from "react-redux";

export const useGetAllWorkOrderByPOSelector = () =>
  useSelector((state) => state.getAllWorkOrderByPO);
