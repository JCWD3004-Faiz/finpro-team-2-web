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
exports.setDiscountApplied = exports.redeemCartVoucher = exports.redeemProductVoucher = exports.addToCart = exports.checkoutCart = exports.fetchCartVouchers = exports.changeItemQuantity = exports.removeCartItem = exports.fetchCartItems = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    cartItems: [],
    cartPrice: 0,
    loading: false,
    error: null,
    cartVouchers: [],
    orderId: 0,
    cartId: 0,
    isDiscountApplied: false, // Initialize it as false
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchCartItems = (0, toolkit_1.createAsyncThunk)("cart/fetchCartItems", (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/cart/items/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.cart_data;
    }
    catch (err) {
        return rejectWithValue("Failed to retrieve cart items");
    }
}));
exports.removeCartItem = (0, toolkit_1.createAsyncThunk)("cart/removeCartItem", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, cart_item_id }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.delete(`/api/cart/${user_id}/${cart_item_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data;
    }
    catch (err) {
        return rejectWithValue("Failed to remove cart item");
    }
}));
exports.changeItemQuantity = (0, toolkit_1.createAsyncThunk)("cart/changeItemQuantity", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, cart_item_id, quantity }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post(`/api/cart/quantity`, {
            user_id,
            cart_item_id,
            quantity,
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data;
    }
    catch (err) {
        return rejectWithValue("Failed to update item quantity");
    }
}));
exports.fetchCartVouchers = (0, toolkit_1.createAsyncThunk)('cart/fetchCartVouchers', (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/cart/cart-vouchers/${user_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data.vouchers;
    }
    catch (error) {
        return rejectWithValue('Failed to fetch cart vouchers.');
    }
}));
exports.checkoutCart = (0, toolkit_1.createAsyncThunk)("cart/checkoutCart", (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.post(`/api/cart/checkout/${user_id}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data.data;
    }
    catch (err) {
        return rejectWithValue("Failed to checkout cart");
    }
}));
exports.addToCart = (0, toolkit_1.createAsyncThunk)("cart/addToCart", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, inventory_id }, { rejectWithValue }) {
    try {
        const response = yield axios_1.default.post('/api/cart/add', {
            user_id,
            inventory_id
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err) && err.response) {
            return rejectWithValue("This product is already in the cart");
        }
        else {
            return rejectWithValue("An unexpected error occurred");
        }
    }
}));
exports.redeemProductVoucher = (0, toolkit_1.createAsyncThunk)("cart/redeemProductVoucher", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, user_voucher_id, cart_item_id }, { rejectWithValue }) {
    var _c, _d, _e;
    try {
        const response = yield interceptor_1.default.post(`/api/cart/redeem-product/`, {
            user_id,
            user_voucher_id,
            cart_item_id,
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if ((_e = (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.cartItem) === null || _e === void 0 ? void 0 : _e.error) {
            return rejectWithValue(response.data.data.cartItem.error);
        }
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue("Failed to apply product voucher discount");
    }
}));
exports.redeemCartVoucher = (0, toolkit_1.createAsyncThunk)("cart/redeemCartVoucher", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ user_id, user_voucher_id, cart_id }, { rejectWithValue }) {
    var _c, _d;
    try {
        const response = yield interceptor_1.default.post(`/api/cart/redeem-cart/`, {
            user_id,
            user_voucher_id,
            cart_id,
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if ((_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) {
            return rejectWithValue(response.data.data.error);
        }
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue("Failed to apply cart voucher discount");
    }
}));
const cartSlice = (0, toolkit_1.createSlice)({
    name: "cart",
    initialState,
    reducers: {
        setDiscountApplied: (state, action) => {
            state.isDiscountApplied = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchCartItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload.cart_items;
            state.cartId = action.payload.cart_id;
            state.cartPrice = action.payload.cart_price;
            state.loading = false;
        })
            .addCase(exports.fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.removeCartItem.pending, (state) => {
            state.loading = false;
        })
            .addCase(exports.removeCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = state.cartItems.filter((item) => item.cart_item_id !== action.payload.cartItem.cart_item_id);
            state.cartPrice = action.payload.cartPrice.cart_price;
        })
            .addCase(exports.removeCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.changeItemQuantity.pending, (state) => {
            state.loading = false;
        })
            .addCase(exports.changeItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            const updatedItem = action.payload.cartItem;
            state.cartItems = state.cartItems.map(item => item.cart_item_id === updatedItem.cart_item_id
                ? Object.assign(Object.assign({}, item), { quantity: updatedItem.quantity, product_price: updatedItem.product_price }) : item);
            state.cartPrice = action.payload.cartPrice.cart_price;
        })
            .addCase(exports.changeItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchCartVouchers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(exports.fetchCartVouchers.fulfilled, (state, action) => {
            state.loading = false;
            state.cartVouchers = action.payload;
        })
            .addCase(exports.fetchCartVouchers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Unknown error';
        })
            .addCase(exports.checkoutCart.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.checkoutCart.fulfilled, (state, action) => {
            state.loading = false;
            state.orderId = action.payload.order.order_id;
            state.isDiscountApplied = false;
        })
            .addCase(exports.checkoutCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = [...state.cartItems, action.payload.cart_item];
            state.cartPrice = action.payload.cart_price;
            state.cartVouchers = action.payload.cart_vouchers || state.cartVouchers;
        })
            .addCase(exports.addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.redeemProductVoucher.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.redeemProductVoucher.fulfilled, (state, action) => {
            state.loading = false;
            const updatedItem = action.payload.cartItem;
            state.cartItems = state.cartItems.map(item => item.cart_item_id === updatedItem.cart_item_id
                ? Object.assign(Object.assign({}, item), { quantity: updatedItem.quantity, product_price: updatedItem.product_price }) : item);
            state.cartPrice = action.payload.cartPrice.cart_price;
            state.isDiscountApplied = true;
        })
            .addCase(exports.redeemProductVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.redeemCartVoucher.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.redeemCartVoucher.fulfilled, (state, action) => {
            state.loading = false;
            state.cartPrice = action.payload.newCartPrice;
            state.isDiscountApplied = true;
        })
            .addCase(exports.redeemCartVoucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
exports.setDiscountApplied = cartSlice.actions.setDiscountApplied;
exports.default = cartSlice.reducer;
