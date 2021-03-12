import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Menu } from "./components/molecules/Menu";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login/Login";
import { OAuth2RedirectHandler } from "./pages/Login/Oauth2RedirectHandler";
import AddRecyclePoint from "./pages/AdminPanel/AddRecyclePoint";
import RecyclePoint from "./pages/AdminPanel/AddRecyclePoint";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { Home } from "./pages/Home/Home";
import { Routes } from "./Routes";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Menu isOpen={isOpen} toggle={handleToggle} />
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
