import { useSelector } from "react-redux";

export const useSendOldEmailOtpSelector = () =>
  useSelector((state) => state.sendOldEmailOtp);
