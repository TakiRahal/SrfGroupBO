import axios from 'axios';
import {defaultValue, IOffer} from "../model/offer.model";
import {getPathApi} from "../utils/utils-functions";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {defaultValueOFU, IOfferFavoriteUser} from "../model/offer-favorite-user";

export const ACTION_TYPES = {
    FETCH_OFFER_LIST: 'offer/FETCH_OFFER_LIST',
    UPLOAD_FILE_OFFER: 'offer/UPLOAD_FILE_OFFER',
    FETCH_MY_OFFER_LIST: 'offer/FETCH_MY_OFFER_LIST',
    FETCH_OFFER_LIST_FOR_USER: 'offer/FETCH_OFFER_LIST_FOR_USER',
    FETCH_OFFER_LIST_ADDED_RECENTLY: 'offer/FETCH_OFFER_LIST_ADDED_RECENTLY',
    FETCH_OFFER: 'offer/FETCH_OFFER',
    CREATE_OFFER: 'offer/CREATE_OFFER',
    UPDATE_OFFER: 'offer/UPDATE_OFFER',
    PARTIAL_UPDATE_OFFER: 'offer/PARTIAL_UPDATE_OFFER',
    DELETE_OFFER: 'offer/DELETE_OFFER',
    SET_BLOB: 'offer/SET_BLOB',
    RESET: 'offer/RESET',
};

const initialState = {
    loadingEntity: false,
    entity: defaultValueOFU,
    updateSuccess: false,
    entities: [] as ReadonlyArray<IOffer>,
    loadingEntities: false,
    errorMessage: null,
    totalItems: 0,

    entitiesForUser: [] as ReadonlyArray<IOffer>,
    loadingEntitiesForUser: false,
};

export type OfferState = Readonly<typeof initialState>;

// Reducer

export default (state: OfferState = initialState, action: any): OfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_OFFER_LIST):
            return {
                ...state,
                loadingEntities: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_OFFER_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_OFFER_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
                totalItems: action.payload.data.totalElements
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };


        case REQUEST(ACTION_TYPES.FETCH_OFFER):
            return {
                ...state,
                loadingEntity: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_OFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_OFFER):
            return {
                ...state,
                loadingEntity: false,
                entity: action.payload.data,
            };


        case REQUEST(ACTION_TYPES.FETCH_OFFER_LIST_FOR_USER):
            return {
                ...state,
                loadingEntitiesForUser: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_OFFER_LIST_FOR_USER):
            return {
                ...state,
                loadingEntitiesForUser: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_OFFER_LIST_FOR_USER): {
            return {
                ...state,
                loadingEntitiesForUser: false,
                entitiesForUser: action.payload.data.content,
            };
        }

        default:
            return state;
    }
}


const apiUrl = 'api/offer';

// Actions

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl + '/public'}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_OFFER_LIST,
        payload: axios.get<IOffer>(`${getPathApi(requestUrl)}`),
    };
};

export const getEntitiesForCurrentUser = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl + '/current-user'}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_MY_OFFER_LIST,
        payload: axios.get<IOffer>(`${requestUrl}`),
    };
};

export const getEntitiesRecentlyAdded = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl + '/public'}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_OFFER_LIST_ADDED_RECENTLY,
        payload: axios.get<IOffer>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_OFFER,
        payload: axios.get<IOffer>(requestUrl),
    };
};


export const getEntitywithFavorite = (id: string) => {
    const requestUrl = `${apiUrl}/public/${id}`;
    return {
        type: ACTION_TYPES.FETCH_OFFER,
        payload: axios.get<IOfferFavoriteUser>(`${getPathApi(requestUrl)}`),
    };
};

export const getPublicEntitiesForUser = (page: number, size: number, sort: string, userId: number) => {
    const requestUrl = `${apiUrl + '/public'}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_OFFER_LIST_FOR_USER,
        payload: axios.get<any>(`${getPathApi(requestUrl)}?user.id=${userId}`),
    };
};

export const createEntity = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_OFFER,
        payload: axios.post(apiUrl, entity),
    });
    return result;
};

export const updateEntity = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_OFFER,
        payload: axios.put(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const partialUpdate = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.PARTIAL_UPDATE_OFFER,
        payload: axios.patch(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const deleteEntity = (id: number) => async (dispatch: any) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_OFFER,
        payload: axios.delete(requestUrl),
    });
    return result;
};

export const setBlob = (name: string, data: string, contentType?: string) => ({
    type: ACTION_TYPES.SET_BLOB,
    payload: {
        name,
        data,
        contentType,
    },
});


export const uploadFiles: (entity: FormData) => void = (entity: FormData) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPLOAD_FILE_OFFER,
        payload: axios.post(`${getPathApi(apiUrl)}upload-images`, entity),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});