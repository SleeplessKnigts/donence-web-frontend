import React, { createContext, useEffect, useState } from "react";

interface IAuth {
    token: string,
    isAuthenticated: boolean
    authenticate: (token: string) => void
}

export const AuthContext = createContext<Partial<IAuth>>({});

const AuthProvider: React.FC = ({children}) => {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const token = localStorage.getItem("ACCESS_TOKEN")
        if(token){
            authenticate(token)
        }
    })

    const authenticate = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{token, isAuthenticated, authenticate}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;