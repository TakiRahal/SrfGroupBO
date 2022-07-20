import {put} from "redux-saga/effects";
import {invokeWS, MethodHttp} from "../../../../lib/api-service";
import {fetchNewsLetterFailure, fetchNewsLetterSuccess } from "../slice";

const apiUrl = 'api/news-letter';

export function* fetchNewsLetterHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        })
        yield put(fetchNewsLetterSuccess(result?.data));
    } catch (e) {
        yield put(fetchNewsLetterFailure(e));
    }
}
