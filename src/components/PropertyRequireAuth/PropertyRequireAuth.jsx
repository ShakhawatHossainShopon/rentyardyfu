import { useLoginSelector } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";

const PropertyRequireAuth = ({ children }) => {
  const location = useLocation();
  const data = useLoginSelector();

  if (!data.isPropertyOwner) {
    return <Navigate to={"/"} state={{ path: location.pathname }} />;
  }

  return children;
};

export default PropertyRequireAuth;
