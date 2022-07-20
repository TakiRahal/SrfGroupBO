import {PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../initial.state";

const reducer = {
    fetchAboutUs: (state: any) => {
        state.aboutUs.loadingEntities = true;
    },
    fetchAboutUsSuccess: (state: any, action: any) => {
        state.aboutUs.loadingEntities = false;
        state.aboutUs.entities = action.payload?.content;
        state.aboutUs.totalItems = action.payload?.totalElements;
        state.aboutUs.totalPages = action.payload?.totalPages;
    },
    fetchAboutUsFailure: (state: any, action: PayloadAction) => {
        state.aboutUs.loadingEntities = false;
        state.aboutUs.errorMessage = action.payload;
    },

    addAboutUs: (state: any) => {
        state.aboutUs.loading = true;
        state.aboutUs.addSuccess = false;
    },
    addAboutUsSuccess: (state: any, action: any) => {
        state.aboutUs.loading = false;
        state.aboutUs.addSuccess = true;
    },
    addAboutUsFailure: (state: any, action: PayloadAction) => {
        state.aboutUs.loading = false;
    },

    resetAboutUs: (state: any) => {
        state.aboutUs = initialState.aboutUs;
    },
}

export default reducer;
