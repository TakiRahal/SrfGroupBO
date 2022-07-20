import {PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../initial.state";

const reducer = {
    fetchAddress: (state: any) => {
        state.address.loadingEntities = true;
    },
    fetchAddressSuccess: (state: any, action: any) => {
        state.address.loadingEntities = false;
        state.address.entities = action.payload?.content;
        state.address.totalItems = action.payload?.totalElements;
        state.address.totalPages = action.payload?.totalPages;
    },
    fetchAddressFailure: (state: any, action: PayloadAction) => {
        state.address.loadingEntities = false;
        state.address.errorMessage = action.payload;
    },

    importAddress: (state: any) => {
        state.address.loadingImport = true;
    },
    importAddressSuccess: (state: any, action: any) => {
        state.address.loadingImport = false;
        state.address.inportSuccess = true;
    },
    importAddressFailure: (state: any, action: PayloadAction) => {
        state.address.loadingImport = false;
    },

    resetAddress: (state: any) => {
        state.address = initialState.address;
    },
}

export default reducer;
