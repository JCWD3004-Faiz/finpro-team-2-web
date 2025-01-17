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
exports.setCategory = exports.setSearch = exports.setSortOrder = exports.setCurrentPage = exports.setSortField = exports.fetchAllCategories = exports.fetchInventoriesUser = exports.fetchProductDetailsByInventoryId = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const access_token = js_cookie_1.default.get("access_token");
const initialProductImage = {
    product_image: "",
    is_primary: false,
};
const initialProductDetail = {
    inventory_id: 0,
    product_id: 0,
    product_name: "",
    description: "",
    category_name: "",
    discounted_price: 0,
    discount_type: null,
    discount_value: null,
    price: 0,
    user_stock: 0,
    product_images: [initialProductImage],
};
const initialState = {
    productDetailUser: initialProductDetail,
    productAllUser: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    sortField: "product_name",
    sortOrder: "asc",
    search: "",
    category: "",
    categories: [], // Added categories state
    loading: false,
    error: null,
};
// Fetch product details by inventory ID
exports.fetchProductDetailsByInventoryId = (0, toolkit_1.createAsyncThunk)("products/fetchProductDetailsByInventoryId", (inventoryId_1, _a) => __awaiter(void 0, [inventoryId_1, _a], void 0, function* (inventoryId, { rejectWithValue }) {
    var _b;
    try {
        const response = yield interceptor_1.default.get(`/api/users/products/detail/${inventoryId}`);
        if (response.status !== 201) {
            throw new Error("Failed to fetch product details.");
        }
        return response.data.inventory;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to fetch product details.");
        }
        return rejectWithValue("An unexpected error occurred.");
    }
}));
// Fetch paginated inventories
exports.fetchInventoriesUser = (0, toolkit_1.createAsyncThunk)("inventories/fetchInventoriesUser", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, pageSize = 10, search = "", category = "", sortField = "product_name", sortOrder = "asc", store_id = 28 }, { rejectWithValue }) {
    var _c, _d, _e;
    try {
        const response = yield interceptor_1.default.get(`/api/users/products/${store_id || 28}?page=${page}&pageSize=${pageSize}&search=${search}&category=${category}&sortField=${sortField}&sortOrder=${sortOrder}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.inventories; // Adjust to match your API response structure
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "Failed to fetch inventories.");
        }
        return rejectWithValue("An unexpected error occurred.");
    }
}));
// Fetch all categories
exports.fetchAllCategories = (0, toolkit_1.createAsyncThunk)("products/fetchAllCategories", (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/users/categories`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data; // Assuming the API returns an array of category names
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch categories.");
        }
        return rejectWithValue("An unexpected error occurred.");
    }
}));
const getProductsSlice = (0, toolkit_1.createSlice)({
    name: "products",
    initialState,
    reducers: {
        setSortField: (state, action) => {
            state.sortField = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch product details
            .addCase(exports.fetchProductDetailsByInventoryId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchProductDetailsByInventoryId.fulfilled, (state, action) => {
            state.loading = false;
            state.productDetailUser = action.payload;
        })
            .addCase(exports.fetchProductDetailsByInventoryId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch product details.";
        })
            // Fetch inventories
            .addCase(exports.fetchInventoriesUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchInventoriesUser.fulfilled, (state, action) => {
            state.loading = false;
            state.productAllUser = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.fetchInventoriesUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch inventories.";
        })
            // Fetch all categories
            .addCase(exports.fetchAllCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload; // Update categories state
        })
            .addCase(exports.fetchAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch categories.";
        });
    },
});
_a = getProductsSlice.actions, exports.setSortField = _a.setSortField, exports.setCurrentPage = _a.setCurrentPage, exports.setSortOrder = _a.setSortOrder, exports.setSearch = _a.setSearch, exports.setCategory = _a.setCategory;
exports.default = getProductsSlice.reducer;
