import { useSelector } from "react-redux";

export const useGetAllDepositSelector = () =>
  useSelector((state) => state.getAllDeposit);
