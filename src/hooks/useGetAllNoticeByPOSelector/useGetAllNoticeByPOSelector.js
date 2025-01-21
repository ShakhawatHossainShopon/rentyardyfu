import { useSelector } from "react-redux";

export const useGetAllNoticeByPOSelector = () =>
  useSelector((state) => state.getAllNoticeByPO);
