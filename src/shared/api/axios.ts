import axiosStatic, {AxiosRequestConfig} from 'axios';
import {tokenInterceptor} from '../config/interceptor/token-interceptor';

const baseUrl = 'https://donence.herokuapp.com';

const defaultConfig: AxiosRequestConfig = {
    baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
    const instance = axiosStatic.create(baseConfig);

    instance.interceptors.request.use(tokenInterceptor);

    return instance;
}

export default createAxios(defaultConfig);