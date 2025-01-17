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
exports.default = ProductCardLatest;
const formatCurrency_1 = require("@/utils/formatCurrency.js");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("@/redux/slices/cartSlice.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const react_toastify_1 = require("react-toastify");
const js_cookie_1 = require("js-cookie");
const cartSlice_2 = require("@/redux/slices/cartSlice.js");
function ProductCardLatest({ inventoryId, productName, categoryName, productImage, userStock, price, discountedPrice, discountType, discountValue, onClick, }) {
    const discount = ((parseInt(price) - parseInt(discountedPrice)) / parseInt(price)) * 100;
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const isVerified = user === null || user === void 0 ? void 0 : user.is_verified;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { addresses } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const current_store_id = Number(js_cookie_1.default.get("current_store_id"));
    const { cartItems } = (0, react_redux_1.useSelector)((state) => state.cart);
    const handleAddToCart = () => __awaiter(this, void 0, void 0, function* () {
        if (user_id) {
            if (addresses.length === 0) {
                react_toastify_1.toast.info("You must set an address before shopping.");
                return;
            }
            if (current_store_id === 28) {
                react_toastify_1.toast.error("Invalid store. Please change your address.");
                return;
            }
            if (cartItems.length > 0 && cartItems[0].store_id !== current_store_id) {
                react_toastify_1.toast.error("You cannot purchase from a different store");
                return;
            }
            if (isVerified === false) {
                react_toastify_1.toast.error("Please verify your email");
                return;
            }
            try {
                const resultAction = yield dispatch((0, cartSlice_1.addToCart)({ user_id, inventory_id: inventoryId }));
                if (cartSlice_1.addToCart.rejected.match(resultAction)) {
                    react_toastify_1.toast.error(String(resultAction.payload));
                    return;
                }
                react_toastify_1.toast.success("Item added to cart!");
                dispatch((0, cartSlice_2.fetchCartItems)(user_id));
            }
            catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
        else {
            react_toastify_1.toast.info("Sign in to start shopping!");
        }
    });
    return (React.createElement("div", { onClick: onClick, className: "bg-white shadow-md border border-black overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer", style: { width: "280px", height: "500px" } },
        React.createElement("div", { className: "aspect-square bg-gray-100 flex items-center justify-center text-gray-500", style: { width: "100%", height: "250px" } }, productImage ? (React.createElement("img", { src: productImage, alt: productName, className: "w-full h-full object-cover", style: { objectFit: "cover" } })) : (React.createElement("span", null, "No Image Available"))),
        React.createElement("div", { className: "p-4" },
            React.createElement("div", { className: "text-sm text-gray-500 mb-1" }, categoryName),
            React.createElement("h3", { className: "font-medium text-gray-900 mb-2 line-clamp-2 h-12 overflow-hidden", style: { lineHeight: "1.5rem" } }, productName),
            React.createElement("div", { className: "flex items-baseline gap-2 mb-2 h-14" },
                discountedPrice && discountedPrice !== price ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "flex flex-col" },
                        React.createElement("span", { className: "text-lg font-bold text-gray-900" }, (0, formatCurrency_1.formatCurrency)(parseInt(discountedPrice))),
                        React.createElement("span", { className: "text-sm text-gray-500 line-through" }, (0, formatCurrency_1.formatCurrency)(parseInt(price)))))) : (React.createElement("span", { className: "text-lg font-bold text-gray-900" }, (0, formatCurrency_1.formatCurrency)(parseInt(price)))),
                discountType === "PERCENTAGE" && discountValue && (React.createElement("span", { className: "text-sm font-medium text-green-600" },
                    Math.round(discountValue),
                    "% OFF")),
                discountType === "NOMINAL" && discountValue && (React.createElement("span", { className: "text-sm font-medium text-green-600" },
                    (0, formatCurrency_1.formatCurrency)(discountValue),
                    " OFF")),
                discountType === "BOGO" && (React.createElement("span", { className: "text-sm font-medium text-green-600" }, "Buy One Get One Free"))),
            React.createElement("div", { className: "text-sm text-gray-600 mb-4" },
                "Stock: ",
                userStock,
                " units"),
            React.createElement("button", { onClick: (e) => { e.stopPropagation(); handleAddToCart(); }, className: `w-full py-2 px-4 transition-colors duration-200 ${userStock === 0
                    ? 'bg-gray-400 cursor-not-allowed' : 'bg-neutral-800 text-white hover:bg-neutral-600'}`, disabled: userStock === 0 }, userStock === 0 ? "Out of Stock" : "Add to Cart"))));
}
