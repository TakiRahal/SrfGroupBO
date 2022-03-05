import {IFaq, defaultValue} from "../model/faq.model";
import axios from "axios";
import {getPathApi} from "../utils/utils-functions";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";


export const ACTION_TYPES = {
    FETCH_FAQ_LIST: 'faq/FETCH_FAQ_LIST',
    FETCH_FAQ: 'faq/FETCH_FAQ',
    CREATE_FAQ: 'faq/CREATE_FAQ',
    UPDATE_FAQ: 'faq/UPDATE_FAQ',
    PARTIAL_UPDATE_FAQ: 'faq/PARTIAL_UPDATE_FAQ',
    DELETE_FAQ: 'faq/DELETE_FAQ',
    SET_BLOB: 'faq/SET_BLOB',
    RESET: 'faq/RESET',
};

const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IFaq>,
    loadingEntity: false,
    entity: defaultValue,
    addSuccess: false,
    updateSuccess: false,
    totalItems: 0,
};

export type FaqState = Readonly<typeof initialState>;


// Reducer

export default (state: FaqState = initialState, action: any): FaqState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_FAQ):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.CREATE_FAQ):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.CREATE_FAQ):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            }


        case REQUEST(ACTION_TYPES.FETCH_FAQ_LIST):
            return {
                ...state,
                loadingEntities: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_FAQ_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_FAQ_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
            };

        default:
            return state;
    }
}

const apiUrl = 'api/faq';

// Actions

export const createEntity: (entity: IFaq) => void = (entity: IFaq) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_FAQ,
        payload: axios.post(`${getPathApi(apiUrl)}/admin/create`, entity),
    });
    return result;
};

export const getEntities= (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_FAQ_LIST,
        payload: axios.get<IFaq>(`${getPathApi(requestUrl)}/public`),
    };
};