import { useSelector } from "react-redux";

export const useGetActiveSubsSelector = () =>
  useSelector((state) => state.getActiveSubs);
