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
exports.resetEditState = exports.setEditId = exports.setCurrentPage = exports.setSearch = exports.createCategory = exports.deleteCategory = exports.updateCategory = exports.fetchAllCategories = exports.fetchCategories = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    category: [],
    allCategory: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    editId: null,
    loading: false,
    error: null,
    search: "",
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchCategories = (0, toolkit_1.createAsyncThunk)("manageCategory/fetchCategories", (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/products/categories/all`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch categories.");
        }
        else {
            return rejectWithValue("An Unexpected error occurred.");
        }
    }
}));
exports.fetchAllCategories = (0, toolkit_1.createAsyncThunk)("manageCategory/fetchAllCategories", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, pageSize = 10, search = "", }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/products/categories?page=${page}&pageSize=${pageSize}&search=${search}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch categories.");
        }
        else {
            return rejectWithValue("An Unexpected error occurred.");
        }
    }
}));
exports.updateCategory = (0, toolkit_1.createAsyncThunk)("superAdmin/updateCategory", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ category_id, category_name, }, { rejectWithValue }) {
    try {
        const response = yield axios_1.default.patch(`/api/products/categories/${category_id}`, { category_name }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to update the category.");
        }
        else {
            return rejectWithValue("Error updating category");
        }
    }
}));
exports.deleteCategory = (0, toolkit_1.createAsyncThunk)("manageCategory/deleteCategory", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ category_id }, { rejectWithValue }) {
    try {
        const response = yield axios_1.default.patch(`/api/products/categories/delete/${category_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to delete the category.");
        }
        else {
            return rejectWithValue("Error deleting the category");
        }
    }
}));
exports.createCategory = (0, toolkit_1.createAsyncThunk)("manageCategory/createCategory", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ category_name }, { rejectWithValue }) {
    try {
        const response = yield axios_1.default.post(`/api/products/categories`, { category_name }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to create a new category.");
        }
        else {
            return rejectWithValue("Error creating the new category");
        }
    }
}));
const manageCategorySlice = (0, toolkit_1.createSlice)({
    name: "manageCategory",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setEditId: (state, action) => {
            state.editId = action.payload;
        },
        resetEditState: (state) => {
            state.editId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAllCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllCategories.fulfilled, (state, action) => {
            state.category = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
            state.loading = false;
        })
            .addCase(exports.fetchAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.updateCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            const updatedCategory = state.category.find((cat) => cat.category_id === action.payload.category_id);
            if (updatedCategory) {
                updatedCategory.category_name = action.payload.category_name;
            }
        })
            .addCase(exports.updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = state.category.filter((cat) => cat.category_id !== action.meta.arg.category_id);
        })
            .addCase(exports.deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.category.push(action.payload);
        })
            .addCase(exports.createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.allCategory = action.payload;
        })
            .addCase(exports.fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = manageCategorySlice.actions, exports.setSearch = _a.setSearch, exports.setCurrentPage = _a.setCurrentPage, exports.setEditId = _a.setEditId, exports.resetEditState = _a.resetEditState;
exports.default = manageCategorySlice.reducer;
