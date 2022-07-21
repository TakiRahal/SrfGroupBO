import {invokeWS, MethodHttp} from "../../../../lib/api-service";
import {put} from "redux-saga/effects";
import {addDescriptionNewOfferSuccess, addDescriptionNewOfferFailure, fetchDescriptionNewOfferFailure, fetchDescriptionNewOfferSuccess } from "../slice";

const apiUrl = 'api/faq';

export function* fetchDescriptionNewOfferHandler0(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(fetchDescriptionNewOfferSuccess(result?.data));
    } catch (e) {
        yield put(fetchDescriptionNewOfferFailure(e));
    }
}


export function* addDescriptionNewOfferHandler0(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(addDescriptionNewOfferSuccess(result?.data));
    } catch (e) {
        yield put(addDescriptionNewOfferFailure(e));
    }
}
