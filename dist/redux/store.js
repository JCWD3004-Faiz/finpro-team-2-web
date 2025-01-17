"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const cartSlice_1 = require("./slices/cartSlice.js");
const storeAdminSlice_1 = require("./slices/storeAdminSlice.js");
const superAdminSlice_1 = require("./slices/superAdminSlice.js");
const manageInventorySlice_1 = require("./slices/manageInventorySlice.js");
const storeInventorySlice_1 = require("./slices/storeInventorySlice.js");
const errorSlice_1 = require("./slices/errorSlice.js");
const successSlice_1 = require("./slices/successSlice.js");
const manageProductSlice_1 = require("./slices/manageProductSlice.js");
const manageCategorySlice_1 = require("./slices/manageCategorySlice.js");
const superStockSlice_1 = require("./slices/superStockSlice.js");
const storeStockSlice_1 = require("./slices/storeStockSlice.js");
const confirmSlice_1 = require("./slices/confirmSlice.js");
const globalSlice_1 = require("./slices/globalSlice.js");
const managePaymentSlice_1 = require("./slices/managePaymentSlice.js");
const manageVoucherSlice_1 = require("./slices/manageVoucherSlice.js");
const getDiscountSlice_1 = require("./slices/getDiscountSlice.js");
const getProductsSlice_1 = require("./slices/getProductsSlice.js");
const getUserSlice_1 = require("./slices/getUserSlice.js");
const createDiscountSlice_1 = require("./slices/createDiscountSlice.js");
const updateDiscountSlice_1 = require("./slices/updateDiscountSlice.js");
const storeSalesSlice_1 = require("./slices/storeSalesSlice.js");
const superSalesSlice_1 = require("./slices/superSalesSlice.js");
const userProfileSlice_1 = require("./slices/userProfileSlice.js");
const userPaymentSlice_1 = require("./slices/userPaymentSlice.js");
const userDiscountSlice_1 = require("./slices/userDiscountSlice.js");
const landingSlice_1 = require("./slices/landingSlice.js");
const updateProfileSlice_1 = require("./slices/updateProfileSlice.js");
const checkoutSlice_1 = require("./slices/checkoutSlice.js");
const store = (0, toolkit_1.configureStore)({
    reducer: {
        cart: cartSlice_1.default,
        superAdmin: superAdminSlice_1.default,
        storeAdmin: storeAdminSlice_1.default,
        manageInventory: manageInventorySlice_1.default,
        storeInventory: storeInventorySlice_1.default,
        manageProduct: manageProductSlice_1.default,
        manageCategory: manageCategorySlice_1.default,
        managePayment: managePaymentSlice_1.default,
        manageVoucher: manageVoucherSlice_1.default,
        getDiscount: getDiscountSlice_1.default,
        getProducts: getProductsSlice_1.default,
        getUsers: getUserSlice_1.default,
        createDiscount: createDiscountSlice_1.default,
        updateDiscount: updateDiscountSlice_1.default,
        storeSales: storeSalesSlice_1.default,
        storeStocks: storeStockSlice_1.default,
        superSales: superSalesSlice_1.default,
        superStock: superStockSlice_1.default,
        error: errorSlice_1.default,
        success: successSlice_1.default,
        confirm: confirmSlice_1.default,
        global: globalSlice_1.default,
        userProfile: userProfileSlice_1.default,
        userPayment: userPaymentSlice_1.default,
        userDiscounts: userDiscountSlice_1.default,
        landing: landingSlice_1.default,
        updateProfile: updateProfileSlice_1.default,
        checkout: checkoutSlice_1.default
    },
});
exports.default = store;
