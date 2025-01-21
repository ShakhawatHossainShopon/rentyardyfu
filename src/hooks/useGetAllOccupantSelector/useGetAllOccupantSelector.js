import { useSelector } from "react-redux";

export const useGetAllOccupantSelector = () =>
  useSelector((state) => state.getAllOccupant);
