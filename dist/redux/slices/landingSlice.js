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
exports.resetStore = exports.setError = exports.setLocation = exports.fetchClosestStoreById = exports.fetchClosestStore = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    location: null,
    closestStore: null,
    error: null,
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchClosestStore = (0, toolkit_1.createAsyncThunk)('landing/fetchClosestStore', (location_1, _a) => __awaiter(void 0, [location_1, _a], void 0, function* (location, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post('/api/profile/closest-store', {
            latitude: location.lat,
            longitude: location.lon,
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch closest store');
    }
}));
exports.fetchClosestStoreById = (0, toolkit_1.createAsyncThunk)('landing/fetchClosestStoreById', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/profile/closest-store/${user_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch user details');
    }
}));
const defaultStore = {
    store_id: 28,
    store_name: "Default Store",
    store_location: "Fetching location...",
};
// Create the slice
const landingSlice = (0, toolkit_1.createSlice)({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetStore: (state) => {
            state.closestStore = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchClosestStore.pending, (state) => {
            state.error = null;
        })
            .addCase(exports.fetchClosestStore.fulfilled, (state, action) => {
            if (action.payload.store_id) {
                state.closestStore = action.payload;
                state.error = null;
            }
            else {
                // If no store is found, use the default store
                state.closestStore = defaultStore;
                state.error = "No stores found within 50 km.";
            }
        })
            .addCase(exports.fetchClosestStore.rejected, (state, action) => {
            state.error = action.payload;
        })
            .addCase(exports.fetchClosestStoreById.pending, (state) => {
            state.error = null;
        })
            .addCase(exports.fetchClosestStoreById.fulfilled, (state, action) => {
            if (action.payload.store_id) {
                state.closestStore = action.payload;
                state.error = null;
            }
            else {
                // Use the default store if no store is found
                state.closestStore = defaultStore;
                state.error = "No stores found within 50 km.";
            }
        })
            .addCase(exports.fetchClosestStoreById.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});
_a = landingSlice.actions, exports.setLocation = _a.setLocation, exports.setError = _a.setError, exports.resetStore = _a.resetStore;
exports.default = landingSlice.reducer;
