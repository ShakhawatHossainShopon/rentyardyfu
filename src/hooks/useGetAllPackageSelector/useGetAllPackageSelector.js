import { useSelector } from "react-redux";

export const useGetAllPackageSelector = () =>
  useSelector((state) => state.getAllPackage);
