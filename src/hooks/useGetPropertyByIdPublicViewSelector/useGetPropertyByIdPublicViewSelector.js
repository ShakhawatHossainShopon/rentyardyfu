import { useSelector } from "react-redux";

export const useGetPropertyByIdPublicViewSelector = () =>
  useSelector((state) => state.getPropertyByIdPublicView);
