import { useSelector } from "react-redux";

export const useGetUserDashboardSelector = () =>
  useSelector((state) => state.getUserDashboard);
