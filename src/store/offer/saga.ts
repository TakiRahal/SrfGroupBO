import {all, put, takeEvery} from "redux-saga/effects";
import {fetchDescriptionNewOffer, addDescriptionNewOffer} from "./slice";
import {addDescriptionNewOfferHandler, fetchDescriptionNewOfferHandler} from "./saga-handler/description-new-offer.generator";


export function* offerSaga() {
    yield all([
        takeEvery(fetchDescriptionNewOffer, fetchDescriptionNewOfferHandler),
        takeEvery(addDescriptionNewOffer, addDescriptionNewOfferHandler),
    ]);
}

export default offerSaga;
