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
exports.setStatus = exports.clearTransactionDetails = exports.fetchUserVouchers = exports.fetchTransactionDetails = exports.fetchPaymentHistory = exports.confirmOrder = exports.cancelOrder = exports.fetchOrders = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    orders: [],
    payments: [],
    vouchers: [],
    loading: false,
    error: null,
    details: null,
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    status: "",
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchOrders = (0, toolkit_1.createAsyncThunk)('userPayment/fetchOrders', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/order/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.order_data.orders;
    }
    catch (error) {
        return rejectWithValue('Failed to fetch orders.');
    }
}));
exports.cancelOrder = (0, toolkit_1.createAsyncThunk)('userPayment/cancelOrder', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, order_id }, { rejectWithValue }) {
    try {
        yield interceptor_1.default.put(`/api/order/cancel/${user_id}/${order_id}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return order_id;
    }
    catch (error) {
        return rejectWithValue('Failed to cancel the order.');
    }
}));
exports.confirmOrder = (0, toolkit_1.createAsyncThunk)('userPayment/confirmOrder', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, order_id }, { rejectWithValue }) {
    try {
        yield interceptor_1.default.put(`/api/order/confirm/${user_id}/${order_id}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return order_id;
    }
    catch (error) {
        return rejectWithValue('Failed to confirm the order.');
    }
}));
exports.fetchPaymentHistory = (0, toolkit_1.createAsyncThunk)('userPayment/fetchPaymentHistory', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, page, limit, status }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/order/payment-history/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                page,
                limit,
                status
            },
        });
        return {
            payments: response.data.data.payments,
            totalItems: response.data.data.totalItems,
            currentPage: response.data.data.currentPage,
            totalPages: response.data.data.totalPages,
        };
    }
    catch (error) {
        return rejectWithValue('Failed to fetch payment history.');
    }
}));
exports.fetchTransactionDetails = (0, toolkit_1.createAsyncThunk)('userPayment/fetchTransactionDetails', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, order_id }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/order/payment-details/${user_id}/${order_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Failed to fetch payment details.');
    }
}));
exports.fetchUserVouchers = (0, toolkit_1.createAsyncThunk)('userPayment/fetchUserVouchers', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/profile/vouchers/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data.vouchers;
    }
    catch (error) {
        return rejectWithValue('Failed to fetch user vouchers.');
    }
}));
const userPaymentSlice = (0, toolkit_1.createSlice)({
    name: 'userPayment',
    initialState,
    reducers: {
        clearTransactionDetails: (state) => { state.details = null; },
        setStatus(state, action) { state.status = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(exports.fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
            .addCase(exports.fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Unknown error'; })
            .addCase(exports.cancelOrder.pending, (state) => { state.loading = true; })
            .addCase(exports.cancelOrder.fulfilled, (state) => { state.loading = false; })
            .addCase(exports.cancelOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Unknown error'; })
            .addCase(exports.confirmOrder.pending, (state) => { state.loading = true; })
            .addCase(exports.confirmOrder.fulfilled, (state) => { state.loading = false; })
            .addCase(exports.confirmOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Unknown error'; })
            .addCase(exports.fetchPaymentHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchPaymentHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload.payments;
            state.totalItems = action.payload.totalItems;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        })
            .addCase(exports.fetchPaymentHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Unknown error';
        })
            .addCase(exports.fetchTransactionDetails.pending, (state) => { state.error = null; })
            .addCase(exports.fetchTransactionDetails.fulfilled, (state, action) => { state.details = action.payload; })
            .addCase(exports.fetchTransactionDetails.rejected, (state, action) => { state.error = action.payload || 'Unknown error'; })
            .addCase(exports.fetchUserVouchers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(exports.fetchUserVouchers.fulfilled, (state, action) => {
            state.loading = false;
            state.vouchers = action.payload;
        })
            .addCase(exports.fetchUserVouchers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Unknown error';
        });
    },
});
_a = userPaymentSlice.actions, exports.clearTransactionDetails = _a.clearTransactionDetails, exports.setStatus = _a.setStatus;
exports.default = userPaymentSlice.reducer;
