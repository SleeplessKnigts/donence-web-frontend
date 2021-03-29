import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RecyclePoint, UserInfo } from "../../types";


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

    getRecyclingPoints = () : Promise<RecyclePoint[]> => {
        return this.axios.get("user/recycle-point/", this.axiosRequestConfig).then((response) => response.data);
    }
}
