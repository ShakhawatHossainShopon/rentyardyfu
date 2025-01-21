import { useSelector } from "react-redux";

export const useGetPostSelector = () => useSelector((state) => state.getPost);
