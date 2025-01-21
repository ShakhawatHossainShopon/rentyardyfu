import { useSelector } from "react-redux";

export const useGetStaffSelector = () => useSelector((state) => state.getStaff);
