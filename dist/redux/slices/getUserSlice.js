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
exports.setCurrentPage = exports.fetchAllUsers = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const access_token = js_cookie_1.default.get("access_token");
const initialState = {
    allUser: [],
    search: "",
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    role: "",
    loading: false,
    error: null,
};
exports.fetchAllUsers = (0, toolkit_1.createAsyncThunk)("users/fetchAllUsers", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, pageSize = 10, search = "", role = "", }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/users?page=${page}&pageSize=${pageSize}&search=${search}&role=${role}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data; // Adjust to match your API response structure
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch users.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const getUserSlice = (0, toolkit_1.createSlice)({
    name: "users",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUser = action.payload.data; // Replace `.users` with your API response structure
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
        })
            .addCase(exports.fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch users.";
        });
    },
});
exports.setCurrentPage = getUserSlice.actions.setCurrentPage;
exports.default = getUserSlice.reducer;
