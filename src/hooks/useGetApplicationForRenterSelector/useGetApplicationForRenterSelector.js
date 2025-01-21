import { useSelector } from "react-redux";

export const useGetApplicationForRenterSelector = () =>
  useSelector((state) => state.getApplicationForRenter);
