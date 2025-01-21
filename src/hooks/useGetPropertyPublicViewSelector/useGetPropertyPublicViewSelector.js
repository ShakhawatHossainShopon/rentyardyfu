import { useSelector } from "react-redux";

export const useGetPropertyPublicViewSelector = () =>
  useSelector((state) => state.getPropertyPublicView);
