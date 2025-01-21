import { useSelector } from "react-redux";

export const useGetAllVehicleSelector = () =>
  useSelector((state) => state.getAllVehicle);
