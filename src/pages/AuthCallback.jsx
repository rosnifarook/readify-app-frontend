import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext as useAsgardeo } from "@asgardeo/auth-react";
import Loading from "../components/Loading";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { state } = useAsgardeo();

  useEffect(() => {
    if (state?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [state?.isAuthenticated, navigate]);

  return <Loading />;
};

export default AuthCallback;
