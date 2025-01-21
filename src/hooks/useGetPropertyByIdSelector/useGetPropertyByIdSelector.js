import { useSelector } from "react-redux";

export const useGetPropertyByIdSelector = () =>
  useSelector((state) => state.getPropertyById);
