import axios from 'axios';
import {defaultValue, IRentOffer} from "../model/rent-offer.model";
import {getPathApi} from "../utils/utils-functions";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";


export const ACTION_TYPES = {
    FETCH_RENTOFFER_LIST: 'rentOffer/FETCH_RENTOFFER_LIST',
    FETCH_OFFERS_FOR_RENT: 'rentOffer/FETCH_OFFERS_FOR_RENT',
    FETCH_RENTOFFER: 'rentOffer/FETCH_RENTOFFER',
    CREATE_RENTOFFER: 'rentOffer/CREATE_RENTOFFER',
    UPDATE_RENTOFFER: 'rentOffer/UPDATE_RENTOFFER',
    PARTIAL_UPDATE_RENTOFFER: 'rentOffer/PARTIAL_UPDATE_RENTOFFER',
    DELETE_RENTOFFER: 'rentOffer/DELETE_RENTOFFER',
    RESET: 'rentOffer/RESET',
};

const initialState = {
    loadingEntity: false,
    entity: defaultValue,
    updateSuccess: false,
    entities: [] as ReadonlyArray<IRentOffer>,
    loadingEntities: false,
    errorMessage: null,
};

export type RentOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: RentOfferState = initialState, action: any): RentOfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_RENTOFFER):
            return {
                ...state,
                loadingEntity: true,
            };

        case FAILURE(ACTION_TYPES.CREATE_RENTOFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_RENTOFFER):
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
        default:
            return state;
    }
}


const apiUrl = 'api/rent-offer/';

// Actions

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_RENTOFFER_LIST,
        payload: axios.get<IRentOffer>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_RENTOFFER,
        payload: axios.get<IRentOffer>(requestUrl),
    };
};

export const createEntity: (entity: any) => void = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_RENTOFFER,
        payload: axios.post(`${getPathApi(apiUrl)}create`, entity)
    });
    return result;
};

export const updateEntity = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_RENTOFFER,
        payload: axios.put(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const partialUpdate = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.PARTIAL_UPDATE_RENTOFFER,
        payload: axios.patch(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const deleteEntity = (id: number) => async (dispatch: any) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_RENTOFFER,
        payload: axios.delete(requestUrl),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});
