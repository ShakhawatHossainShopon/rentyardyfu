import { useSelector } from "react-redux";

export const useGetPropertyListNameIdSelector = () =>
  useSelector((state) => state.getPropertyListNameId);
