import { useSelector } from "react-redux";

export const useGetAllPetSelector = () =>
  useSelector((state) => state.getAllPet);
