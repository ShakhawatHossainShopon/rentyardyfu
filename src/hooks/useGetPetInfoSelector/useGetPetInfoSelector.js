import { useSelector } from "react-redux";

export const useGetPetInfoSelector = () =>
  useSelector((state) => state.getPetInfo);
