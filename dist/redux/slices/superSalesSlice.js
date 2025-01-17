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
exports.setProductId = exports.setCategoryId = exports.setStoreId = exports.fetchSalesByCategory = exports.fetchCategoriesProductStoreData = exports.fetchSalesByProductData = exports.fetchSalesData = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const access_token = js_cookie_1.default.get("access_token");
// Initial state
const initialState = {
    sales: [],
    categories: [],
    products: [],
    stores: [],
    store_id: null,
    category_id: null,
    product_id: null,
    loading: false,
    error: null,
    salesByCategory: {
        labels: [],
        datasets: [],
    },
    salesByProductData: [],
};
// Async thunk to fetch sales data
exports.fetchSalesData = (0, toolkit_1.createAsyncThunk)("sales/fetchSalesData", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ year, store_id }, { rejectWithValue }) {
    var _c;
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/sales/?year=${year}&store_id=${store_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data; // Assuming `data` contains the sales array
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_c = error.response.data) === null || _c === void 0 ? void 0 : _c.message) || "Failed to fetch sales data.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchSalesByProductData = (0, toolkit_1.createAsyncThunk)("sales/fetchSalesByProductData", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ year, store_id, product_id, }, { rejectWithValue }) {
    var _c;
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/sales/products/?year=${year}&store_id=${store_id}&product_id=${product_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data; // Assuming `data` contains the sales array
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_c = error.response.data) === null || _c === void 0 ? void 0 : _c.message) || "Failed to fetch sales data.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchCategoriesProductStoreData = (0, toolkit_1.createAsyncThunk)("superAdmin/fetchCategoriesProductStoreData", (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    var _b;
    try {
        const response = yield interceptor_1.default.get("/api/super-admin/data/all", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to data.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchSalesByCategory = (0, toolkit_1.createAsyncThunk)("sales/fetchSalesByCategory", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ year, store_id, category_id, }, { rejectWithValue }) {
    var _c, _d;
    try {
        const response = yield interceptor_1.default.get("/api/super-admin/sales/categories/", {
            params: Object.assign(Object.assign({ year }, (store_id ? { store_id } : {})), (category_id ? { category_id } : {})),
            headers: {
                Authorization: `Bearer ${access_token}`, // Include the token if necessary
            },
        });
        return response.data.data; // Return only the data field
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || "Failed to fetch sales by category.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
// Create the slice
const salesSlice = (0, toolkit_1.createSlice)({
    name: "sales",
    initialState,
    reducers: {
        setStoreId(state, action) {
            state.store_id = action.payload;
        },
        setCategoryId(state, action) {
            state.category_id = action.payload;
        },
        setProductId(state, action) {
            state.product_id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchSalesData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchSalesData.fulfilled, (state, action) => {
            state.loading = false;
            state.sales = action.payload;
        })
            .addCase(exports.fetchSalesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchSalesByProductData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchSalesByProductData.fulfilled, (state, action) => {
            state.loading = false;
            state.salesByProductData = action.payload;
        })
            .addCase(exports.fetchSalesByProductData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchCategoriesProductStoreData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchCategoriesProductStoreData.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
            state.products = action.payload.products;
            state.stores = action.payload.stores;
        })
            .addCase(exports.fetchCategoriesProductStoreData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchSalesByCategory.pending, (state) => {
            state.loading = true;
            state.error = null; // Clear any previous errors
        })
            .addCase(exports.fetchSalesByCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.salesByCategory = {
                labels: action.payload.labels || [], // Labels from the API response
                datasets: action.payload.datasets || [], // Datasets from the API response
            };
        })
            .addCase(exports.fetchSalesByCategory.rejected, (state, action) => {
            state.loading = false;
            state.error =
                action.payload || "Failed to fetch sales by category.";
        });
    },
});
_a = salesSlice.actions, exports.setStoreId = _a.setStoreId, exports.setCategoryId = _a.setCategoryId, exports.setProductId = _a.setProductId;
exports.default = salesSlice.reducer;
