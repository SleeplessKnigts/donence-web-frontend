import React, { createContext, useEffect, useState } from "react";

interface IAuth {
    token: string;
    isAuthenticated: boolean;
    userType: string;
    authenticate: (token: string, userType: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<Partial<IAuth>>({});

const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState("");

    //Dependency list is empty because this useEffect should only work once(when the app mounts)
    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const userType = localStorage.getItem("USER_TYPE");
        if (token && userType) {
            authenticate(token, userType);
        }
    }, []);

    const authenticate = (token: string, userType: string) => {
        setToken(token);
        setUserType(userType);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken("");
        setUserType("");
        setIsAuthenticated(false);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_TYPE");
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, authenticate, logout, userType }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
