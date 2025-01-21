import { useSelector } from "react-redux";

export const useGetTourForRenterSelector = () =>
  useSelector((state) => state.getTourForRenter);
