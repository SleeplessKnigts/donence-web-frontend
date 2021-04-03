import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { NewsResponse, RecyclePoint, UserInfo } from "../../types";

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
}
