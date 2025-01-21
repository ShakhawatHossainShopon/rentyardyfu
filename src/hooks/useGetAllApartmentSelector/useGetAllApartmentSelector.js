import { useSelector } from "react-redux";

export const useGetAllApartmentSelector = () =>
  useSelector((state) => state.getAllApartment);
