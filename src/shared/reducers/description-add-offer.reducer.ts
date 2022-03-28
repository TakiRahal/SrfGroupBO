import axios from 'axios';
import {defaultValue, IDescriptionAddOffer} from "../model/description-add-offer.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {ICategory} from "../model/category.model";


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
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDescriptionAddOffer>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,

  entityPublic: defaultValue,
  loadingEntityPublic: false,
};

export type DescriptionAddOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: DescriptionAddOfferState = initialState, action: any): DescriptionAddOfferState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER):
    case REQUEST(ACTION_TYPES.FETCH_PUBLIC_DESCRIPTIONADDOFFER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
        loadingEntityPublic: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
    case REQUEST(ACTION_TYPES.UPDATE_DESCRIPTIONADDOFFER):
    case REQUEST(ACTION_TYPES.DELETE_DESCRIPTIONADDOFFER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DESCRIPTIONADDOFFER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER):
    case FAILURE(ACTION_TYPES.FETCH_PUBLIC_DESCRIPTIONADDOFFER):
    case FAILURE(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
    case FAILURE(ACTION_TYPES.UPDATE_DESCRIPTIONADDOFFER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DESCRIPTIONADDOFFER):
    case FAILURE(ACTION_TYPES.DELETE_DESCRIPTIONADDOFFER):
      return {
        ...state,
        loading: false,
        loadingEntityPublic: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST): {
      return {
        ...state,
        loading: false,
        entities: action.payload.data.content,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PUBLIC_DESCRIPTIONADDOFFER):
      return {
        ...state,
        loadingEntityPublic: false,
        entityPublic: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER):
    case SUCCESS(ACTION_TYPES.UPDATE_DESCRIPTIONADDOFFER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DESCRIPTIONADDOFFER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DESCRIPTIONADDOFFER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
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

const apiUrl = 'api/description-add-offers';

// Actions

export const getEntities = (page: number, size: number, sort: string) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DESCRIPTIONADDOFFER_LIST,
    payload: axios.get<IDescriptionAddOffer>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
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

export const createEntity: (entity: IDescriptionAddOffer) => void = (entity: ICategory) => async (dispatch: any) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DESCRIPTIONADDOFFER,
    payload: axios.post(apiUrl, entity),
  });
  return result;
};

export const updateEntity: (entity: IDescriptionAddOffer) => void = (entity: ICategory) => async (dispatch: any) => {
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
