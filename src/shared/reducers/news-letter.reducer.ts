import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import axios from "axios";
import {IAboutUs} from "../model/about-us.model";


export interface INewsLetter {
    id?: number | null;
    email?: string | null;
}

export const defaultValue: Readonly<INewsLetter> = {};

export const ACTION_TYPES = {
    FETCH_NEWS_LETTER_LIST: 'newsLetter/FETCH_NEWS_LETTER_LIST',
};

const initialState = {
    loadingEntity: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<INewsLetter>,
    loadingEntities: false,
    entity: defaultValue,
    totalItems: 0,
    loadingAddEntity: false,
    addSuccess: false,
};


export type NewsLetterState = Readonly<typeof initialState>;

// Reducer

export default (state: NewsLetterState = initialState, action: any): NewsLetterState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_NEWS_LETTER_LIST):
            return {
                ...state,
                loadingEntities: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_NEWS_LETTER_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.FETCH_NEWS_LETTER_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
            };


        default:
            return state;
    }
}

const apiUrl = 'api/news-letter';


// Actions

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}/admin${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_NEWS_LETTER_LIST,
        payload: axios.get<IAboutUs>(`${requestUrl}`),
    };
};