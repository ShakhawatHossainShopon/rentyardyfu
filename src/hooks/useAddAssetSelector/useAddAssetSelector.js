import { useSelector } from "react-redux";

export const useAddAssetSelector = () => useSelector((state) => state.addAsset);
