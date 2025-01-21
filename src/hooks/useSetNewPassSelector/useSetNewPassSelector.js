import { useSelector } from "react-redux";

export const useSetNewPassSelector = () =>
  useSelector((state) => state.setNewPass);
