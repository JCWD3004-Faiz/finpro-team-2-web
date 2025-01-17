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
exports.setSearch = exports.setSortOrder = exports.setCurrentPage = exports.setSortField = exports.deleteDiscount = exports.fetchDiscountDetails = exports.fetchInventoryWithoutDiscountsAdmin = exports.fetchInventoryNamesAdmin = exports.fetchDiscountsAdmin = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialDiscountDetail = {
    discount_id: 0,
    inventory_id: 0,
    inventory_name: "",
    type: "",
    value: 0,
    min_purchase: 0,
    max_discount: 0,
    bogo_product_id: 0,
    bogo_product_name: "",
    description: "",
    is_active: false,
    image: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false,
};
const initialState = {
    discounts: [],
    inventoryNames: [],
    inventoryWithoutDiscounts: [],
    discountDetail: initialDiscountDetail,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    loading: false,
    error: null,
    sortField: "start_date",
    sortOrder: "asc",
    search: "",
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchDiscountsAdmin = (0, toolkit_1.createAsyncThunk)("discounts/fetchDiscountsAdmin", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ storeId, page = 1, pageSize = 10, search = "", sortField = "start_date", sortOrder = "asc", }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/discounts/${storeId}?page=${page}&pageSize=${pageSize}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.discounts;
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
exports.fetchInventoryNamesAdmin = (0, toolkit_1.createAsyncThunk)("discounts/fetchInventoryNamesAdmin", (storeId_1, _a) => __awaiter(void 0, [storeId_1, _a], void 0, function* (storeId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/inventories/${storeId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch inventory names.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchInventoryWithoutDiscountsAdmin = (0, toolkit_1.createAsyncThunk)("discounts/fetchInventoryWithoutDiscountsAdmin", (storeId_1, _a) => __awaiter(void 0, [storeId_1, _a], void 0, function* (storeId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/inventories/discounts/${storeId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch inventory names.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchDiscountDetails = (0, toolkit_1.createAsyncThunk)("discounts/fetchDiscountDetails", (discountId_1, _a) => __awaiter(void 0, [discountId_1, _a], void 0, function* (discountId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/discounts/details/${discountId}`);
        return response.data.discount;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch discount details.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.deleteDiscount = (0, toolkit_1.createAsyncThunk)("discounts/deleteDiscount", (discountId_1, _a) => __awaiter(void 0, [discountId_1, _a], void 0, function* (discountId, { rejectWithValue }) {
    var _b, _c;
    try {
        const response = yield interceptor_1.default.patch(`/api/store-admin/discounts/remove/${discountId}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error Object:", error.response);
            const errorMessage = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.detail) || "Failed to delete discount.";
            return rejectWithValue(errorMessage);
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message || "An unexpected error occurred.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const discountsSlice = (0, toolkit_1.createSlice)({
    name: "discounts",
    initialState,
    reducers: {
        setSortField(state, action) {
            state.sortField = action.payload;
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchDiscountsAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchDiscountsAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.discounts = action.payload.data;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.fetchDiscountsAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchInventoryNamesAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.fetchInventoryNamesAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.inventoryNames = action.payload;
        })
            .addCase(exports.fetchInventoryNamesAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchInventoryWithoutDiscountsAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.fetchInventoryWithoutDiscountsAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.inventoryWithoutDiscounts = action.payload;
        })
            .addCase(exports.fetchInventoryWithoutDiscountsAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchDiscountDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchDiscountDetails.fulfilled, (state, action) => {
            state.discountDetail = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchDiscountDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.deleteDiscount.pending, (state) => {
            state.loading = true; // Set loading to true while the request is in progress
            state.error = null; // Reset any previous errors
        })
            .addCase(exports.deleteDiscount.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.deleteDiscount.rejected, (state, action) => {
            state.loading = false; // Set loading to false when the request fails
            state.error = action.payload; // Store the error message
        });
    },
});
_a = discountsSlice.actions, exports.setSortField = _a.setSortField, exports.setCurrentPage = _a.setCurrentPage, exports.setSortOrder = _a.setSortOrder, exports.setSearch = _a.setSearch;
exports.default = discountsSlice.reducer;
