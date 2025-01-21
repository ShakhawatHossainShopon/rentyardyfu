import { useSelector } from "react-redux";

export const useGetAllPostSelector = () =>
  useSelector((state) => state.getAllPost);
