import { useSelector } from "react-redux";

export const useGetAllAssetSelector = () =>
  useSelector((state) => state.getAllAsset);
