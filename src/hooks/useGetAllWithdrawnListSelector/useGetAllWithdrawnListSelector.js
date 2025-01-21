import { useSelector } from "react-redux";

export const useGetAllWithdrawnListSelector = () =>
  useSelector((state) => state.getAllWithdrawnList);
