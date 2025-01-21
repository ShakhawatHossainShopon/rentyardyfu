import { useSelector } from "react-redux";

export const useGetAllPetForPoSelector = () =>
  useSelector((state) => state.getAllPetForPo);
