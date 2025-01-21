import { useSelector } from "react-redux";

export const useGetAllVehicleForPoSelector = () =>
  useSelector((state) => state.getAllVehicleForPo);
