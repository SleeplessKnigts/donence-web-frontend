import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AssignRole, CollectionEvent, News, RecyclePoint, UserRequest } from "../../types";

export class AdminResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

    newRecyclePoint = (data: RecyclePoint) =>
        this.axios.post("admin/recycle-point/new", data, this.axiosRequestConfig).then((r) => r.data);

    getRecyclePoints = (): Promise<RecyclePoint[]> =>
        this.axios.get("admin/recycle-point/", this.axiosRequestConfig).then((r) => r.data);
    
    deleteRecyclePoints = (recyclePointId:number) => {
        return this.axios
        .delete("admin/recycle-point/delete/"+recyclePointId, this.axiosRequestConfig)
        .then((r) => r.data)
        .catch((e) => console.error(e));
    }

    updateRecyclePoint = (data: RecyclePoint) =>  
        this.axios.put("admin/recycle-point/update", data, this.axiosRequestConfig).then((r) => r.data);

    assignNewRole = (data: AssignRole): Promise<any> => {
        return this.axios
            .post("admin/assign-role", data, this.axiosRequestConfig)
            .then((r) => r.data)
            .catch((e) => console.error(e));
    };

    getRequestList = (): Promise<UserRequest[]> =>
        this.axios.get("admin/requests", this.axiosRequestConfig).then((r) => r.data);

    getUserRequestList = (data?: string, isActive?: boolean): Promise<Request[]> =>
        this.axios.get("admin/requests/" + data + "/" + isActive, this.axiosRequestConfig).then((r) => r.data);

    getEventList = (): Promise<CollectionEvent[]> =>
        this.axios.get("admin/collection-event", this.axiosRequestConfig).then((r) => r.data);

    newEventList = (data: CollectionEvent) =>
        this.axios.post("admin/admin/collection-event/new", data, this.axiosRequestConfig).then((r) => r.data);

    deleteEvent = (collectionEventId:number) => {
            return this.axios
            .delete("admin/collection-event/delete/"+collectionEventId, this.axiosRequestConfig)
            .then((r) => r.data)
            .catch((e) => console.error(e));
    }
    
    updateEvent = (data: CollectionEvent) => {
            return this.axios
            .put("admin/collection-event/update",data, this.axiosRequestConfig)
            .then((r) => r.data)
            .catch((e) => console.error(e));
    }

    createNews = (data: News) => {
        return this.axios
            .post("admin/news", data, this.axiosRequestConfig)
            .then((response) => response.data)
            .catch((err) => err);
    };
}
