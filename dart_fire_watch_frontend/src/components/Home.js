import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../utils/loading";

export const Home = () => {
  const ROOT_BACKEND = "http://localhost:5000";
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .get(`${ROOT_BACKEND}/auth/whoAmI`, { headers })
        .then((response) => {
          setUser(response.data.userInfo.email);
          navigate("/auth");
        })
        .catch((error) => {
          navigate("/auth");
        });
      setLoading(false);
    };

    getToken();
  }, [navigate]);

  return <div>{loading ? <Loading /> : <h1>Welcome {user}</h1>}</div>;
};
