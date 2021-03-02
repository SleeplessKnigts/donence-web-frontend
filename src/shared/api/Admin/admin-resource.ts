import axiosStatic, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {RecyclePoint} from '../../types';

export class AdminResource {
    constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {
    }

    newRecyclePoint = (data: RecyclePoint) =>
        this.axios
            .post('admin/recycle-point/new', data, this.axiosRequestConfig)
            .then((r) => r.data);


    getRecyclePoints = (): Promise<RecyclePoint[]> =>
        this.axios
            .get('admin/recycle-point/', this.axiosRequestConfig)
            .then((r) => r.data);
}
