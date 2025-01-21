import { useSelector } from "react-redux";

export const useGetFeesSelector = () => useSelector((state) => state.getFees);
