import axios from 'axios';
import {defaultValue, ICommentOffer} from "../model/comment-offer.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";

export const ACTION_TYPES = {
    FETCH_COMMENTOFFER_LIST: 'commentOffer/FETCH_COMMENTOFFER_LIST',
    FETCH_COMMENTOFFER_LIST_BY_OFFER: 'commentOffer/FETCH_COMMENTOFFER_LIST_BY_OFFER',
    FETCH_COMMENTOFFER: 'commentOffer/FETCH_COMMENTOFFER',
    CREATE_COMMENTOFFER: 'commentOffer/CREATE_COMMENTOFFER',
    UPDATE_COMMENTOFFER: 'commentOffer/UPDATE_COMMENTOFFER',
    PARTIAL_UPDATE_COMMENTOFFER: 'commentOffer/PARTIAL_UPDATE_COMMENTOFFER',
    DELETE_COMMENTOFFER: 'commentOffer/DELETE_COMMENTOFFER',
    SET_BLOB: 'commentOffer/SET_BLOB',
    RESET: 'commentOffer/RESET',
};

const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ICommentOffer>,
    loadingEntity: false,
    entity: defaultValue,
    totalItems: 0,
    addSuccess: false,
    updateSuccess: false,
    entitiesByOffer: [] as ReadonlyArray<ICommentOffer>,
    loadingEntitiesByOffer: false,
    loadingUpdateEntity: false,
};

export type CommentOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: CommentOfferState = initialState, action: any): CommentOfferState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_COMMENTOFFER_LIST_BY_OFFER):
            return {
                ...state,
                loadingEntitiesByOffer: true
            };
        case FAILURE(ACTION_TYPES.FETCH_COMMENTOFFER_LIST_BY_OFFER):
            return {
                ...state,
                loadingEntitiesByOffer: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_COMMENTOFFER_LIST_BY_OFFER): {
            return {
                ...state,
                loadingEntitiesByOffer: false,
                entitiesByOffer: action.payload.data.content,
                totalItems: action.payload.data.totalElements
            };
        }


        case REQUEST(ACTION_TYPES.CREATE_COMMENTOFFER):
            return {
                ...state,
                loadingEntity: true,
                addSuccess: false,
            };
        case FAILURE(ACTION_TYPES.CREATE_COMMENTOFFER):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_COMMENTOFFER):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            };


        case ACTION_TYPES.SET_BLOB: {
            const {name, data, contentType} = action.payload;
            return {
                ...state,
                entity: {
                    ...state.entity,
                    [name]: data,
                    [name + 'ContentType']: contentType,
                },
            };
        }


        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

const apiUrl = 'api/comment-offer';

// Actions


export const getEntitiesByOffer = (offerId: number, page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/by-offer/${offerId}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_COMMENTOFFER_LIST_BY_OFFER,
        payload: axios.get<ICommentOffer>(`${requestUrl}`),
    };
};

export const addCommentOffer: (entity: ICommentOffer) => void = (entity: ICommentOffer) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_COMMENTOFFER,
        payload: axios.post(`${apiUrl}/create`, entity),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});
