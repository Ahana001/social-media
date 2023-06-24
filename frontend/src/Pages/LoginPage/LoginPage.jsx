import "./LoginPage.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { loginUser } from "../../Store/authenticationSlice";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { authToken } = useSelector((state) => state.authentication);

  useEffect(() => {
    authToken &&
      navigate(location?.state?.from?.pathname || "/", { replace: true });
  }, [authToken, location, navigate]);

  function loginHandler(e) {
    e.preventDefault();
    dispatch(loginUser(loginData));
  }

  return (
    <>
      <div className="LoginPageContainer">
        <main className="LoginPageWrapper">
          <div className="ImageContainer">
            <div>Hello</div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
              dicta odit delectus velit cupiditate in possimus iste, deleniti at
              earum accusantium harum veritatis, unde sed exercitationem dolore
              explicabo autem molestiae?
            </p>
          </div>
          <div className="LoginFormContainer">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
              <div className="LoginUserNameContainer">
                <input
                  type="text"
                  placeholder="username"
                  required
                  onChange={(e) => {
                    setLoginData({ ...loginData, username: e.target.value });
                  }}
                />
              </div>
              <div className="LoginPasswordContainer">
                <input
                  type="text"
                  placeholder="password"
                  required
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                  }}
                />
              </div>
              <button type="submit">Login</button>
              <div className="SignUpContainer">
                <p>
                  Don&apos;t you have an account ?
                  <span>
                    <Link to="/signup" className="SignupLink">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
