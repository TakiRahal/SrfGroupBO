import {defaultValue, ITopHomeSlides} from "../model/top-home-slides.model";
import axios from "axios";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {IOffer} from "../model/offer.model";
import {IRentOffer} from "../model/rent-offer.model";


export const ACTION_TYPES = {
    FETCH_TOP_HOME_SLIDE_LIST: 'topHomeSlides/FETCH_FAQ_LIST',
    FETCH_TOP_HOME_SLIDE: 'topHomeSlides/FETCH_TOP_HOME_SLIDE',
    CREATE_TOP_HOME_SLIDE: 'topHomeSlides/CREATE_TOP_HOME_SLIDE',
    UPDATE_TOP_HOME_SLIDE: 'topHomeSlides/UPDATE_TOP_HOME_SLIDE',
    DELETE_TOP_HOME_SLIDE: 'topHomeSlides/DELETE_TOP_HOME_SLIDE',
    RESET: 'topHomeSlides/RESET',
};


const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ITopHomeSlides>,
    loadingEntity: false,
    entity: defaultValue,
    addSuccess: false,
    updateSuccess: false,
    totalItems: 0,
};

export type TopHomeSlidesState = Readonly<typeof initialState>;


// Reducer

export default (state: TopHomeSlidesState = initialState, action: any): TopHomeSlidesState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.CREATE_TOP_HOME_SLIDE):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.CREATE_TOP_HOME_SLIDE):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.CREATE_TOP_HOME_SLIDE):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            }


        case REQUEST(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_LIST):
            return {
                ...state,
                loadingEntities: true
            }
        case FAILURE(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data,
            }

        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };

        default:
            return state;

    }
}

const apiUrl = 'api/top-home-slides';

// Actions

export const createEntity: (entity: ITopHomeSlides) => void = (entity: ITopHomeSlides) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_TOP_HOME_SLIDE,
        payload: axios.post(`${apiUrl}/admin/create`, entity),
    });
    return result;
};

export const getEntities = () => {
    const requestUrl = `${apiUrl}/admin/list`;
    return {
        type: ACTION_TYPES.FETCH_TOP_HOME_SLIDE_LIST,
        payload: axios.get<ITopHomeSlides>(`${requestUrl}`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/admin/${id}`;
    return {
        type: ACTION_TYPES.FETCH_TOP_HOME_SLIDE,
        payload: axios.get<ITopHomeSlides>(requestUrl),
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});