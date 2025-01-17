"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideConfirmation = exports.showConfirmation = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isConfirmationOpen: false,
    confirmationMessage: null,
    onConfirm: null,
};
const confirmationSlice = (0, toolkit_1.createSlice)({
    name: "confirmation",
    initialState,
    reducers: {
        showConfirmation: (state, action) => {
            state.isConfirmationOpen = true;
            state.confirmationMessage = action.payload.message;
            state.onConfirm = action.payload.onConfirm;
        },
        hideConfirmation: (state) => {
            state.isConfirmationOpen = false;
            state.confirmationMessage = null;
            state.onConfirm = null;
        },
    },
});
_a = confirmationSlice.actions, exports.showConfirmation = _a.showConfirmation, exports.hideConfirmation = _a.hideConfirmation;
exports.default = confirmationSlice.reducer;
