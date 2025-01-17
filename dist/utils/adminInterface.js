"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.DiscountTypeEnum = exports.VoucherType = exports.DiscountType = exports.ChangeCategory = exports.ChangeType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["STORE_ADMIN"] = "STORE_ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));
var ChangeType;
(function (ChangeType) {
    ChangeType["INCREASE"] = "INCREASE";
    ChangeType["DECREASE"] = "DECREASE";
})(ChangeType || (exports.ChangeType = ChangeType = {}));
var ChangeCategory;
(function (ChangeCategory) {
    ChangeCategory["SOLD"] = "SOLD";
    ChangeCategory["STOCK_CHANGE"] = "STOCK_CHANGE";
    ChangeCategory["OTHERS"] = "OTHERS";
})(ChangeCategory || (exports.ChangeCategory = ChangeCategory = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["NOMINAL"] = "NOMINAL";
    DiscountType["BOGO"] = "BOGO";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var VoucherType;
(function (VoucherType) {
    VoucherType["SHIPPING_DISCOUNT"] = "SHIPPING_DISCOUNT";
    VoucherType["PRODUCT_DISCOUNT"] = "PRODUCT_DISCOUNT";
    VoucherType["CART_DISCOUNT"] = "CART_DISCOUNT";
})(VoucherType || (exports.VoucherType = VoucherType = {}));
var DiscountTypeEnum;
(function (DiscountTypeEnum) {
    DiscountTypeEnum["PERCENTAGE"] = "PERCENTAGE";
    DiscountTypeEnum["NOMINAL"] = "NOMINAL";
})(DiscountTypeEnum || (exports.DiscountTypeEnum = DiscountTypeEnum = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    OrderStatus["AWAITING_CONFIRMATION"] = "AWAITING_CONFIRMATION";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["SENT"] = "SENT";
    OrderStatus["ORDER_CONFIRMED"] = "ORDER_CONFIRMED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
