import { useSelector } from "react-redux";

export const useGetApprovedApplicationsSelector = () =>
  useSelector((state) => state.getApprovedApplications);
