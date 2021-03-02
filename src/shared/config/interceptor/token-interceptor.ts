import { AxiosRequestConfig } from 'axios';
import {getAccessToken} from '../../util';


export const tokenInterceptor = (config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
};
