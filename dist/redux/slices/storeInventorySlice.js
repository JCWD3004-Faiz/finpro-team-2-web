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
exports.setCurrentPage = exports.setSortOrder = exports.setSortField = exports.fetchInventoriesByStoreId = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    store: null,
    inventories: [],
    selectedItems: [],
    sortField: "stock",
    sortOrder: "asc",
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    loading: false,
    error: null,
};
const access_token = js_cookie_1.default.get("access_token");
const store_id = js_cookie_1.default.get("storeId");
exports.fetchInventoriesByStoreId = (0, toolkit_1.createAsyncThunk)("storeInventory/fetchInventoriesByStoreId", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, sortField = "stock", sortOrder = "asc", search = "", }, { rejectWithValue }) {
    try {
        if (!store_id) {
            return rejectWithValue("Store ID is missing in cookies.");
        }
        const response = yield interceptor_1.default.get(`/api/inventory/store/${store_id}?page=${page}&pageSize=10&sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data; // Return inventories and pagination data
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message ||
                "Failed to fetch inventories for store.");
        }
        else {
            return rejectWithValue("An Unexpected error occured.");
        }
    }
}));
const storeInventorySlice = (0, toolkit_1.createSlice)({
    name: "storeInventory",
    initialState,
    reducers: {
        setSortField(state, action) {
            state.sortField = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchInventoriesByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchInventoriesByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.inventories = action.payload.data || [];
            state.totalPages = action.payload.totalPages || 1;
            state.totalItems = action.payload.totalItems || 0;
        })
            .addCase(exports.fetchInventoriesByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = storeInventorySlice.actions, exports.setSortField = _a.setSortField, exports.setSortOrder = _a.setSortOrder, exports.setCurrentPage = _a.setCurrentPage;
exports.default = storeInventorySlice.reducer;
