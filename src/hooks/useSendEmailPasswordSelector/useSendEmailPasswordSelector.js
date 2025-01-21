import { useSelector } from "react-redux";

export const useSendEmailPasswordSelector = () =>
  useSelector((state) => state.sendEmailPassword);
