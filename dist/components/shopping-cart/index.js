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
const react_1 = require("react");
const io5_1 = require("react-icons/io5");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button.js");
const lucide_react_2 = require("lucide-react");
const scroll_area_1 = require("@/components/ui/scroll-area.js");
const react_redux_1 = require("react-redux");
const userDiscountSlice_1 = require("@/redux/slices/userDiscountSlice.js");
const cartSlice_1 = require("@/redux/slices/cartSlice.js");
const select_1 = require("@/components/ui/select.js");
const router_1 = require("next/router");
const formatCurrency_1 = require("@/utils/formatCurrency.js");
const utils_1 = require("@/lib/utils.js");
const js_cookie_1 = require("js-cookie");
const ShoppingCart = ({ isOpen, onClose, user_id, }) => {
    var _a, _b, _c, _d;
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { cartItems, cartPrice, loading, error, cartVouchers, cartId, isDiscountApplied } = (0, react_redux_1.useSelector)((state) => state.cart);
    const [isDiscountOpen, setIsDiscountOpen] = (0, react_1.useState)(false);
    const [selectedVoucher, setSelectedVoucher] = (0, react_1.useState)(undefined);
    const [isItemClickable, setIsItemClickable] = (0, react_1.useState)(false);
    const { allUserDiscounts } = (0, react_redux_1.useSelector)((state) => state.userDiscounts);
    const current_store_id = Number(js_cookie_1.default.get("current_store_id"));
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            dispatch((0, cartSlice_1.fetchCartItems)(user_id));
            dispatch((0, cartSlice_1.fetchCartVouchers)(user_id));
        }
    }, [isOpen, user_id]);
    (0, react_1.useEffect)(() => {
        dispatch((0, userDiscountSlice_1.fetchDiscountsByStoreId)(current_store_id));
    }, [dispatch, current_store_id]);
    const discountsWithNullInventory = allUserDiscounts.filter((discount) => discount.inventory_id === null);
    const handleRemoveItem = (cart_item_id) => {
        dispatch((0, cartSlice_1.removeCartItem)({ user_id, cart_item_id }));
    };
    const handleQuantityChange = (cart_item_id, quantity) => {
        dispatch((0, cartSlice_1.changeItemQuantity)({ user_id, cart_item_id, quantity }));
    };
    const handleToggleDiscount = () => {
        setIsDiscountOpen(!isDiscountOpen);
    };
    const handleCheckout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield dispatch((0, cartSlice_1.checkoutCart)(user_id)).unwrap();
            const orderId = result.order.order_id;
            router.push(`/checkout/${orderId}`);
            onClose();
        }
        catch (error) {
            alert("Checkout failed: " + error);
        }
    });
    const handleApplyVoucher = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedVoucher)
            return;
        const voucher = JSON.parse(selectedVoucher);
        if (voucher.voucher_type === "PRODUCT_DISCOUNT") {
            setIsItemClickable(true);
        }
        else if (voucher.voucher_type === "CART_DISCOUNT") {
            yield dispatch((0, cartSlice_1.redeemCartVoucher)({
                user_id,
                user_voucher_id: voucher.user_voucher_id,
                cart_id: cartId,
            }));
            setIsDiscountOpen(false);
        }
    });
    const handleItemClick = (cart_item_id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedVoucher)
            return;
        const voucher = JSON.parse(selectedVoucher);
        if (voucher.voucher_type === "PRODUCT_DISCOUNT" && isItemClickable) {
            yield dispatch((0, cartSlice_1.redeemProductVoucher)({
                user_id,
                user_voucher_id: voucher.user_voucher_id,
                cart_item_id,
            }));
            setIsItemClickable(false);
            setIsDiscountOpen(false);
        }
    });
    const voucherTypeMap = { "PRODUCT_DISCOUNT": "Product", "CART_DISCOUNT": "Cart", "SHIPPING_DISCOUNT": "Shipping" };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isOpen && (react_1.default.createElement("div", { className: "fixed top-0 left-0 h-full w-full bg-black opacity-40 z-50", onClick: onClose })),
        react_1.default.createElement("div", { className: `fixed top-0 right-0 h-full md:w-[30vw] w-[100vw] bg-white shadow-lg z-50 p-8 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}` },
            react_1.default.createElement("div", { className: "mb-6 border-b border-black pb-4 -mx-8 px-8 text-gray-800" },
                react_1.default.createElement("div", { className: "flex items-center justify-between" },
                    react_1.default.createElement("h1", { className: "text-2xl font-bold" }, "Shopping Cart"),
                    react_1.default.createElement("button", { className: "text-black text-3xl font-bold cursor-pointer", onClick: onClose },
                        react_1.default.createElement(io5_1.IoCloseSharp, null)))),
            loading ? (react_1.default.createElement("p", { className: "text-gray-800" }, "Loading...")) : error ? (react_1.default.createElement("p", { className: "text-gray-800" }, error)) : cartItems.length === 0 ? (react_1.default.createElement("p", { className: "text-gray-800" }, "Your cart is empty.")) : (react_1.default.createElement("div", null,
                react_1.default.createElement(scroll_area_1.ScrollArea, { className: "h-[290px] pr-4" },
                    react_1.default.createElement("div", { className: "text-gray-800 w-full sm:max-w-md flex flex-col" },
                        react_1.default.createElement("div", { className: "flex-1 overflow-auto" }, cartItems
                            .filter((item) => item)
                            .map((item, index) => (react_1.default.createElement("div", { key: item.cart_item_id || index, className: (0, utils_1.cn)("flex flex-col p-4 border shadow-sm mb-4", isItemClickable &&
                                "cursor-pointer bg-accent/100 hover:bg-accent/50"), onClick: () => handleItemClick(item.cart_item_id) },
                            react_1.default.createElement("div", { key: item.cart_item_id, className: "flex justify-between items-start mb-2" },
                                react_1.default.createElement("div", { className: "flex-1" },
                                    react_1.default.createElement("h3", { className: "font-medium" }, item.product_name || ""),
                                    react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, (0, formatCurrency_1.formatCurrency)(parseInt(item.original_price)) ||
                                        "")),
                                react_1.default.createElement("div", { className: "flex items-center gap-2" },
                                    react_1.default.createElement(button_1.Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                            e.stopPropagation();
                                            handleRemoveItem(item.cart_item_id);
                                        }, className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" },
                                        react_1.default.createElement(lucide_react_1.Trash2, { className: "h-4 w-4" })))),
                            react_1.default.createElement("div", { className: "flex items-center justify-between mt-2" },
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(button_1.Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: (e) => {
                                            e.stopPropagation();
                                            if (item.quantity > 1)
                                                handleQuantityChange(item.cart_item_id, item.quantity - 1);
                                        } },
                                        react_1.default.createElement(lucide_react_1.Minus, { className: "h-4 w-4" })),
                                    react_1.default.createElement("span", { className: "w-8 text-center" }, item.quantity || ""),
                                    react_1.default.createElement(button_1.Button, { variant: "outline", size: "icon", className: "h-8 w-8", onClick: (e) => {
                                            e.stopPropagation();
                                            handleQuantityChange(item.cart_item_id, item.quantity + 1);
                                        } },
                                        react_1.default.createElement(lucide_react_1.Plus, { className: "h-4 w-4" }))),
                                react_1.default.createElement("div", null,
                                    ((item === null || item === void 0 ? void 0 : item.original_price) * (item === null || item === void 0 ? void 0 : item.quantity)) - (item === null || item === void 0 ? void 0 : item.product_price) > 0 && (react_1.default.createElement("p", { className: "font-medium text-green-700 text-end" },
                                        "- ",
                                        (0, formatCurrency_1.formatCurrency)((((item === null || item === void 0 ? void 0 : item.original_price) * (item === null || item === void 0 ? void 0 : item.quantity)) - (item === null || item === void 0 ? void 0 : item.product_price))) || "")),
                                    react_1.default.createElement("p", { className: "font-medium text-end" }, (0, formatCurrency_1.formatCurrency)(parseInt(item.product_price)) || ""))))))))),
                cartItems.length > 0 && (react_1.default.createElement("div", { className: "border-t pt-4 space-y-4 text-gray-800" },
                    react_1.default.createElement("div", { className: "space-y-2" },
                        react_1.default.createElement("div", { className: "flex justify-between font-bold" },
                            react_1.default.createElement("span", null, "Total"),
                            react_1.default.createElement("div", { className: "flex flex-col font-semibold" },
                                cartItems.reduce((acc, item) => acc + parseInt(item === null || item === void 0 ? void 0 : item.product_price), 0) - cartPrice > 0 && (react_1.default.createElement("span", { className: "text-green-700" },
                                    "- ",
                                    (0, formatCurrency_1.formatCurrency)(cartItems.reduce((acc, item) => acc + parseInt(item === null || item === void 0 ? void 0 : item.product_price), 0) - cartPrice) || "")),
                                react_1.default.createElement("span", null, (0, formatCurrency_1.formatCurrency)(cartPrice) || ""))),
                        react_1.default.createElement("div", { className: "flex text-xs" },
                            react_1.default.createElement("span", null,
                                ((_a = discountsWithNullInventory[0]) === null || _a === void 0 ? void 0 : _a.type) === "NOMINAL" && (react_1.default.createElement(react_1.default.Fragment, null,
                                    "Save",
                                    " ",
                                    (0, formatCurrency_1.formatCurrency)(Number(((_b = discountsWithNullInventory[0]) === null || _b === void 0 ? void 0 : _b.value) || 0)),
                                    " ",
                                    "OFF",
                                    discountsWithNullInventory[0].min_purchase &&
                                        ` on orders above ${discountsWithNullInventory[0].min_purchase}`,
                                    discountsWithNullInventory[0].max_discount &&
                                        ` with a maximum discount up to ${discountsWithNullInventory[0].max_discount}.`)),
                                ((_c = discountsWithNullInventory[0]) === null || _c === void 0 ? void 0 : _c.type) === "PERCENTAGE" && (react_1.default.createElement(react_1.default.Fragment, null,
                                    "Save",
                                    " ",
                                    Number(((_d = discountsWithNullInventory[0]) === null || _d === void 0 ? void 0 : _d.value) || 0),
                                    "% OFF",
                                    discountsWithNullInventory[0].min_purchase &&
                                        ` on orders above ${(0, formatCurrency_1.formatCurrency)(discountsWithNullInventory[0].min_purchase)}`,
                                    discountsWithNullInventory[0].max_discount &&
                                        ` with a maximum discount up to ${(0, formatCurrency_1.formatCurrency)(discountsWithNullInventory[0].max_discount)}.`))))))),
                react_1.default.createElement("div", { className: "space-y-2 mt-3" },
                    react_1.default.createElement(button_1.Button, { onClick: handleToggleDiscount, variant: "outline", className: "w-full text-gray-800", disabled: isDiscountApplied },
                        "Select Discount",
                        isDiscountOpen ? (react_1.default.createElement(lucide_react_2.ChevronUp, { className: "ml-2 h-4 w-4" })) : (react_1.default.createElement(lucide_react_2.ChevronDown, { className: "ml-2 h-4 w-4" }))),
                    isDiscountOpen && (react_1.default.createElement("div", { className: "space-y-2 flex items-center text-gray-800" },
                        react_1.default.createElement(select_1.Select, { value: selectedVoucher, onValueChange: (value) => setSelectedVoucher(value) },
                            react_1.default.createElement(select_1.SelectTrigger, { className: "w-full ml-4 px-4 mt-2" },
                                react_1.default.createElement(select_1.SelectValue, { placeholder: "Select voucher" })),
                            react_1.default.createElement(select_1.SelectContent, null, cartVouchers.map((voucher) => (react_1.default.createElement(select_1.SelectItem, { key: voucher.redeem_code, value: JSON.stringify(voucher) },
                                voucher.redeem_code,
                                " - ",
                                voucherTypeMap[voucher.voucher_type],
                                react_1.default.createElement("label", { className: "ml-4 text-muted-foreground" }, voucher.discount_type === "PERCENTAGE"
                                    ? `${voucher.discount_amount}% OFF`
                                    : `${(0, formatCurrency_1.formatCurrency)(voucher.discount_amount)} OFF`)))))),
                        react_1.default.createElement(button_1.Button, { className: "ml-2", onClick: handleApplyVoucher }, "Apply"))),
                    isItemClickable && !isDiscountApplied && (react_1.default.createElement("p", { className: "text-sm text-muted-foreground mt-2 text-center" }, "Please select a cart item.")),
                    react_1.default.createElement(button_1.Button, { className: "w-full mt-2", size: "lg", onClick: handleCheckout, disabled: loading }, loading ? "Processing..." : "Checkout")))))));
};
exports.default = ShoppingCart;
