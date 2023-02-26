import axios from "axios";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const ROOT_BACKEND = "http://localhost:5000";
  const [user, setUser] = useState();
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .get(`${ROOT_BACKEND}/auth/whoAmI`, { headers })
        .then((response) => {
          setUser(response.data.userInfo.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getToken();
  }, []);

  return <div>Welcome {user}</div>;
};
