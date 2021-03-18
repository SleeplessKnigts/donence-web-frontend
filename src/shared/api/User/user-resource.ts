import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { UserInfo } from "../../types";


export class UserResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

    getProfileInfo = (): Promise<UserInfo> => {
        return this.axios
            .get("user/me", this.axiosRequestConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    };
}
