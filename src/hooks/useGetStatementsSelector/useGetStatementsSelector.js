import { useSelector } from "react-redux";

export const useGetStatementsSelector = () =>
  useSelector((state) => state.getStatements);
