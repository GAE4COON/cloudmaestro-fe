import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const useTokenExpirationChecker = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      const timer = setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenType");
        window.location.href = "/sign-in";
      }, expirationTime - currentTime);

      return () => clearTimeout(timer);
    }
  }, []);
};

export default useTokenExpirationChecker;
