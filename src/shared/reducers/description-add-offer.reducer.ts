import axios from 'axios';
import {defaultValue, IDescriptionAddOffer} from "../model/description-add-offer.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";


export const ACTION_TYPES = {
    FETCH_DESCRIPTIONADDOFFER_LIST: 'descriptionAddOffer/FETCH_DESCRIPTIONADDOFFER_LIST',
    FETCH_DESCRIPTIONADDOFFER: 'descriptionAddOffer/FETCH_DESCRIPTIONADDOFFER',
    FETCH_PUBLIC_DESCRIPTIONADDOFFER: 'descriptionAddOffer/FETCH_PUBLIC_DESCRIPTIONADDOFFER',
    CREATE_DESCRIPTIONADDOFFER: 'descriptionAddOffer/CREATE_DESCRIPTIONADDOFFER',
    UPDATE_DESCRIPTIONADDOFFER: 'descriptionAddOffer/UPDATE_DESCRIPTIONADDOFFER',
    PARTIAL_UPDATE_DESCRIPTIONADDOFFER: 'descriptionAddOffer/PARTIAL_UPDATE_DESCRIPTIONADDOFFER',
    DELETE_DESCRIPTIONADDOFFER: 'descriptionAddOffer/DELETE_DESCRIPTIONADDOFFER',
    SET_BLOB: 'descriptionAddOffer/SET_BLOB',
    RESET: 'descriptionAddOffer/RESET',
};

const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IDescriptionAddOffer>,
    loadingEntity: false,
    entity: defaultValue,
    addSuccess: false,
    updateSuccess: false,
    totalItems: 0,
};

export type DescriptionAddOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: DescriptionAddOfferState = initialState, action: any): DescriptionAddOfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
            return{
                ...state,
                loadingEntity: true,
                addSuccess: false
            }

        case FAILURE(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
            return {
                ...state,
                addSuccess: true,
                loadingEntity: false,
                entity: action.payload.data
            }


        case REQUEST(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST):
            return{
                ...state,
                loadingEntities: true,
                addSuccess: false
            }

        case FAILURE(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
                totalItems: action.payload.data.totalElements
            }


        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

const apiUrl = 'api/description-add-offers';

// Actions

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}`;
    return {
        type: ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST,
        payload: axios.get<IDescriptionAddOffer>(`${requestUrl}/admin/list`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER,
        payload: axios.get<IDescriptionAddOffer>(requestUrl),
    };
};

export const getPublicEntity = () => {
    const requestUrl = `${apiUrl}/public/last`;
    return {
        type: ACTION_TYPES.FETCH_PUBLIC_DESCRIPTIONADDOFFER,
        payload: axios.get<IDescriptionAddOffer>(requestUrl),
    };
};

export const createEntity: (entity: IDescriptionAddOffer) => void = (entity: IDescriptionAddOffer) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER,
        payload: axios.post(apiUrl+'/admin/create', entity),
    });
    return result;
};

export const updateEntity: (entity: IDescriptionAddOffer) => void = (entity: IDescriptionAddOffer) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_DESCRIPTIONADDOFFER,
        payload: axios.put(`${apiUrl}/${entity.id}`, entity),
    });
    return result;
};

export const deleteEntity = (id: number) => async (dispatch: any) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_DESCRIPTIONADDOFFER,
        payload: axios.delete(requestUrl),
    });
    return result;
};


export const reset = () => ({
    type: ACTION_TYPES.RESET,
});
