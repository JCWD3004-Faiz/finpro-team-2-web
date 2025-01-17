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
exports.resetEditState = exports.setSuggestionsPosition = exports.setStoreSuggestions = exports.setLocationSuggestions = exports.setEditAdminData = exports.setEditStoreData = exports.setEditId = exports.toggleSidebar = exports.setSortField = exports.setSortFieldAdmin = exports.setSortFieldOrder = exports.setCurrentPage = exports.setOrderStatus = exports.setStoreName = exports.fetchStoreNames = exports.fetchAllOrders = exports.createStore = exports.deleteStoreAdmin = exports.assignStoreAdmin = exports.updateStore = exports.deleteStore = exports.fetchAllStores = exports.registerStoreAdmin = exports.fetchStoreAdmins = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    storeAdmins: [],
    loading: false,
    error: null,
    isSidebarOpen: false,
    editId: null,
    editStoreData: { storeName: '', locationName: '', cityId: 0 },
    editAdminData: { storeName: '', storeId: 0 },
    locationSuggestions: [],
    storeSuggestions: [],
    suggestionsPosition: { top: 0, left: 0, width: 0 },
    allStores: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    sortField: "admin",
    sortFieldAdmin: "store",
    sortFieldOrder: "created_at",
    orderStatus: "",
    allOrders: [],
    storeName: "",
    storeNames: []
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchStoreAdmins = (0, toolkit_1.createAsyncThunk)('superAdmin/fetchStoreAdmins', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, sortFieldAdmin = "store", sortOrder = "asc", search = "" }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get('/api/super-admin/store-admin', {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { page, sortFieldAdmin, sortOrder, search }
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store admins');
    }
}));
exports.registerStoreAdmin = (0, toolkit_1.createAsyncThunk)('superAdmin/registerStoreAdmin', (credentials_1, _a) => __awaiter(void 0, [credentials_1, _a], void 0, function* (credentials, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post('/api/super-admin/register', Object.assign(Object.assign({}, credentials), { role: 'STORE_ADMIN' }), {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Error registering admin');
    }
}));
exports.fetchAllStores = (0, toolkit_1.createAsyncThunk)('superAdmin/fetchAllStores', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, sortField = "admin", sortOrder = "asc", search = "" }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get('/api/super-admin/stores', {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { page, sortField, sortOrder, search }
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store data.');
    }
}));
exports.deleteStore = (0, toolkit_1.createAsyncThunk)('superAdmin/deleteStore', (store_id_1, _a) => __awaiter(void 0, [store_id_1, _a], void 0, function* (store_id, { rejectWithValue }) {
    try {
        yield interceptor_1.default.put(`/api/super-admin/store/${store_id}`, {}, { headers: { Authorization: `Bearer ${access_token}` } });
        return store_id;
    }
    catch (error) {
        return rejectWithValue('Error deleting store');
    }
}));
exports.updateStore = (0, toolkit_1.createAsyncThunk)('superAdmin/updateStore', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ store_id, store_name, store_location, city_id }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.patch(`/api/super-admin/store/${store_id}`, { store_name, store_location, city_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Error updating store');
    }
}));
exports.assignStoreAdmin = (0, toolkit_1.createAsyncThunk)('superAdmin/assignAdmin', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ store_id, user_id }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post(`/api/super-admin/assign`, { user_id, store_id }, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Error assigning admin');
    }
}));
exports.deleteStoreAdmin = (0, toolkit_1.createAsyncThunk)('superAdmin/deleteStoreAdmin', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        yield interceptor_1.default.delete(`/api/super-admin/admin/${user_id}`, { headers: { Authorization: `Bearer ${access_token}` } });
        return user_id;
    }
    catch (error) {
        return rejectWithValue('Error deleting admin');
    }
}));
exports.createStore = (0, toolkit_1.createAsyncThunk)('superAdmin/createStore', (credentials_1, _a) => __awaiter(void 0, [credentials_1, _a], void 0, function* (credentials, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post('/api/super-admin/store', Object.assign({}, credentials), {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error creating store');
    }
}));
exports.fetchAllOrders = (0, toolkit_1.createAsyncThunk)('storeAdmin/fetchAllOrders', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, sortFieldOrder = "created_at", sortOrder = "asc", search = "", orderStatus, storeName }, { rejectWithValue }) {
    if (typeof window === "undefined") {
        return rejectWithValue("Cannot fetch data during SSR");
    }
    try {
        const response = yield interceptor_1.default.get(`/api/order/all`, {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { page, sortFieldOrder, sortOrder, search, orderStatus, storeName },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store orders.');
    }
}));
exports.fetchStoreNames = (0, toolkit_1.createAsyncThunk)('superAdmin/fetchStoreNames', (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get('/api/super-admin/store-names', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching store names');
    }
}));
const asyncActionHandler = (state, action, successCallback) => {
    state.loading = action.type.endsWith('pending'); // Set loading to true if pending
    if (action.type.endsWith('rejected')) {
        state.error = action.payload;
        state.loading = false; // Set loading to false if failed
    }
    else if (action.type.endsWith('fulfilled')) {
        state.loading = false; // Set loading to false if successful
        if (successCallback) {
            successCallback(state, action);
        }
    }
};
const superAdminSlice = (0, toolkit_1.createSlice)({
    name: 'superAdmin',
    initialState,
    reducers: {
        toggleSidebar: (state) => { state.isSidebarOpen = !state.isSidebarOpen; },
        setEditId: (state, action) => { state.editId = action.payload; },
        setEditStoreData: (state, action) => { state.editStoreData = action.payload; },
        setEditAdminData: (state, action) => { state.editAdminData = action.payload; },
        setLocationSuggestions: (state, action) => { state.locationSuggestions = action.payload; },
        setStoreSuggestions: (state, action) => { state.storeSuggestions = action.payload; },
        setSuggestionsPosition: (state, action) => { state.suggestionsPosition = action.payload; },
        resetEditState: (state) => { state.editId = null; state.locationSuggestions = []; },
        setSortField(state, action) { state.sortField = action.payload; },
        setSortFieldAdmin(state, action) { state.sortFieldAdmin = action.payload; },
        setCurrentPage(state, action) { state.currentPage = action.payload; },
        setSortFieldOrder(state, action) { state.sortFieldOrder = action.payload; },
        setOrderStatus(state, action) { state.orderStatus = action.payload; },
        setStoreName(state, action) { state.storeName = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchStoreAdmins.pending, (state) => asyncActionHandler(state, { type: 'fetchStoreAdmins/pending' }))
            .addCase(exports.fetchStoreAdmins.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            state.loading = false;
            state.storeAdmins = action.payload.data || [];
            state.totalPages = action.payload.totalPages || 1;
            state.totalItems = action.payload.totalItems || 0;
        }))
            .addCase(exports.fetchStoreAdmins.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.registerStoreAdmin.pending, (state) => asyncActionHandler(state, { type: 'registerStoreAdmin/pending' }))
            .addCase(exports.registerStoreAdmin.fulfilled, (state) => asyncActionHandler(state, { type: 'registerStoreAdmin/fulfilled' }))
            .addCase(exports.registerStoreAdmin.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.fetchAllStores.pending, (state) => asyncActionHandler(state, { type: 'fetchAllStores/pending' }))
            .addCase(exports.fetchAllStores.fulfilled, (state, action) => {
            state.loading = false;
            state.allStores = action.payload.data || [];
            state.totalPages = action.payload.totalPages || 1;
            state.totalItems = action.payload.totalItems || 0;
        })
            .addCase(exports.fetchAllStores.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.deleteStore.pending, (state) => asyncActionHandler(state, { type: 'deleteStore/pending' }))
            .addCase(exports.deleteStore.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            state.allStores = state.allStores.filter(store => store.store_id !== action.payload);
        }))
            .addCase(exports.deleteStore.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.updateStore.pending, (state) => asyncActionHandler(state, { type: 'updateStore/pending' }))
            .addCase(exports.updateStore.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            const updatedStore = action.payload;
            state.allStores = state.allStores.map(store => store.store_id === updatedStore.store_id ? updatedStore : store);
        }))
            .addCase(exports.updateStore.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.assignStoreAdmin.pending, (state) => asyncActionHandler(state, { type: 'assignAdmin/pending' }))
            .addCase(exports.assignStoreAdmin.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            const assignedAdmin = action.payload;
            state.storeAdmins = state.storeAdmins.map(admin => admin.user_id === assignedAdmin.user_id ? assignedAdmin : admin);
        }))
            .addCase(exports.assignStoreAdmin.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.deleteStoreAdmin.pending, (state) => asyncActionHandler(state, { type: 'deleteStoreAdmin/pending' }))
            .addCase(exports.deleteStoreAdmin.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            const userIdToDelete = action.payload;
            state.storeAdmins = state.storeAdmins.filter(admin => admin.user_id !== userIdToDelete);
        }))
            .addCase(exports.deleteStoreAdmin.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.createStore.pending, (state) => asyncActionHandler(state, { type: 'createStore/pending' }))
            .addCase(exports.createStore.fulfilled, (state, action) => asyncActionHandler(state, action, (state, action) => {
            state.allStores.push(action.payload);
        }))
            .addCase(exports.createStore.rejected, (state, action) => asyncActionHandler(state, action))
            .addCase(exports.fetchAllOrders.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            const { orders, currentPage, totalPages, totalItems } = action.payload;
            state.allOrders = orders;
            state.totalPages = totalPages;
            state.totalItems = totalItems;
            state.currentPage = currentPage;
        })
            .addCase(exports.fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(exports.fetchStoreNames.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(exports.fetchStoreNames.fulfilled, (state, action) => { state.loading = false; state.storeNames = action.payload; })
            .addCase(exports.fetchStoreNames.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});
_a = superAdminSlice.actions, exports.setStoreName = _a.setStoreName, exports.setOrderStatus = _a.setOrderStatus, exports.setCurrentPage = _a.setCurrentPage, exports.setSortFieldOrder = _a.setSortFieldOrder, exports.setSortFieldAdmin = _a.setSortFieldAdmin, exports.setSortField = _a.setSortField, exports.toggleSidebar = _a.toggleSidebar, exports.setEditId = _a.setEditId, exports.setEditStoreData = _a.setEditStoreData, exports.setEditAdminData = _a.setEditAdminData, exports.setLocationSuggestions = _a.setLocationSuggestions, exports.setStoreSuggestions = _a.setStoreSuggestions, exports.setSuggestionsPosition = _a.setSuggestionsPosition, exports.resetEditState = _a.resetEditState;
exports.default = superAdminSlice.reducer;
