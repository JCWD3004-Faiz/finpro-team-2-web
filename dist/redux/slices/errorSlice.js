"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideError = exports.showError = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isErrorOpen: false,
    errorMessage: null,
};
const errorSlice = (0, toolkit_1.createSlice)({
    name: "error",
    initialState,
    reducers: {
        showError: (state, action) => {
            state.isErrorOpen = true;
            state.errorMessage = action.payload;
        },
        hideError: (state) => {
            state.isErrorOpen = false;
            state.errorMessage = null;
        },
    },
});
_a = errorSlice.actions, exports.showError = _a.showError, exports.hideError = _a.hideError;
exports.default = errorSlice.reducer;
