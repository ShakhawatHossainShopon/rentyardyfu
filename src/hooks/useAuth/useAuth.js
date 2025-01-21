import { checkAuth } from "@/features/auth/loginSlice/loginSlice";
import { useAppDispatch } from "../useAppDispatch";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  sessionStorage.removeItem("verified");
  // dispatch(loginVerifier());
  // dispatch(signUpVerifier());
  if (token && role) {
    dispatch(checkAuth({ token, role }));
  }
};
