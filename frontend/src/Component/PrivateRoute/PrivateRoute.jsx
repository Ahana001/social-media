import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return children;
}
