import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
};
