import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Menu} from "./components/molecules/Menu";
import AuthProvider from "./context/AuthContext";
import {Login} from "./pages/Login/Login";
import {OAuth2RedirectHandler} from "./pages/Login/Oauth2RedirectHandler";
import AddRecyclePoint from "./pages/AdminPanel/AddRecyclePoint";
import RecyclePoint from "./pages/AdminPanel/RecyclePoint";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Menu isOpen={isOpen} toggle={handleToggle}/>
                <Switch>
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                    <Route exact path="/giris-yap" component={Login}/>
                    <Route exact path="/admin" component={AdminPanel}/>
                    <Route exact path="/admin/recycle-point" component={RecyclePoint}/>
                    <Route exact path="/admin/recycle-point/new" component={AddRecyclePoint}/>
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
