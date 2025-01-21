import { useSelector } from "react-redux";

export const useGetAdminNoticeSelector = () =>
  useSelector((state) => state.getAdminNotice);
