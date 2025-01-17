"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetProfileState = exports.setUpdateImage = exports.setUpdateEmail = exports.setUpdateUsername = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    updateUsername: "",
    updateEmail: "",
    updateImage: null,
};
const updateProfileSlice = (0, toolkit_1.createSlice)({
    name: "updateProfile",
    initialState,
    reducers: {
        setUpdateUsername(state, action) {
            state.updateUsername = action.payload;
        },
        setUpdateEmail(state, action) {
            state.updateEmail = action.payload;
        },
        setUpdateImage(state, action) {
            state.updateImage = action.payload;
        },
        resetProfileState(state) {
            state.updateUsername = "";
            state.updateEmail = "";
            state.updateImage = null;
        },
    },
});
_a = updateProfileSlice.actions, exports.setUpdateUsername = _a.setUpdateUsername, exports.setUpdateEmail = _a.setUpdateEmail, exports.setUpdateImage = _a.setUpdateImage, exports.resetProfileState = _a.resetProfileState;
exports.default = updateProfileSlice.reducer;
