import axios from "axios";
import {defaultValue, ICategory} from "../model/category.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";


export const ACTION_TYPES = {
    FETCH_CATEGORY_LIST: 'category/FETCH_CATEGORY_LIST',
    FETCH_PUBLIC_CATEGORY_LIST: 'category/FETCH_PUBLIC_CATEGORY_LIST',
    FETCH_CATEGORY: 'category/FETCH_CATEGORY',
    CREATE_CATEGORY: 'category/CREATE_CATEGORY',
    UPDATE_CATEGORY: 'category/UPDATE_CATEGORY',
    PARTIAL_UPDATE_CATEGORY: 'category/PARTIAL_UPDATE_CATEGORY',
    DELETE_CATEGORY: 'category/DELETE_CATEGORY',
    RESET: 'category/RESET',
};

const initialState = {
    loadingEntity: false,
    entity: defaultValue,
    entities: [] as ReadonlyArray<ICategory>,
    loadingEntities: false,
    addSuccess: false,
    updateSuccess: false,
    errorMessage: null,
    totalItems: 0,
}

export type CategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoryState = initialState, action: any): CategoryState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.FETCH_CATEGORY):
            return {
                ...state,
                loadingEntity: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_CATEGORY):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_CATEGORY):
            return {
                ...state,
                loadingEntity: false,
                entity: action.payload.data
            };


        case REQUEST(ACTION_TYPES.FETCH_CATEGORY_LIST):
            return {
                ...state,
                loadingEntities: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_CATEGORY_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_CATEGORY_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
                totalItems: action.payload.data.totalElements
            };


        case REQUEST(ACTION_TYPES.CREATE_CATEGORY):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.CREATE_CATEGORY):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.CREATE_CATEGORY):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            }


        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };


        default:
            return state;
    }
}

const apiUrl = 'api/category';

// Actions

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/admin/${id}`;
    return {
        type: ACTION_TYPES.FETCH_CATEGORY,
        payload: axios.get<ICategory>(requestUrl),
    };
};

export const getPublicEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/public${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_CATEGORY_LIST,
        payload: axios.get<ICategory>(`${requestUrl}`),
    };
};

export const createEntity: (entity: ICategory) => void = (entity: ICategory) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_CATEGORY,
        payload: axios.post(`${apiUrl}/admin/create`, entity),
    });
    return result;
};

export const updateEntity: (entity: ICategory) => void = (entity: ICategory) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_CATEGORY,
        payload: axios.put(`${apiUrl}/admin/update`, entity),
    });
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});