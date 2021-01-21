import React, { createContext, useEffect, useState } from "react";

interface IAuth {
    token: string;
    isAuthenticated: boolean;
    authenticate: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<Partial<IAuth>>({});

const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Dependency list is empty because this useEffect should only work once(when the app mounts)
    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            authenticate(token);
        }
    }, []);

    const authenticate = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken("");
        setIsAuthenticated(false);
        localStorage.removeItem("ACCESS_TOKEN");
    };

    return <AuthContext.Provider value={{ token, isAuthenticated, authenticate, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
