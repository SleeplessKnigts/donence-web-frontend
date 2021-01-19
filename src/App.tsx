import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Menu } from "./components/molecules/Menu";
import { Login } from "./pages/Login/Login";
import { OAuth2RedirectHandler } from "./pages/Login/Oauth2RedirectHandler";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <Menu isOpen={isOpen} toggle={handleToggle} />
            <Switch>
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                <Route exact path="/giris-yap" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
