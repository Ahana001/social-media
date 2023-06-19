import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.authentication);
  console.log(authToken);
  return authToken ? children : navigate("/login");
}
