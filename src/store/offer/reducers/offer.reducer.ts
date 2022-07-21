import {PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../initial.state";

const reducer = {
    fetchDescriptionNewOffer: (state: any) => {
        state.descriptionNewOffer.loadingEntities = true;
    },
    fetchDescriptionNewOfferSuccess: (state: any, action: any) => {
        state.descriptionNewOffer.loadingEntities = false;
        state.descriptionNewOffer.entities = action.payload?.content;
        state.descriptionNewOffer.totalItems = action.payload?.totalElements;
        state.descriptionNewOffer.totalPages = action.payload?.totalPages;
    },
    fetchDescriptionNewOfferFailure: (state: any, action: PayloadAction) => {
        state.descriptionNewOffer.loadingEntities = false;
        state.descriptionNewOffer.errorMessage = action.payload;
    },

    addDescriptionNewOffer: (state: any) => {
        state.descriptionNewOffer.loading = true;
        state.descriptionNewOffer.addSuccess = false;
    },
    addDescriptionNewOfferSuccess: (state: any, action: any) => {
        state.descriptionNewOffer.loading = false;
        state.descriptionNewOffer.entity = action.payload;
        state.descriptionNewOffer.addSuccess = true;
    },
    addDescriptionNewOfferFailure: (state: any, action: PayloadAction) => {
        state.descriptionNewOffer.loading = false;
    },

    resetDescriptionNewOffer: (state: any) => {
        state.descriptionNewOffer = initialState.descriptionNewOffer;
    },
}

export default reducer;
