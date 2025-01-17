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
exports.setEditingStatus = exports.setNewStatus = exports.fetchSuperCartItems = exports.fetchSuperPayment = exports.processOrder = exports.fetchCartItems = exports.savePaymentStatus = exports.fetchPayment = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const initialState = {
    payment: null,
    cartItems: [],
    loading: false,
    error: null,
    newStatus: '',
    editingStatus: false,
    processing: false,
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchPayment = (0, toolkit_1.createAsyncThunk)('managePayment/fetchPayment', (_a) => __awaiter(void 0, [_a], void 0, function* ({ store_id, payment_id }) {
    const response = yield interceptor_1.default.get(`/api/order/payment/${store_id}/${payment_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.payment;
}));
exports.savePaymentStatus = (0, toolkit_1.createAsyncThunk)('managePayment/savePaymentStatus', (_a) => __awaiter(void 0, [_a], void 0, function* ({ store_id, payment_id, newStatus }) {
    const response = yield interceptor_1.default.put(`/api/order/payment/${store_id}/${payment_id}`, {
        payment_status: newStatus
    }, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.updatedPayment;
}));
exports.fetchCartItems = (0, toolkit_1.createAsyncThunk)('managePayment/fetchCartItems', (_a) => __awaiter(void 0, [_a], void 0, function* ({ store_id, order_id }) {
    const response = yield interceptor_1.default.get(`/api/order/store-items/${store_id}/${order_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.cartItems;
}));
exports.processOrder = (0, toolkit_1.createAsyncThunk)('managePayment/processOrder', (_a) => __awaiter(void 0, [_a], void 0, function* ({ store_id, order_id }) {
    const response = yield interceptor_1.default.put(`/api/order/process/${store_id}/${order_id}`, {}, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.status;
}));
exports.fetchSuperPayment = (0, toolkit_1.createAsyncThunk)('managePayment/fetchSuperPayment', (_a) => __awaiter(void 0, [_a], void 0, function* ({ payment_id }) {
    const response = yield interceptor_1.default.get(`/api/order/super/${payment_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.payment;
}));
exports.fetchSuperCartItems = (0, toolkit_1.createAsyncThunk)('managePayment/fetchSuperCartItems', (_a) => __awaiter(void 0, [_a], void 0, function* ({ order_id }) {
    const response = yield interceptor_1.default.get(`/api/order/super-items/${order_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.cartItems;
}));
const managePaymentSlice = (0, toolkit_1.createSlice)({
    name: 'managePayment',
    initialState,
    reducers: {
        setNewStatus: (state, action) => { state.newStatus = action.payload; },
        setEditingStatus: (state, action) => { state.editingStatus = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchPayment.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.payment = action.payload;
            state.newStatus = action.payload.payment_status;
        })
            .addCase(exports.fetchPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch payment details';
        })
            .addCase(exports.fetchCartItems.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
        })
            .addCase(exports.fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch cart items';
        })
            .addCase(exports.savePaymentStatus.pending, (state) => { state.loading = true; })
            .addCase(exports.savePaymentStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.payment = action.payload;
            state.editingStatus = false;
        })
            .addCase(exports.savePaymentStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update payment status';
        })
            .addCase(exports.processOrder.pending, (state) => { state.processing = true; })
            .addCase(exports.processOrder.fulfilled, (state) => { state.processing = false; })
            .addCase(exports.processOrder.rejected, (state) => {
            state.processing = false;
            state.error = 'Failed to process the order';
        })
            .addCase(exports.fetchSuperPayment.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchSuperPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.payment = action.payload;
        })
            .addCase(exports.fetchSuperPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch super payment details';
        })
            .addCase(exports.fetchSuperCartItems.pending, (state) => { state.loading = true; })
            .addCase(exports.fetchSuperCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
        })
            .addCase(exports.fetchSuperCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch super cart items';
        });
    },
});
_a = managePaymentSlice.actions, exports.setNewStatus = _a.setNewStatus, exports.setEditingStatus = _a.setEditingStatus;
exports.default = managePaymentSlice.reducer;
