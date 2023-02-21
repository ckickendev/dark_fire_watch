import React from "react";

export const SignUp = (props) => {
  const ROOT_BACKEND = 'http://localhost:5000';
  return (
    <div className="container">
      <form action={`${ROOT_BACKEND}/auth/signup`} method="POST">
        <h1>Sign Up</h1>
        <button onClick={props.changeAuthen}>Login</button>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
