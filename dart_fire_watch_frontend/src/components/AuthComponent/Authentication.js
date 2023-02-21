import React, { useState } from "react";
import { Login } from "../UserComponent/Login";
import { SignUp } from "../UserComponent/SignUp";

export const Authentication = () => {
  const [login, setLogin] = useState(true);
  const changeAuthen = () => { 
    setLogin(!login);
  }
  return login === true ? <Login changeAuthen={changeAuthen} /> : <SignUp changeAuthen={changeAuthen} />;
};
