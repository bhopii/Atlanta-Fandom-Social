import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

import "./Login.css";

import Logo from "../../assets-sort/logoBanner/logoAFS.png";
function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.login(userName, password);
      localStorage.setItem("loginKey", response.data.token);
      props.setToken(response.data.token);
      setRedirect("/home");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
      window.setTimeout(() => {
        setError(" ");
      }, 2000);
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      {error !== "" ? <div color="danger">{error}</div> : ""}
      <div className="titleHeaderContainer">
        {/* <h2 className="formHeader">Welcome to ATL Fandom Social</h2> */}
        <img
          className="formHeader"
          src={Logo}
          alt="Where Fans Come Together"
        ></img>
        <div className="formContainer">
          <div className="leftSide">
            <div className="formContentContainer">
              <form>
                <input
                  type="text"
                  name="username"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  className="formInput"
                  placeholder="Username"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="formInput"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
                <input
                  type="submit"
                  className="submitButton"
                  name="submitButton"
                  onClick={handleSubmit}
                  value="Login"
                />
              </form>
              <h6 className="goToSignUp">
                Don't have an account <a href="/">Sign Up Here</a>{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
