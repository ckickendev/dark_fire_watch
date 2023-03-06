import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../utils/loading";

export const Login = (props) => {
  const ROOT_BACKEND = "http://localhost:5000";
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${ROOT_BACKEND}/auth/login`, loginInfo);
      localStorage.setItem("access_token", res.data.data.access_token);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };
  const changeValue = (e, field) => {
    console.log(e.target.value);
    setLoginInfo((loginInfo) => {
      return { ...loginInfo, [field]: e.target.value };
    });
  };

  return (
    <div className="container">
      {loading && <Loading />}
      <form action={`${ROOT_BACKEND}/auth/login`} method="POST">
        <h1>Login</h1>
        <button onClick={() => props.changeAuthen(2)}>SignUp</button>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginInfo.email}
            onChange={(e) => changeValue(e, "email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={loginInfo.password}
            onChange={(e) => changeValue(e, "password")}
          />
        </div>
        <p>{error}</p>
        <button type="submit" onClick={submitLogin} className="btn btn-primary">
          Submit
        </button>
        <button
          className="btn btn-primary"
          onClick={() => props.changeAuthen(3)}
        >
          Fotget Pass
        </button>
      </form>
    </div>
  );
};
