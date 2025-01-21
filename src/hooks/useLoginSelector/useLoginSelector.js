import { useSelector } from "react-redux";

export const useLoginSelector = () => useSelector((state) => state.login);
