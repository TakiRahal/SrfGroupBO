import axios from 'axios';
import {defaultValue, ISellOffer} from "../model/sell-offer.model";
import {clearAuthToken} from "./user-reducer";
import {getPathApi} from "../utils/utils-functions";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";

export const ACTION_TYPES = {
    FETCH_SELLOFFER_LIST: 'sellOffer/FETCH_SELLOFFER_LIST',
    FETCH_OFFERS_FOR_SELL: 'sellOffer/FETCH_OFFERS_FOR_SELL',
    FETCH_SELLOFFER: 'sellOffer/FETCH_SELLOFFER',
    CREATE_SELLOFFER: 'sellOffer/CREATE_SELLOFFER',
    UPDATE_SELLOFFER: 'sellOffer/UPDATE_SELLOFFER',
    PARTIAL_UPDATE_SELLOFFER: 'sellOffer/PARTIAL_UPDATE_SELLOFFER',
    DELETE_SELLOFFER: 'sellOffer/DELETE_SELLOFFER',
    RESET: 'sellOffer/RESET',
};

const initialState = {
    loadingEntity: false,
    entity: defaultValue,
    updateSuccess: false,
    entities: [] as ReadonlyArray<ISellOffer>,
    loadingEntities: false,
    errorMessage: null,
};

export type SellOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: SellOfferState = initialState, action: any): SellOfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_SELLOFFER):
            return {
                ...state,
                loadingEntity: true,
            };
        case FAILURE(ACTION_TYPES.CREATE_SELLOFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_SELLOFFER):
            return {
                ...state,
                loadingEntity: false,
                updateSuccess: true,
                entity: action.payload.data,
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };
    }
    return state;
}

const apiUrl = 'api/sell-offer/';

// Actions

export const createEntity: (entity: any) => void = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_SELLOFFER,
        payload: axios.post(`${getPathApi(apiUrl)}create`, entity),
    });
    return result;
};

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_SELLOFFER_LIST,
        payload: axios.get<ISellOffer>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
    };
};

export const getEntitiesForSell = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/public${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_OFFERS_FOR_SELL,
        payload: axios.get<ISellOffer>(`${requestUrl}`),
    };
};

export const getEntity  = (id: number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_SELLOFFER,
        payload: axios.get<ISellOffer>(requestUrl),
    };
};

export const updateEntity = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_SELLOFFER,
        payload: axios.put(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const partialUpdate = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.PARTIAL_UPDATE_SELLOFFER,
        payload: axios.patch(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const deleteEntity = (id: number) => async (dispatch: any) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_SELLOFFER,
        payload: axios.delete(requestUrl),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});
