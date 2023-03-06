import React, { useState } from "react";
import { Login } from "../UserComponent/Login";
import { ResetPassword } from "../UserComponent/ResetPassword";
import { SignUp } from "../UserComponent/SignUp";

export const Authentication = () => {
  const [authenState, setAuthenState] = useState(1);
  const changeAuthen = (authenNumber) => {
    setAuthenState(authenNumber);
  };
  return authenState === 1 ? (
    <Login changeAuthen={changeAuthen} />
  ) : authenState === 2 ? (
    <SignUp changeAuthen={changeAuthen} />
  ) : (
    <ResetPassword />
  );
};
