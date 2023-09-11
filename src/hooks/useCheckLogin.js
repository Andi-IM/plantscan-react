import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLogin = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const checkLogin = () => {
    setIsLoadingLogin(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (window.location.pathname === "/login") {
          navigate("/dashboard");
        }
        setIsLogin(true);
      } else {
        setIsLogin(false);

        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
      setIsLoadingLogin(false);
    });
  };

  useEffect(() => {
    checkLogin();
  }, [window.location.pathname]);

  return { isLogin, isLoadingLogin };
};

export default useCheckLogin;
