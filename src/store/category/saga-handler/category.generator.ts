import {invokeWS, MethodHttp} from "../../../../lib/api-service";
import {put} from "redux-saga/effects";
import {fetchCategoriesFailure, fetchCategoriesSuccess, importCategoriesFailure, importCategoriesSuccess } from "../slice";

const apiUrl = 'api/category';

export function* fetchCategoriesHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(fetchCategoriesSuccess(result?.data));
    } catch (e) {
        console.error(e);
        yield put(fetchCategoriesFailure(e));
    }
}


export function* importCategoriesHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/admin/import`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(importCategoriesSuccess(result?.data));
    } catch (e) {
        console.error(e);
        yield put(importCategoriesFailure(e));
    }
}
