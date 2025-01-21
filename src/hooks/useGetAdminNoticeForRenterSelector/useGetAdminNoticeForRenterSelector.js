import { useSelector } from "react-redux";

export const useGetAdminNoticeForRenterSelector = () =>
  useSelector((state) => state.getAdminNoticeForRenter);
