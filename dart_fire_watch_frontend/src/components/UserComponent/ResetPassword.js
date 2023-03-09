import axios from "axios";
import React, { useState } from "react";
import { Loading } from "../../utils/loading";
export const ResetPassword = (props) => {
  const ROOT_BACKEND = "http://localhost:5000";
  const [emailReset, setEmailReset] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submitReset = async (e) => {
    e.preventDefault();
    if (!emailReset) {
      setError("Email cannot empty");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${ROOT_BACKEND}/auth/resetpassword`, {
        email: emailReset,
      });
      setError(res.message)
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };
  return (
    <div className="container">
      {loading && <Loading />}
      <form action={`${ROOT_BACKEND}/auth/login`} method="POST">
        <h1>Enter your email to reset password</h1>
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
            value={emailReset}
            onChange={(e) => setEmailReset(e.target.value)}
          />
        </div>
        <p>{error}</p>
        <button type="submit" onClick={submitReset} className="btn btn-primary">
          Send email for reset password
        </button>
        <button
          className="btn btn-primary"
          onClick={() => props.changeAuthen(1)}
        >
          Return to login
        </button>
      </form>
    </div>
  );
};
