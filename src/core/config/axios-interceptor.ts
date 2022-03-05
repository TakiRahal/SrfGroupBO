import axios from 'axios';

import {StorageService} from "../../shared/services/storage.service";
import {AllAppConfig} from "./all-config";
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
// axios.defaults.baseURL = config.BASE_URL;

const setupAxiosInterceptors = (onUnauthenticated: any) => {
    const onRequestSuccess = (config: any) => {
        const token = StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER) || StorageService.session.get(AllAppConfig.NAME_TOKEN_CURRENT_USER);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // BackDropService.toggleLoading(true);

        return config;
    };
    const onRequestError = (error: any) => {

    };

    const onResponseSuccess = (response: any) => {
        return response;
    };
    const onResponseError = (err: any) => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess, onRequestError);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
