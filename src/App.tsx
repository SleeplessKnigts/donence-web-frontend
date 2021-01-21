import React, { useState } from "react";
import { useContext } from "react-dom/node_modules/@types/react";
import { useEffect } from "react-dom/node_modules/@types/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Menu } from "./components/molecules/Menu";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { Login } from "./pages/Login/Login";
import { OAuth2RedirectHandler } from "./pages/Login/Oauth2RedirectHandler";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Menu isOpen={isOpen} toggle={handleToggle} />
                <Switch>
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                    <Route exact path="/giris-yap" component={Login} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
