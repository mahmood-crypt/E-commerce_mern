import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvidor : FC<PropsWithChildren> = ({children}) => {
    const [username , setUserName] = useState<string|null>(localStorage.getItem("username"));
    const [token , setToken] = useState<string|null>(localStorage.getItem("token"));

    const isAuthenticated = !!token;

    const login = (username : string,token : string) => {
        setUserName(username);
        setToken(token);
        localStorage.setItem("username" , username);
        localStorage.setItem("token" , token);
    }

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUserName(null);
        setToken(null);
    }



    return(
        <AuthContext.Provider value = {{username,token,login,isAuthenticated,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvidor