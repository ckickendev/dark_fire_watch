import axios from "axios";
import React, { useState } from "react";
import { redirect } from "react-router-dom";

export const Login = (props) => {
  const ROOT_BACKEND = "http://localhost:5000";
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ROOT_BACKEND}/auth/login`, loginInfo);
      localStorage.setItem("access_token", res.data.data.access_token);
      redirect('/home');
    } catch (err) {
      setError(err.response.data.error);
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
      <form action={`${ROOT_BACKEND}/auth/login`} method="POST">
        <h1>Login</h1>
        <button onClick={props.changeAuthen}>SignUp</button>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginInfo.email}
            onChange={(e) => changeValue(e, "email")}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={loginInfo.password}
            onChange={(e) => changeValue(e, "password")}
          />
        </div>
        <p>{error}</p>
        <button type="submit" onClick={submitLogin} class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
