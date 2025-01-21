import { useSelector } from "react-redux";

export const useGetAllEmployeeSelector = () =>
  useSelector((state) => state.getAllEmployee);
