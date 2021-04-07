import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { NewsResponse, RecyclePoint, requestTypes, UserInfo, UserRequest } from "../../types";

export type status = "all" | "active" | "completed";
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

    getRecyclingPoints = (): Promise<RecyclePoint[]> => {
        return this.axios.get("user/recycle-point/", this.axiosRequestConfig).then((response) => response.data);
    };

    getAllNews = (): Promise<NewsResponse[]> => {
        return this.axios
            .get("user/news", this.axiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };

    getNewsById = (id: number): Promise<NewsResponse> => {
        return this.axios
            .get(`user/news/${id}`, this.axiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };

    getAllRequestsByStatus = (status: status): Promise<UserRequest[]> => {
        console.log("I am being called", status);
        return this.axios
            .get(`user/requests/${status}`, this.axiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };

    getAllRequestsByStatusAndType = (status: status, requestType: requestTypes): Promise<UserRequest[]> => {
        return this.axios
            .get(`user/requests/${requestType}/${status}`, this.axiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };
}
