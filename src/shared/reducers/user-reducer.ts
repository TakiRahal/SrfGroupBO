import axios from "axios";
import {REQUEST, FAILURE, SUCCESS} from "./action-type.util";
import {StorageService} from "../services/storage.service";
import {AllAppConfig} from "../../core/config/all-config";
import {async} from "q";
import {ICommentOffer} from "../model/comment-offer.model";
import {IUser} from "../model/user.model";
import {IFaq} from "../model/faq.model";

export const ACTION_TYPES = {
    CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
    ACTIVATE_ACCOUNT: 'activate/ACTIVATE_ACCOUNT',
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    GET_PROFILE: 'authentication/GET_PROFILE',
    GET_CURRENT_USER: 'authentication/GET_CURRENT_USER',
    LOGOUT: 'logout/LOGOUT',
    FETCH_USER_LIST: 'user/FETCH_USER_LIST',
    BLOCKED_UNBLOCK_USER: 'user/BLOCKED_USER',
    ADD_REMOVE_ADMIN_USER: 'user/ADD_REMOVE_ADMIN_USER',
    RESET_LIST_USERS: 'user/RESET_LIST_USERS'
}

const CURRENT_USER = StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER) ? JSON.parse(StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER)) : null;

const initialState = {
    isAuthenticated: CURRENT_USER ? true : false,
    currentUser: CURRENT_USER ? CURRENT_USER : {},

    registrationLoading: false,
    registrationSuccess: false,
    registrationErrorMessage: null,

    loginLoading: false,
    loginSuccess: false,
    loginErrorMessage: null,

    sessionLoading: false,
    sessionSuccess: false,
    sessionErrorMessage: null,

    profileLoading: false,
    profileEntity: {} as IUser,
    profileErrorMessage: null,

    activationAccountSuccess: false,

    account: {} as any,
    loadingAccount: false,

    entitiesUser: [] as ReadonlyArray<IUser>,
    loadingEntitiesUser: false,

    blockedUnblockedUserSuccess: false,
    addRemoveAdminSuccess: false
}

export type UserState = Readonly<typeof initialState>;

export default (state: UserState = initialState, action: any): UserState => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.FETCH_USER_LIST):
            return {
                ...state,
                loadingEntitiesUser: true,
            };
        case FAILURE(ACTION_TYPES.FETCH_USER_LIST):
            console.log('action = ', action);
            return {
                ...state,
                loadingEntitiesUser: false,
            };
        case SUCCESS(ACTION_TYPES.FETCH_USER_LIST):
            return {
                ...state,
                entitiesUser: action.payload.data.content,
                loadingEntitiesUser: true,
            };


        case REQUEST(ACTION_TYPES.CREATE_ACCOUNT):
            return {
                ...state,
                registrationLoading: true,
            };
        case FAILURE(ACTION_TYPES.CREATE_ACCOUNT):
            console.log('action = ', action);
            return {
                ...initialState,
                registrationErrorMessage: action.payload.response.data.message,
            };
        case SUCCESS(ACTION_TYPES.CREATE_ACCOUNT):
            return {
                ...initialState,
                registrationSuccess: true,
            };


        case REQUEST(ACTION_TYPES.LOGIN):
            return{
                ...state,
                loginLoading: true,
            }
        case FAILURE(ACTION_TYPES.LOGIN):
            return {
                ...initialState,
                loginErrorMessage: action.payload.response.data.message,
            };
        case SUCCESS(ACTION_TYPES.LOGIN):
            return {
                ...initialState,
                loginSuccess: true,
            };


        case REQUEST(ACTION_TYPES.GET_SESSION):
            return{
                ...state,
                sessionLoading: true,
            }
        case FAILURE(ACTION_TYPES.GET_SESSION):
            return {
                ...initialState,
                sessionErrorMessage: action.payload.response.data.message,
            };
        case SUCCESS(ACTION_TYPES.GET_SESSION):
            return {
                ...initialState,
                sessionSuccess: true,
                isAuthenticated: true,
                currentUser: action.payload.data
            };


        case REQUEST(ACTION_TYPES.GET_PROFILE):
            return {
                ...state,
                profileLoading: true,
            };
        case FAILURE(ACTION_TYPES.GET_PROFILE):
            return {
                ...state,
                profileLoading: false,
                profileErrorMessage: action.payload.response.data.message,
            };
        case SUCCESS(ACTION_TYPES.GET_PROFILE): {
            return {
                ...state,
                profileLoading: false,
                profileEntity: action.payload.data,
            };
        }


        case REQUEST(ACTION_TYPES.GET_CURRENT_USER):
            return {
                ...state,
                loadingAccount: true,
            };
        case FAILURE(ACTION_TYPES.GET_PROFILE):
            return {
                ...state,
                loadingAccount: false,
            };
        case SUCCESS(ACTION_TYPES.GET_CURRENT_USER):
            return {
                ...state,
                account: action.payload.data,
                loadingAccount: false,
            };


        case REQUEST(ACTION_TYPES.BLOCKED_UNBLOCK_USER):
            return {
                ...state,
                blockedUnblockedUserSuccess: false,
            };
        case FAILURE(ACTION_TYPES.BLOCKED_UNBLOCK_USER):
            return {
                ...state,
                blockedUnblockedUserSuccess: false,
            };
        case SUCCESS(ACTION_TYPES.BLOCKED_UNBLOCK_USER):
            return {
                ...state,
                blockedUnblockedUserSuccess: true,
            };


        case REQUEST(ACTION_TYPES.ADD_REMOVE_ADMIN_USER):
            return {
                ...state,
                addRemoveAdminSuccess: false,
            };
        case FAILURE(ACTION_TYPES.ADD_REMOVE_ADMIN_USER):
            return {
                ...state,
                addRemoveAdminSuccess: false,
            };
        case SUCCESS(ACTION_TYPES.ADD_REMOVE_ADMIN_USER):
            return {
                ...state,
                addRemoveAdminSuccess: true,
            };


        case ACTION_TYPES.LOGOUT:
            return {
                ...initialState,
                isAuthenticated: false,
                currentUser: {}
            };

        case ACTION_TYPES.RESET_LIST_USERS:
            return {
                ...state,
                entitiesUser: []
            };

        default:
            return state;
    }
}

