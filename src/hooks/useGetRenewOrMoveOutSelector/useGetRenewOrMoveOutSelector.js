import { useSelector } from "react-redux";

export const useGetRenewOrMoveOutSelector = () =>
  useSelector((state) => state.getRenewOrMoveOut);
