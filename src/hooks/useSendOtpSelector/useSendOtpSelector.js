import { useSelector } from "react-redux";

export const useSendOtpSelector = () => useSelector((state) => state.sendOtp);
