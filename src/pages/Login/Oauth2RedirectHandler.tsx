import React from "react";
import { Redirect } from "react-router-dom";
import { getUrlParameter } from "../../shared/util";

export const OAuth2RedirectHandler = (props: any) => {
    const accessToken = getUrlParameter("token", props.location.search);
    const error = getUrlParameter("error", props.location.search);
    const userType = getUrlParameter("userType", props.location.search);

    if (accessToken) {
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        localStorage.setItem("USER_TYPE", userType);
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: { from: props.location },
                }}
            />
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/giris-yap",
                    state: {
                        from: props.location,
                        error: error,
                    },
                }}
            />
        );
    }
};
