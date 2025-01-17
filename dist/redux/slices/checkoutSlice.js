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
exports.setSelectedShipping = exports.setSelectedAddress = exports.failedMidtransPaymentStatus = exports.successMidtransPaymentStatus = exports.createVABankTransfer = exports.submitPayment = exports.redeemShippingVoucher = exports.fetchShippingVouchers = exports.updateShippingMethod = exports.updateAddress = exports.fetchOrderDetails = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const axios_1 = require("axios");
const initialState = {
    orderDetails: null,
    selectedAddress: undefined,
    selectedShipping: undefined,
    loading: false,
    error: null,
    updateAddress: null,
    shippingMethod: null,
    newShippingPrice: 0,
    shippingVouchers: [],
    paymentError: null,
    vaBankTransferData: null,
    vaBankTransferError: null,
    paymentDetails: null,
};
const access_token = js_cookie_1.default.get('access_token');
exports.fetchOrderDetails = (0, toolkit_1.createAsyncThunk)('checkout/fetchOrderDetails', (params) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield interceptor_1.default.get(`/api/order/details/${params.user_id}/${params.order_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.data.order;
}));
exports.updateAddress = (0, toolkit_1.createAsyncThunk)('checkout/updateAddress', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    try {
        const response = yield axios_1.default.put('/api/order/address', { user_id: params.user_id, order_id: params.order_id, address_id: params.address_id }, { headers: { Authorization: `Bearer ${access_token}` } });
        return response.data.new_shipping_price; // Return the new shipping price if valid
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err) && err.response) {
            return rejectWithValue("Address is too far away from the store.");
        }
        else {
            return rejectWithValue("An unexpected error occurred");
        }
    }
}));
exports.updateShippingMethod = (0, toolkit_1.createAsyncThunk)('checkout/updateShippingMethod', (params) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield interceptor_1.default.put('/api/order/method', { user_id: params.user_id, order_id: params.order_id, shipping_method: params.shipping_method }, { headers: { Authorization: `Bearer ${access_token}` } });
    return response.data.new_shipping_price;
}));
exports.fetchShippingVouchers = (0, toolkit_1.createAsyncThunk)('userPayment/fetchShippingVouchers', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/order/shipping-vouchers/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data.vouchers;
    }
    catch (error) {
        return rejectWithValue('Failed to fetch shipping vouchers.');
    }
}));
exports.redeemShippingVoucher = (0, toolkit_1.createAsyncThunk)('checkout/redeemShippingVoucher', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post('/api/order/redeem-shipping', params, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue('Failed to apply shipping voucher discount');
    }
}));
exports.submitPayment = (0, toolkit_1.createAsyncThunk)('checkout/submitPayment', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    const { user_id, order_id, paymentMethod, date, popImage } = params;
    const formData = new FormData();
    if (popImage)
        formData.append('pop_image', popImage);
    formData.append('payment_method', paymentMethod);
    formData.append('payment_date', date);
    try {
        const response = yield interceptor_1.default.post(`/api/order/payment/${user_id}/${order_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (response.data.message === 'Payment created successfully') {
            return response.data;
        }
        return rejectWithValue(response.data.error || 'Failed to submit payment');
    }
    catch (error) {
        return rejectWithValue('An error occurred while submitting payment');
    }
}));
exports.createVABankTransfer = (0, toolkit_1.createAsyncThunk)('checkout/createVABankTransfer', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    const { user_id, transaction_id } = params;
    try {
        const response = yield interceptor_1.default.post('/api/midtrans', { user_id, transaction_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Failed to create VA Bank Transfer');
    }
}));
exports.successMidtransPaymentStatus = (0, toolkit_1.createAsyncThunk)('checkout/successMidtransPaymentStatus', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    const { user_id, transaction_id } = params;
    try {
        const response = yield interceptor_1.default.put('/api/midtrans/success/', { user_id, transaction_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Failed to update payment status');
    }
}));
exports.failedMidtransPaymentStatus = (0, toolkit_1.createAsyncThunk)('checkout/failedMidtransPaymentStatus', (params_1, _a) => __awaiter(void 0, [params_1, _a], void 0, function* (params, { rejectWithValue }) {
    const { user_id, transaction_id } = params;
    try {
        const response = yield interceptor_1.default.put('/api/midtrans/failed/', { user_id, transaction_id }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue('Failed to update payment status');
    }
}));
const checkoutSlice = (0, toolkit_1.createSlice)({
    name: 'checkout',
    initialState,
    reducers: {
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setSelectedShipping: (state, action) => {
            state.selectedShipping = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchOrderDetails.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        })
            .addCase(exports.fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch order details';
        })
            .addCase(exports.updateAddress.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.updateAddress = action.payload;
            state.newShippingPrice = action.payload;
            state.error = null; // Clear any previous errors
        })
            .addCase(exports.updateAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = String(action.payload) || 'Failed to update address';
            state.selectedAddress = "";
        })
            .addCase(exports.updateShippingMethod.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.updateShippingMethod.fulfilled, (state, action) => {
            state.loading = false;
            state.shippingMethod = action.payload;
            state.newShippingPrice = action.payload;
        })
            .addCase(exports.updateShippingMethod.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update shipping method';
        })
            .addCase(exports.fetchShippingVouchers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(exports.fetchShippingVouchers.fulfilled, (state, action) => {
            state.loading = false;
            state.shippingVouchers = action.payload;
        })
            .addCase(exports.fetchShippingVouchers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Unknown error';
        })
            .addCase(exports.redeemShippingVoucher.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.redeemShippingVoucher.fulfilled, (state, action) => {
            state.loading = false;
            state.newShippingPrice = action.payload.newShippingPrice;
        })
            .addCase(exports.redeemShippingVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === 'string' ? action.payload : 'Failed to apply shipping voucher discount';
        })
            .addCase(exports.submitPayment.pending, (state) => {
            state.loading = true;
            state.paymentError = null;
        })
            .addCase(exports.submitPayment.fulfilled, (state) => {
            state.loading = false;
        })
            .addCase(exports.submitPayment.rejected, (state, action) => {
            state.loading = false;
            state.paymentError = action.payload || 'Failed to submit payment';
        })
            .addCase(exports.createVABankTransfer.pending, (state) => {
            state.loading = true;
            state.vaBankTransferError = null;
        })
            .addCase(exports.createVABankTransfer.fulfilled, (state, action) => {
            state.loading = false;
            state.vaBankTransferData = action.payload;
        })
            .addCase(exports.createVABankTransfer.rejected, (state, action) => {
            state.loading = false;
            state.vaBankTransferError = action.payload || 'Failed to create VA Bank Transfer';
        })
            .addCase(exports.successMidtransPaymentStatus.pending, (state) => {
            state.loading = true;
            state.paymentError = null;
        })
            .addCase(exports.successMidtransPaymentStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentDetails = action.payload;
        })
            .addCase(exports.successMidtransPaymentStatus.rejected, (state, action) => {
            state.loading = false;
            state.paymentError = action.payload || 'Failed to update payment status';
        })
            .addCase(exports.failedMidtransPaymentStatus.pending, (state) => {
            state.loading = true;
            state.paymentError = null;
        })
            .addCase(exports.failedMidtransPaymentStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentDetails = action.payload;
        })
            .addCase(exports.failedMidtransPaymentStatus.rejected, (state, action) => {
            state.loading = false;
            state.paymentError = action.payload || 'Failed to update payment status';
        });
    },
});
_a = checkoutSlice.actions, exports.setSelectedAddress = _a.setSelectedAddress, exports.setSelectedShipping = _a.setSelectedShipping;
exports.default = checkoutSlice.reducer;
