import { useSelector } from "react-redux";

export const useAddWithdrawSelector = () =>
  useSelector((state) => state.addWithdraw);
