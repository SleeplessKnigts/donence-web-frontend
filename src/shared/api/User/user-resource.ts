import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RecyclePoint } from "../../types";


export class UserResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

    getProfileInfo = (): Promise<any> => {
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
