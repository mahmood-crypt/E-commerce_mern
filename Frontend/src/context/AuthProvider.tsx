import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../constants/BaseUrl";

const AuthProvidor: FC<PropsWithChildren> = ({ children }) => {

    const [myOrders,setMyOrders] = useState([])

  const [username, setUserName] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };

  const getMyOrders = async () => {
    const Response = await fetch(`${BASE_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!Response.ok) {
      return;
    }

    const data = await Response.json();
    setMyOrders(data)
};

  return (
    <AuthContext.Provider
      value={{ username, token, login, isAuthenticated, logout,getMyOrders ,myOrders }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvidor;
