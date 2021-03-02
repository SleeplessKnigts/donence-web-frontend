import axiosStatic, {AxiosRequestConfig} from 'axios';
import {tokenInterceptor} from '../config/interceptor/token-interceptor';

const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
    baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
    const instance = axiosStatic.create(baseConfig);

    instance.interceptors.request.use(tokenInterceptor);

    return instance;
}

export default createAxios(defaultConfig);