const apiUrl = 'api/user/';

// Actions

export const loginAdmin: (email: string, password: string, rememberMe?: boolean) => void = (email, password, rememberMe = false) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: axios.post(`${apiUrl}public/signin-admin`, {
            email: email,
            password: password,
            rememberMe: rememberMe
        }),
        // meta: {
        //     errorMessage: 'Not role admin'
        // }
    })
    const bearerToken = result.value.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        if (rememberMe) {
            StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
        } else {
            StorageService.session.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, jwt);
        }

        await dispatch(getSession());
    }
    return result;
};

export const getSession: () => void = () => async (dispatch: any, getState: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.GET_SESSION,
        payload: axios.get(`${apiUrl}current-user`),
    });

    const account  = result?.value?.data;
    if (account) {
        StorageService.local.set(AllAppConfig.VALUE_CURRENT_USER, JSON.stringify(account));
    }
    return result;
};


export const getProfile: (userId: number) => void = (userId: number) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.GET_PROFILE,
        payload: axios.get<IUser>(`${apiUrl}public/profile/${userId}`),
    });
    return result;
};

export const getCurrentUser: () => void = () => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.GET_CURRENT_USER,
        payload: axios.get(`${apiUrl}current-user`),
    });
    return result;
};


export const getEntities = (page: number, size: number, queryParams: string) => {
    const requestUrl = `${apiUrl}admin/list-users?page=${page}&size=${size}${queryParams}`;
    return {
        type: ACTION_TYPES.FETCH_USER_LIST,
        payload: axios.get<IFaq>(`${requestUrl}`),
    };
};


export const blockedUnblockedUser: (userId: number, blockUnblock: string) => void = (userId: number, blockUnblock: string) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.BLOCKED_UNBLOCK_USER,
        payload: axios.post(`${apiUrl}admin/blocked-user/${userId}`, blockUnblock, { headers: { ['Content-Type']: 'text/plain' }}),
    });
    return result;
};

export const addRemoveAdmin: (userId: number, addRemove: string) => void = (userId: number, addRemove: string) => async (dispatch: any) => {
    const result = await dispatch({
        type: ACTION_TYPES.ADD_REMOVE_ADMIN_USER,
        payload: axios.post(`${apiUrl}super-admin/add-remove-admin/${userId}`, addRemove, { headers: { ['Content-Type']: 'text/plain' }}),
    });
    return result;
};

export const logout: () => void = () => (dispatch: any) => {
    clearAuthToken();
    dispatch({
        type: ACTION_TYPES.LOGOUT,
    });
};

export const clearAuthToken = () => {
    if (StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)) {
        StorageService.local.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
    }
    if (StorageService.session.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)) {
        StorageService.session.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
    }

    StorageService.local.remove(AllAppConfig.VALUE_CURRENT_USER);
};

export const clearAuthentication = (messageKey: string) => (dispatch: any, getState: any) => {
    // clearAuthToken();
    // dispatch(displayAuthError(messageKey));
    // dispatch({
    //     type: ACTION_TYPES.CLEAR_AUTH,
    // });
};

export const resetListUsers = () => ({
    type: ACTION_TYPES.RESET_LIST_USERS,
});