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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentPage = exports.setStoreId = exports.setSortOrder = exports.setSearch = exports.fetchStocksSuper = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    stocksData: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    sortOrder: "asc",
    search: "",
    storeId: 0,
    loading: false,
    error: null,
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchStocksSuper = (0, toolkit_1.createAsyncThunk)("superStock/fetchStocksSuper", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, search = "", storeId, }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/stocks?store_id=${storeId}&page=${page}&sortOrder&changeType&search=${search}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch products.");
        }
        else {
            return rejectWithValue("An Unexpected error occured.");
        }
    }
}));
const superStockSlice = (0, toolkit_1.createSlice)({
    name: "superStock",
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
        setStoreId(state, action) {
            state.storeId = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Pending case
            .addCase(exports.fetchStocksSuper.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on a new fetch
        })
            // Fulfilled case
            .addCase(exports.fetchStocksSuper.fulfilled, (state, action) => {
            state.stocksData = action.payload.data; // Assuming the API returns an array of stock entries
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
            state.loading = false; // Set loading to false once data is successfully fetched
        })
            // Rejected case
            .addCase(exports.fetchStocksSuper.rejected, (state, action) => {
            state.loading = false; // Stop loading if an error occurs
            state.error = action.payload || "Failed to fetch stocks.";
        });
    },
});
_a = superStockSlice.actions, exports.setSearch = _a.setSearch, exports.setSortOrder = _a.setSortOrder, exports.setStoreId = _a.setStoreId, exports.setCurrentPage = _a.setCurrentPage;
exports.default = superStockSlice.reducer;
