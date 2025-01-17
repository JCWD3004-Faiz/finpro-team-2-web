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
exports.setDiscountType = exports.setVoucherType = exports.setTotalPages = exports.setSortField = exports.createVoucher = exports.giftVoucher = exports.editVoucher = exports.deleteVoucher = exports.fetchVouchers = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    vouchers: [],
    sortField: 'discount_amount',
    loading: false,
    error: null,
    totalPages: 1,
    voucherType: "",
    discountType: ""
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchVouchers = (0, toolkit_1.createAsyncThunk)('manageVoucher/fetchVouchers', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, sortField = "discount_amount", sortOrder = "asc", search = "", voucherType, discountType }, { rejectWithValue }) {
    try {
        const { data } = yield interceptor_1.default.get('/api/super-admin/vouchers', {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { page, sortField, sortOrder, search, voucherType, discountType },
        });
        return { vouchers: data.data, totalPages: data.pagination.totalPages };
    }
    catch (error) {
        return rejectWithValue(error);
    }
}));
exports.deleteVoucher = (0, toolkit_1.createAsyncThunk)('manageVoucher/deleteVoucher', (voucher_id_1, _a) => __awaiter(void 0, [voucher_id_1, _a], void 0, function* (voucher_id, { rejectWithValue }) {
    try {
        yield interceptor_1.default.put(`/api/super-admin/voucher/${voucher_id}`, {}, { headers: { Authorization: `Bearer ${access_token}` } });
        return voucher_id;
    }
    catch (error) {
        return rejectWithValue('Error deleting voucher');
    }
}));
exports.editVoucher = (0, toolkit_1.createAsyncThunk)('manageVoucher/editVoucher', (voucherData_1, _a) => __awaiter(void 0, [voucherData_1, _a], void 0, function* (voucherData, { rejectWithValue }) {
    try {
        const { data } = yield interceptor_1.default.patch(`/api/super-admin/voucher/${voucherData.voucher_id}`, voucherData, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return data;
    }
    catch (error) {
        return rejectWithValue('Error editing voucher');
    }
}));
exports.giftVoucher = (0, toolkit_1.createAsyncThunk)('manageVoucher/giftVoucher', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ voucher_id, email }, { rejectWithValue }) {
    try {
        yield interceptor_1.default.post(`/api/super-admin/gift-voucher/${voucher_id}`, { email }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return { voucher_id, email }; // Returning voucher_id and email for any required post-action logic
    }
    catch (error) {
        return rejectWithValue('Error gifting voucher');
    }
}));
exports.createVoucher = (0, toolkit_1.createAsyncThunk)('manageVoucher/createVoucher', (voucherData_1, _a) => __awaiter(void 0, [voucherData_1, _a], void 0, function* (voucherData, { rejectWithValue }) {
    try {
        const { data } = yield interceptor_1.default.post('/api/super-admin/voucher', voucherData, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return data; // This will return the created voucher data
    }
    catch (error) {
        return rejectWithValue('Error creating voucher');
    }
}));
const manageVoucherSlice = (0, toolkit_1.createSlice)({
    name: 'manageVoucher',
    initialState,
    reducers: {
        setSortField: (state, action) => { state.sortField = action.payload; },
        setTotalPages: (state, action) => { state.totalPages = action.payload; },
        setVoucherType(state, action) { state.voucherType = action.payload; },
        setDiscountType(state, action) { state.discountType = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchVouchers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchVouchers.fulfilled, (state, action) => {
            state.vouchers = action.payload.vouchers;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        })
            .addCase(exports.fetchVouchers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.deleteVoucher.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.deleteVoucher.fulfilled, (state, action) => {
            state.vouchers = state.vouchers.filter(voucher => voucher.voucher_id !== action.payload);
        })
            .addCase(exports.deleteVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.editVoucher.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.editVoucher.fulfilled, (state, action) => {
            state.loading = false;
            const updatedVoucherIndex = state.vouchers.findIndex(voucher => voucher.voucher_id === action.payload.voucher_id);
            if (updatedVoucherIndex !== -1) {
                state.vouchers[updatedVoucherIndex] = action.payload;
            }
        })
            .addCase(exports.editVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.giftVoucher.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.giftVoucher.fulfilled, (state) => {
            state.loading = false;
        })
            .addCase(exports.giftVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.createVoucher.pending, (state) => {
            state.loading = true; // Show loading state while creating the voucher
        })
            .addCase(exports.createVoucher.fulfilled, (state, action) => {
            state.loading = false; // Hide loading
            state.vouchers.push(action.payload); // Add the newly created voucher to the list
        })
            .addCase(exports.createVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Handle error
        });
    }
});
_a = manageVoucherSlice.actions, exports.setSortField = _a.setSortField, exports.setTotalPages = _a.setTotalPages, exports.setVoucherType = _a.setVoucherType, exports.setDiscountType = _a.setDiscountType;
exports.default = manageVoucherSlice.reducer;
