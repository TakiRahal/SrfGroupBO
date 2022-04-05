import axios from "axios";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {defaultValue, ITopHomeSlidesImages} from "../model/top-home-slides-images.model";


export const ACTION_TYPES = {
    FETCH_TOP_HOME_SLIDE_IMAGE_LIST: 'topHomeSlidesImages/FETCH_TOP_HOME_SLIDE_IMAGE_LIST',
    CREATE_TOP_HOME_SLIDE_IMAGE: 'topHomeSlidesImages/CREATE_TOP_HOME_SLIDE_IMAGE',
    FETCH_TOP_HOME_SLIDE_IMAGE: 'topHomeSlides/FETCH_TOP_HOME_SLIDE_IMAGE',
    RESET: 'topHomeSlidesImages/RESET',
};

const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ITopHomeSlidesImages>,
    loadingEntity: false,
    entity: defaultValue,
    addSuccess: false,
    updateSuccess: false,
    totalItems: 0,
};

export type TopHomeSlidesImagesState = Readonly<typeof initialState>;


// Reducer

export default (state: TopHomeSlidesImagesState = initialState, action: any): TopHomeSlidesImagesState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.CREATE_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.CREATE_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.CREATE_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            }


        case REQUEST(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE_LIST):
            return {
                ...state,
                loadingEntities: true
            }
        case FAILURE(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
            }


        case REQUEST(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE):
            return {
                ...state,
                loadingEntity: false,
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

const apiUrl = 'api/top-home-slides-images';

// Actions

export const createEntity: (entity: ITopHomeSlidesImages) => void = (entity: ITopHomeSlidesImages) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_TOP_HOME_SLIDE_IMAGE,
        payload: axios.post(`${apiUrl}/admin/create`, entity),
    });
    return result;
};


export const getEntities = () => {
    const requestUrl = `${apiUrl}/public/slides`;
    return {
        type: ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE_LIST,
        payload: axios.get<ITopHomeSlidesImages>(`${requestUrl}`),
    };
};

// export const getEntities = () => {
//     const requestUrl = `${apiUrl}/admin/list`;
//     return {
//         type: ACTION_TYPES.FETCH_TOP_HOME_SLIDE_LIST,
//         payload: axios.get<ITopHomeSlides>(`${requestUrl}`),
//     };
// };
//
export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/admin/${id}`;
    return {
        type: ACTION_TYPES.FETCH_TOP_HOME_SLIDE_IMAGE,
        payload: axios.get<ITopHomeSlidesImages>(requestUrl),
    };
};
//
export const reset = () => ({
    type: ACTION_TYPES.RESET,
});