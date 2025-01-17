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
exports.setSuggestionsPosition = exports.setLocationSuggestions = exports.setDefaultAddress = exports.deleteAddress = exports.addAddress = exports.fetchAddresses = exports.fetchProfile = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    username: '',
    email: null,
    is_verified: false,
    image: null,
    loading: true,
    error: null,
    locationSuggestions: [],
    suggestionsPosition: { top: 0, left: 0, width: 0 },
    addresses: [],
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchProfile = (0, toolkit_1.createAsyncThunk)('userProfile/fetchProfile', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/profile/user/${user_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching profile');
    }
}));
exports.fetchAddresses = (0, toolkit_1.createAsyncThunk)('userProfile/fetchAddresses', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/profile/address/${user_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error fetching addresses');
    }
}));
exports.addAddress = (0, toolkit_1.createAsyncThunk)('userProfile/addAddress', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, address, city_name, city_id }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post('/api/profile/address', { user_id, address, city_name, city_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Error adding address');
    }
}));
exports.deleteAddress = (0, toolkit_1.createAsyncThunk)('userProfile/deleteAddress', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, address_id }, { rejectWithValue }) {
    try {
        yield interceptor_1.default.put(`/api/profile/address/${user_id}/${address_id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return address_id; // Return the address ID to be removed
    }
    catch (error) {
        return rejectWithValue('Error deleting address');
    }
}));
exports.setDefaultAddress = (0, toolkit_1.createAsyncThunk)('userProfile/setDefaultAddress', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, address_id }, { rejectWithValue }) {
    try {
        yield interceptor_1.default.post('/api/profile/default', { user_id, new_address_id: address_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return address_id;
    }
    catch (error) {
        return rejectWithValue('Error setting default address');
    }
}));
const userProfileSlice = (0, toolkit_1.createSlice)({
    name: 'userProfile',
    initialState,
    reducers: {
        setLocationSuggestions: (state, action) => { state.locationSuggestions = action.payload; },
        setSuggestionsPosition: (state, action) => { state.suggestionsPosition = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchProfile.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.is_verified = action.payload.is_verified;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.loading = false;
        })
            .addCase(exports.fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchAddresses.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAddresses.fulfilled, (state, action) => {
            state.addresses = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchAddresses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.addAddress.fulfilled, (state, action) => {
            state.addresses.push(action.payload);
        })
            .addCase(exports.deleteAddress.fulfilled, (state, action) => {
            state.addresses = state.addresses.filter(address => address.address_id !== action.payload);
        })
            .addCase(exports.setDefaultAddress.fulfilled, (state, action) => {
            state.addresses = state.addresses.map(address => address.address_id === action.payload
                ? Object.assign(Object.assign({}, address), { is_default: true }) : Object.assign(Object.assign({}, address), { is_default: false }));
        });
    },
});
_a = userProfileSlice.actions, exports.setLocationSuggestions = _a.setLocationSuggestions, exports.setSuggestionsPosition = _a.setSuggestionsPosition;
exports.default = userProfileSlice.reducer;
