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
exports.setSortOrder = exports.setOrderStatus = exports.setSortField = exports.setCurrentPage = exports.toggleSidebar = exports.resetState = exports.fetchStoreOrders = exports.fetchAdminById = exports.fetchStoreByStoreId = exports.fetchStoreByUserId = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    storeName: '',
    storeLocation: '',
    adminName: '',
    loading: true,
    error: null,
    isSidebarOpen: false,
    storeOrders: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    sortField: "created_at",
    sortOrder: "desc",
    orderStatus: "",
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchStoreByUserId = (0, toolkit_1.createAsyncThunk)('storeAdmin/fetchStoreByUserId', (userId_1, _a) => __awaiter(void 0, [userId_1, _a], void 0, function* (userId, { rejectWithValue }) {
    if (typeof window === "undefined") {
        return rejectWithValue("Cannot fetch data during SSR");
    }
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/assigned-store/${userId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        js_cookie_1.default.set('storeId', response.data.data.store_id, { expires: 7, path: '/admin-store' });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Store not found for your account.');
    }
}));
exports.fetchStoreByStoreId = (0, toolkit_1.createAsyncThunk)('storeAdmin/fetchStoreByStoreId', (storeId_1, _a) => __awaiter(void 0, [storeId_1, _a], void 0, function* (storeId, { rejectWithValue }) {
    if (typeof window === "undefined") {
        return rejectWithValue("Cannot fetch data during SSR");
    }
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/store/${storeId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store data.');
    }
}));
exports.fetchAdminById = (0, toolkit_1.createAsyncThunk)('storeAdmin/fetchAdminById', (userId_1, _a) => __awaiter(void 0, [userId_1, _a], void 0, function* (userId, { rejectWithValue }) {
    if (typeof window === "undefined") {
        return rejectWithValue("Cannot fetch data during SSR");
    }
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/admin/${userId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching admin data.');
    }
}));
exports.fetchStoreOrders = (0, toolkit_1.createAsyncThunk)('storeAdmin/fetchStoreOrders', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ storeId, page = 1, sortField = "created_at", sortOrder = "desc", search = "", orderStatus }, { rejectWithValue }) {
    if (typeof window === "undefined") {
        return rejectWithValue("Cannot fetch data during SSR");
    }
    try {
        const response = yield interceptor_1.default.get(`/api/order/store/${storeId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { page, sortField, sortOrder, search, orderStatus },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store orders.');
    }
}));
const handleAsyncState = (state, action) => {
    state.loading = false;
    if (action.error) {
        state.error = action.error.message || 'Unknown error';
    }
    else if (action.payload) {
        const { store_name, store_location, username } = action.payload;
        if (store_name && store_location) {
            state.storeName = store_name;
            state.storeLocation = store_location;
        }
        if (username) {
            state.adminName = username;
        }
    }
};
const storeAdminSlice = (0, toolkit_1.createSlice)({
    name: 'storeAdmin',
    initialState,
    reducers: {
        resetState: (state) => {
            state.storeName = '';
            state.storeLocation = '';
            state.adminName = '';
            state.loading = true;
            state.error = null;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSortField(state, action) { state.sortField = action.payload; },
        setSortOrder(state, action) { state.sortOrder = action.payload; },
        setCurrentPage(state, action) { state.currentPage = action.payload; },
        setOrderStatus(state, action) { state.orderStatus = action.payload; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchStoreByUserId.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchStoreByUserId.fulfilled, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchStoreByUserId.rejected, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchStoreByStoreId.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchStoreByStoreId.fulfilled, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchStoreByStoreId.rejected, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchAdminById.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchAdminById.fulfilled, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchAdminById.rejected, (state, action) => handleAsyncState(state, action))
            .addCase(exports.fetchStoreOrders.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchStoreOrders.fulfilled, (state, action) => {
            state.loading = false;
            const { orders, currentPage, totalPages, totalItems } = action.payload.order_data;
            state.storeOrders = orders;
            state.totalPages = totalPages;
            state.totalItems = totalItems;
            state.currentPage = currentPage;
        })
            .addCase(exports.fetchStoreOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = storeAdminSlice.actions, exports.resetState = _a.resetState, exports.toggleSidebar = _a.toggleSidebar, exports.setCurrentPage = _a.setCurrentPage, exports.setSortField = _a.setSortField, exports.setOrderStatus = _a.setOrderStatus, exports.setSortOrder = _a.setSortOrder;
exports.default = storeAdminSlice.reducer;
