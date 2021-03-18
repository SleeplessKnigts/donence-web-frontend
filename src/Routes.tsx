import React, { useContext } from "react";
import { Route, Switch } from "react-router";
import { AuthContext } from "./context/AuthContext";
import AddRecyclePoint from "./pages/AdminPanel/AddRecyclePoint";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { OAuth2RedirectHandler } from "./pages/Login/Oauth2RedirectHandler";
import { EventPoints } from "./pages/User/EventPoints";
import { RecyclingPoints } from "./pages/User/RecyclingPoints";

export const Routes: React.FC = () => {
    const { userType } = useContext(AuthContext);

    let authorizedRouteSet;
    switch (userType) {
        case "395cc606-30da-4789-9bd3-acc1add79ef9":
            authorizedRouteSet = [
                <Route exact path="/admin" component={AdminPanel} />,
                <Route exact path="/admin/recycle-point" component={AddRecyclePoint} />,
                <Route exact path="/admin/recycle-point/new" component={AddRecyclePoint} />,
            ];
            break;
        case "8a6ee639-a7e6-456f-af12-2b714df5fecd":
            authorizedRouteSet = [
                <Route
                    exact
                    path="/user/panel"
                    component={() => <h1>User panel, admin should not see the layout</h1>}
                />,
                <Route exact path="/donusum-noktalari" component={RecyclingPoints} />,
                <Route exact path="/toplama-noktalari" component={EventPoints} />,
                <Route exact path="/user/katkilarim" component={() => <h1>Katkilarim</h1>} />,
                <Route exact path="/user/me" component={() => <h1>Kullanici bilgileri</h1>} />,
            ];
            break;
        case "2612bedd-ae65-4ed6-a8e1-8c7f868294d6":
            authorizedRouteSet = [
                <Route
                    exact
                    path="/driver/panel"
                    component={() => <h1>Driver panel, admin should not see the layout</h1>}
                />,
            ];
            break;
        default:
            break;
    }

    return (
        <Switch>
            {authorizedRouteSet?.map((el, index) => {
                return el
            })}
            <Route exact path="/haberler" component={() => <h1>Haberler page</h1>} />
            <Route exact path="/giris-yap" component={Login} />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={() => <h1>No such url</h1>} />
        </Switch>
    );
};
