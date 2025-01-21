import { useSelector } from "react-redux";

export const useGetAllWorkOrderSelector = () =>
  useSelector((state) => state.getAllWorkOrder);
