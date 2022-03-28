import axios from 'axios';
import {defaultValue, IContactUs} from "../model/contact-us.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {IFaq} from "../model/faq.model";


export const ACTION_TYPES = {
    FETCH_CONTACTUS_LIST: 'contactUs/FETCH_CONTACTUS_LIST',
    CREATE_CONTACTUS: 'contactUs/CREATE_CONTACTUS',
    RESET: 'contactUs/RESET',
};

const initialState = {
    loadingEntity: false,
    errorMessage: null,
    entity: defaultValue,
    addSuccess: false,
    loadingEntities: false,
    entities: [] as ReadonlyArray<IContactUs>,
    totalItems: 0,
};

export type ContactUsState = Readonly<typeof initialState>;

// Reducer

export default (state: ContactUsState = initialState, action: any): ContactUsState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.FETCH_CONTACTUS_LIST):
            return {
                ...state,
                loadingEntities: true
            }
        case FAILURE(ACTION_TYPES.FETCH_CONTACTUS_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_CONTACTUS_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
                totalItems: action.payload.data.totalElements
            }


        case REQUEST(ACTION_TYPES.CREATE_CONTACTUS):
            return {
                ...state,
                loadingEntity: true,
            };
        case FAILURE(ACTION_TYPES.CREATE_CONTACTUS):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            };
        case SUCCESS(ACTION_TYPES.CREATE_CONTACTUS):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            };
        default:
            return state;
    }
}


const apiUrl = 'api/contactus';

// Actions

export const createEntity: (entity: IContactUs) => void = (entity: IContactUs) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_CONTACTUS,
        payload: axios.post(`${apiUrl}/public`, entity),
        meta: {
            successMessage: 'contact-us.messages.success',
        },
    });
    return result;
};

export const getEntities = (page: number, size: number, sort: string) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_CONTACTUS_LIST,
        payload: axios.get<IFaq>(`${requestUrl}/admin/list`),
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});