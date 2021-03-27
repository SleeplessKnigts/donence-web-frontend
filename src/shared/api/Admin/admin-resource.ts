import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AssignRole, CollectionEvent, RecyclePoint, UserRequest } from "../../types";

export class AdminResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

    newRecyclePoint = (data: RecyclePoint) =>
        this.axios.post("admin/recycle-point/new", data, this.axiosRequestConfig).then((r) => r.data);

    getRecyclePoints = (): Promise<RecyclePoint[]> =>
        this.axios.get("admin/recycle-point/", this.axiosRequestConfig).then((r) => r.data);

    assignNewRole = (data: AssignRole): Promise<any> => {
        return this.axios
            .post("admin/assign-role", data, this.axiosRequestConfig)
            .then((r) => r.data)
            .catch((e) => console.error(e));
    };

    getRequestList = (): Promise<UserRequest[]> =>
        this.axios.get("admin/requests", this.axiosRequestConfig).then((r) => r.data);

    
    getUserRequestList = (data?: string, isActive?: boolean): Promise<Request[]>=> 
        this.axios.get("admin/requests/" + data + "/" + isActive, this.axiosRequestConfig).then((r) => r.data);

    getEventList = (): Promise<CollectionEvent[]> =>
        this.axios.get("admin/collection-event", this.axiosRequestConfig).then((r) => r.data);

    newEventList = (data: CollectionEvent) =>
        this.axios.post("admin/admin/collection-event/new", data, this.axiosRequestConfig).then((r) => r.data);
}
