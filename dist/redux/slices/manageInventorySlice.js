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
exports.deselectAllItems = exports.selectAllItems = exports.toggleSelectedItem = exports.setCurrentPage = exports.setSortOrder = exports.setSortField = exports.createStockJournal = exports.fetchInventoriesByStoreId = exports.fetchStoreByStoreId = void 0;
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
exports.fetchStoreByStoreId = (0, toolkit_1.createAsyncThunk)("manageInventory/fetchStoreByStoreId", (storeId_1, _a) => __awaiter(void 0, [storeId_1, _a], void 0, function* (storeId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/store/${storeId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch store.");
        }
        else {
            return rejectWithValue("An Unexpected error occured.");
        }
    }
}));
exports.fetchInventoriesByStoreId = (0, toolkit_1.createAsyncThunk)("manageInventory/fetchInventoriesByStoreId", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ storeId, page = 1, sortField = "stock", sortOrder = "asc", search = "" }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/inventory/${storeId}?page=${page}&pageSize=10&sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`, {
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
exports.createStockJournal = (0, toolkit_1.createAsyncThunk)("manageInventory/createStockJournal", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ storeId, inventoryIds, stockChange, changeCategory }, { rejectWithValue }) {
    const access_token = js_cookie_1.default.get("access_token");
    try {
        if (changeCategory === "SOLD" && stockChange > 0) {
            return rejectWithValue("Sold Stock change can't be a positive value");
        }
        const payload = {
            inventories: inventoryIds.map((id) => ({
                inventoryId: id,
                stockChange,
                changeCategory,
            })),
        };
        const response = yield axios_1.default.post(`/api/inventory/stock-journal/${storeId}`, payload, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.message; // Assuming the API returns a success message
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to create stock journal");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const manageInventorySlice = (0, toolkit_1.createSlice)({
    name: "manageInventory",
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
        toggleSelectedItem(state, action) {
            const exists = state.selectedItems.some((item) => item.inventory_id === action.payload.inventory_id);
            if (exists) {
                state.selectedItems = state.selectedItems.filter((item) => item.inventory_id !== action.payload.inventory_id);
            }
            else {
                state.selectedItems.push(action.payload);
            }
        },
        selectAllItems(state) {
            state.selectedItems = state.inventories.map((item) => {
                var _a;
                return ({
                    inventory_id: item.inventory_id,
                    product_name: ((_a = item.Product) === null || _a === void 0 ? void 0 : _a.product_name) || "Unknown Product",
                });
            });
        },
        deselectAllItems(state) {
            state.selectedItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //fetch store
            .addCase(exports.fetchStoreByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
        })
            .addCase(exports.fetchStoreByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchStoreByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            //fetch inventories
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
        })
            //create stock journal
            .addCase(exports.createStockJournal.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.createStockJournal.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.createStockJournal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = manageInventorySlice.actions, exports.setSortField = _a.setSortField, exports.setSortOrder = _a.setSortOrder, exports.setCurrentPage = _a.setCurrentPage, exports.toggleSelectedItem = _a.toggleSelectedItem, exports.selectAllItems = _a.selectAllItems, exports.deselectAllItems = _a.deselectAllItems;
exports.default = manageInventorySlice.reducer;
