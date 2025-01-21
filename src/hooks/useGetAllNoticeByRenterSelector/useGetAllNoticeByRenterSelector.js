import { useSelector } from "react-redux";

export const useGetAllNoticeByRenterSelector = () =>
  useSelector((state) => state.getAllNoticeByRenter);
