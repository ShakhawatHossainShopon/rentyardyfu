import { useSelector } from "react-redux";

export const useSendEmailSelector = () =>
  useSelector((state) => state.sendEmail);
