"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDiscountsByStoreId = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    allUserDiscounts: [],
    loading: false,
    error: null,
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchDiscountsByStoreId = (0, toolkit_1.createAsyncThunk)("discounts/fetchDiscountsByStoreId", (store_id_1, _a) => __awaiter(void 0, [store_id_1, _a], void 0, function* (store_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/users/discounts/${store_id || 28}`, {
            headers: { Authorization: `Bearer ${access_token}` }, // Include the access token
        });
        return response.data.data; // Ensure this aligns with the structure of your API response
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch discounts.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const userDiscountSlice = (0, toolkit_1.createSlice)({
    name: "userDiscounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchDiscountsByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchDiscountsByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.allUserDiscounts = action.payload; // Populate the data into the state
        })
            .addCase(exports.fetchDiscountsByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch discounts.";
        });
    },
});
exports.default = userDiscountSlice.reducer;
