import {defaultValue, IRentOffer} from "../model/rent-offer.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import axios from "axios";
import {IFindOffer} from "../model/find-offer.model";
import {getPathApi} from "../utils/utils-functions";


export const ACTION_TYPES = {
    FETCH_FINDOFFER_LIST: 'findOffer/FETCH_FINDOFFER_LIST',
    FETCH_OFFERS_FOR_FIND: 'findOffer/FETCH_OFFERS_FOR_FIND',
    FETCH_FINDOFFER: 'findOffer/FETCH_FINDOFFER',
    CREATE_FINDOFFER: 'findOffer/CREATE_FINDOFFER',
    UPDATE_FINDOFFER: 'findOffer/UPDATE_FINDOFFER',
    PARTIAL_UPDATE_FINDOFFER: 'findOffer/PARTIAL_UPDATE_FINDOFFER',
    DELETE_FINDOFFER: 'findOffer/DELETE_FINDOFFER',
    RESET: 'findOffer/RESET',
};

const initialState = {
    loadingEntity: false,
    entity: defaultValue,
    updateSuccess: false,
    entities: [] as ReadonlyArray<IRentOffer>,
    loadingEntities: false,
    errorMessage: null,
};


export type FindOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: FindOfferState = initialState, action: any): FindOfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_FINDOFFER):
            return {
                ...state,
                loadingEntity: true,
            };
        case FAILURE(ACTION_TYPES.CREATE_FINDOFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_FINDOFFER):
            return {
                ...state,
                loadingEntity: false,
                updateSuccess: true,
                entity: action.payload.data,
            };
        default:
            return state;
    }
}


const apiUrl = 'api/find-offer/';

// Actions

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_FINDOFFER_LIST,
        payload: axios.get<IFindOffer>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
    };
};

export const getEntitiesForFind = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/public${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_OFFERS_FOR_FIND,
        payload: axios.get<IFindOffer>(`${requestUrl}`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_FINDOFFER,
        payload: axios.get<IFindOffer>(requestUrl),
    };
};

export const createEntity: (entity: any) => void = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_FINDOFFER,
        payload: axios.post(`${getPathApi(apiUrl)}create`, entity)
    });
    return result;
};

export const updateEntity = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_FINDOFFER,
        payload: axios.put(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const partialUpdate = (entity: any) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.PARTIAL_UPDATE_FINDOFFER,
        payload: axios.patch(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const deleteEntity = (id: number) => async (dispatch: any) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_FINDOFFER,
        payload: axios.delete(requestUrl),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});