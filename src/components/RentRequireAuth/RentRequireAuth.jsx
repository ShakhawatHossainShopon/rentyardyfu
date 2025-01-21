import { useLoginSelector } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";

const RentRequireAuth = ({ children }) => {
  const location = useLocation();
  const data = useLoginSelector();

  if (!data.isRenter) {
    return <Navigate to={"/"} state={{ path: location.pathname }} />;
  }

  return children;
};

export default RentRequireAuth;
