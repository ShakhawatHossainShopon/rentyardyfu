import { useSelector } from "react-redux";

export const useGetApartmentByIdSelector = () =>
  useSelector((state) => state.getApartmentById);
