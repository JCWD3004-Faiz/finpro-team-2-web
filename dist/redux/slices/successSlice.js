"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideSuccess = exports.showSuccess = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    isSuccessOpen: false,
    successMessage: null,
};
const successSlice = (0, toolkit_1.createSlice)({
    name: "success",
    initialState,
    reducers: {
        showSuccess: (state, action) => {
            state.isSuccessOpen = true;
            state.successMessage = action.payload;
        },
        hideSuccess: (state) => {
            state.isSuccessOpen = false;
            state.successMessage = null;
        },
    },
});
_a = successSlice.actions, exports.showSuccess = _a.showSuccess, exports.hideSuccess = _a.hideSuccess;
exports.default = successSlice.reducer;
