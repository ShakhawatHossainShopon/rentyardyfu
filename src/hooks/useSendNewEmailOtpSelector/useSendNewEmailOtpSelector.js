import { useSelector } from "react-redux";

export const useSendNewEmailOtpSelector = () =>
  useSelector((state) => state.sendNewEmailOtp);
