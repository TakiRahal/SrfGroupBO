import {invokeWS, MethodHttp} from "../../../../lib/api-service";
import {put} from "redux-saga/effects";
import {addDescriptionNewOfferSuccess, addDescriptionNewOfferFailure, fetchDescriptionNewOfferFailure, fetchDescriptionNewOfferSuccess } from "../slice";

const apiUrl = 'api/description-add-offers';

export function* fetchDescriptionNewOfferHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/admin/list`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(fetchDescriptionNewOfferSuccess(result?.data));
    } catch (e) {
        yield put(fetchDescriptionNewOfferFailure(e));
    }
}


export function* addDescriptionNewOfferHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/admin/create`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.post,
        }, {...data.payload})
        yield put(addDescriptionNewOfferSuccess(result?.data));
    } catch (e) {
        yield put(addDescriptionNewOfferFailure(e));
    }
}
