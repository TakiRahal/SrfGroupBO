import axios from 'axios';
import {defaultValue, IPostHomeFeature} from "../model/post-home-feature.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {ITopHomeSlidesImages} from "../model/top-home-slides-images.model";

export const ACTION_TYPES = {
    FETCH_POST_HOME_FEATURE_LIST: 'postHomeFeature/FETCH_POST_HOME_FEATURE_LIST',
    FETCH_POST_HOME_FEATURE: 'postHomeFeature/FETCH_POST_HOME_FEATURE',
    CREATE_POST_HOME_FEATURE: 'postHomeFeature/CREATE_CREATE_POST_HOME_FEATURE',
    UPDATE_CMSHOMEMEDIUM: 'postHomeFeature/UPDATE_CMSHOMEMEDIUM',
    DELETE_CMSHOMEMEDIUM: 'postHomeFeature/DELETE_CMSHOMEMEDIUM',
    RESET: 'postHomeFeature/RESET',
};

const initialState = {
    loadingEntities: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IPostHomeFeature>,
    loadingEntity: false,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
    addSuccess: false
};

export type PostHomeFeatureState = Readonly<typeof initialState>;

// Reducer

export default (state: PostHomeFeatureState = initialState, action: any): PostHomeFeatureState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_POST_HOME_FEATURE):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.CREATE_POST_HOME_FEATURE):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.CREATE_POST_HOME_FEATURE):
            return {
                ...state,
                loadingEntity: false,
                addSuccess: true,
                entity: action.payload.data,
            }


        case REQUEST(ACTION_TYPES.FETCH_POST_HOME_FEATURE_LIST):
            return {
                ...state,
                loadingEntities: true
            }
        case FAILURE(ACTION_TYPES.FETCH_POST_HOME_FEATURE_LIST):
            return {
                ...state,
                loadingEntities: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_POST_HOME_FEATURE_LIST):
            return {
                ...state,
                loadingEntities: false,
                entities: action.payload.data.content,
            }


        case REQUEST(ACTION_TYPES.FETCH_POST_HOME_FEATURE):
            return {
                ...state,
                loadingEntity: true
            }
        case FAILURE(ACTION_TYPES.FETCH_POST_HOME_FEATURE):
            return {
                ...state,
                loadingEntity: false,
                errorMessage: action.payload,
            }
        case SUCCESS(ACTION_TYPES.FETCH_POST_HOME_FEATURE):
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
};

const apiUrl = 'api/post-home-feature';

// Actions

export const createEntity: (entity: IPostHomeFeature) => void = (entity: IPostHomeFeature) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_POST_HOME_FEATURE,
        payload: axios.post(`${apiUrl}/admin/create`, entity),
    });
    return result;
};


export const getEntities = () => {
    const requestUrl = `${apiUrl}/admin/list`;
    return {
        type: ACTION_TYPES.FETCH_POST_HOME_FEATURE_LIST,
        payload: axios.get<IPostHomeFeature>(`${requestUrl}`),
    };
};

export const getEntity = (id: number) => {
    const requestUrl = `${apiUrl}/admin/${id}`;
    return {
        type: ACTION_TYPES.FETCH_POST_HOME_FEATURE,
        payload: axios.get<ITopHomeSlidesImages>(requestUrl),
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});
