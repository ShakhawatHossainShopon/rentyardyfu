import { useSelector } from "react-redux";

export const useChangeTabSelector = () =>
  useSelector((state) => state.changeTab);
