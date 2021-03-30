import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { AuthContext } from "./context/AuthContext";
import { AddNews } from "./pages/AdminPanel/AddNews";
import AddRecyclePoint from "./pages/AdminPanel/AddRecyclePoint";
import { UserPermissions } from "./pages/AdminPanel/UserPermissions";
import { AdminHomePage } from "./pages/Home/AdminHomePage";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { OAuth2RedirectHandler } from "./pages/Login/Oauth2RedirectHandler";
import { EventPoints } from "./pages/User/EventPoints";
import { RecyclingPoints } from "./pages/User/RecyclingPoints";

interface routeProps {
    exact: boolean;
    path: string;
    component: React.FC;
}

export const Routes: React.FC = () => {
    const { userType } = useContext(AuthContext);

    const [authorizedRouteSet, setAuthorizedRouteSet] = useState<routeProps[]>();

    useEffect(() => {
        switch (userType) {
            case "395cc606-30da-4789-9bd3-acc1add79ef9":
                setAuthorizedRouteSet([
                    { component: AdminHomePage, path: "/", exact: false },
                ]);
                break;
            case "8a6ee639-a7e6-456f-af12-2b714df5fecd":
                setAuthorizedRouteSet([
                    { component: RecyclingPoints, path: "/donusum-noktalari", exact: true },
                    { component: EventPoints, path: "/toplama-noktalari", exact: true },
                    { component: () => <h1>Katkilarim</h1>, path: "/user/katkilarim", exact: true },
                    { component: () => <h1>Kullanici bilgileri</h1>, path: "/user/me", exact: true },
                ]);

                break;
            default:
                break;
        }
    }, [userType]);

    return (
        <Switch>
            {authorizedRouteSet?.map((el) => {
                return <Route path={el.path} component={el.component} key={el.path} exact={el.exact} />;
            })}
            <Route exact path="/haberler" component={() => <h1>Haberler page</h1>} />
            <Route exact path="/giris-yap" component={Login} />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={() => <h1>No such url</h1>} />
        </Switch>
    );
};
