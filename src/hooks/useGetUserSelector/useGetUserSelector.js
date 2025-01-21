import { useSelector } from "react-redux";

export const useGetUserSelector = () => useSelector((state) => state.getUser);
