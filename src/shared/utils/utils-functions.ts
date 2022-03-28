import React from 'react';
import {AllAppConfig, APP_LOCAL_DATETIME_FORMAT} from "../../core/config/all-config";
import {useLocation} from "react-router-dom";
import dayjs from 'dayjs';

export const isPromise = (value: any): boolean => {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
};


// export const getPathAbsolute = () => {
//     return '/SrfGroupFE';
// }

/**
 *
 * @returns {string}
 */
export const getBaseImageUrl = (path?: string) => {
    return `${process.env.REACT_APP_BASE_URL_FE +  (process.env?.REACT_APP_PUBLIC_URL || '')}` + path;
}

/**
 *
 * @param {string} pathApi
 * @returns {string}
 */
// export const getPathApi = (pathApi: string) => {
//     return process.env.REACT_APP_API_END_POINT + pathApi;
// }

/**
 *
 * @param {IOffer} offer
 * @returns {string}
 */
export const getImageForOffer = (offerId?: number, path?: string) => {
    if (!path) {
        return AllAppConfig.DEFAULT_LAZY_IMAGE;
    }
    return `${process.env.REACT_APP_API_END_POINT}api/offer/public/files/${offerId}/${path}`;
};

/**
 *
 * @param {string} username user
 * @param {string} imageUrl user
 * @returns {string}
 */
export const getUserAvatar = (userId: number, imageUrl?: string, souorceProvider?: string) => {
    // if (!souorceProvider) {
    //     if (!imageUrl) {
    //         return config.DEFAULT_AVATAR;
    //     }
    //     return `${config.BASE_URL}api/user/public/avatar/${userId}/${imageUrl}`;
    // } else if (souorceProvider === SourceProvider.WEB || souorceProvider === SourceProvider.MOBILE) {
    //     if (!imageUrl) {
    //         return config.DEFAULT_AVATAR;
    //     }
    //     return `${config.BASE_URL}api/user/public/avatar/${userId}/${imageUrl}`;
    // }

    // GooglePlus or Facebook
    return imageUrl;
};

/**
 *
 * @returns {URLSearchParams}
 */
export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}



export const convertDateTimeFromServer = (date: Date) => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = (date: Date) => (date ? dayjs(date).toDate() : null);

export const displayDefaultDateTime = () => dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);