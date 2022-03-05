import {defaultValue, IAboutUs} from "../model/about-us.model";
import axios from "axios";
import {getPathApi} from "../utils/utils-functions";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";


export const ACTION_TYPES = {
    FETCH_ABOUTUS_LIST: 'aboutUs/FETCH_ABOUTUS_LIST',
    FETCH_ABOUTUS: 'aboutUs/FETCH_ABOUTUS',
    CREATE_ABOUTUS: 'aboutUs/CREATE_ABOUTUS',
    RESET: 'aboutUs/RESET',
};


const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IAboutUs>,
    loadingEntity: false,
    entity: defaultValue,
    addSuccess: false,
};

export type AboutUsState = Readonly<typeof initialState>;

// Reducer

export default (state: AboutUsState = initialState, action: any): AboutUsState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.CREATE_ABOUTUS):
            return {
                ...state,
                loadingEntity: false,
            };
        case FAILURE(ACTION_TYPES.CREATE_ABOUTUS):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_ABOUTUS):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            };


        case REQUEST(ACTION_TYPES.FETCH_ABOUTUS_LIST):
            return {
                ...state,
                loadingEntities: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_ABOUTUS_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_ABOUTUS_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content
            };

        default:
            return state;
    }
}


const apiUrl = 'api/aboutus';

// Actions

export const getEntity = () => {
    const requestUrl = `${apiUrl}`;
    return {
        type: ACTION_TYPES.FETCH_ABOUTUS,
        payload: axios.get<IAboutUs>(`${getPathApi(requestUrl)}`),
    };
};


export const createEntity: (entity: IAboutUs) => void = (entity: IAboutUs) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_ABOUTUS,
        payload: axios.post(`${getPathApi(apiUrl)}/admin`, entity),
    });
    return result;
};


export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/admin${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_ABOUTUS_LIST,
        payload: axios.get<IAboutUs>(`${getPathApi(requestUrl)}`),
    };
};