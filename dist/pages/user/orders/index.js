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
const UserSideBar_1 = require("@/components/UserSideBar.js");
const order_status_1 = require("@/components/order-status.js");
const react_redux_1 = require("react-redux");
const userPaymentSlice_1 = require("@/redux/slices/userPaymentSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const modal_error_1 = require("@/components/modal-error.js");
const modal_success_1 = require("@/components/modal-success.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const modal_confirm_1 = require("@/components/modal-confirm.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
const lu_1 = require("react-icons/lu");
const link_1 = require("next/link");
const js_cookie_1 = require("js-cookie");
function OrderTracking() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isConfirmationOpen, confirmationMessage, onConfirm } = (0, react_redux_1.useSelector)((state) => state.confirm);
    const { orders, loading, error } = (0, react_redux_1.useSelector)((state) => state.userPayment);
    (0, react_1.useEffect)(() => {
        if (user_id) {
            dispatch((0, userPaymentSlice_1.fetchOrders)(user_id));
        }
    }, [dispatch, user_id]);
    const handleCancelOrder = (order_id) => {
        dispatch((0, confirmSlice_1.showConfirmation)({
            message: 'Are you sure you want to cancel this order?',
            onConfirm: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield dispatch((0, userPaymentSlice_1.cancelOrder)({ user_id, order_id })).unwrap();
                    dispatch((0, successSlice_1.showSuccess)('Your order has been canceled.'));
                }
                catch (error) {
                    dispatch((0, errorSlice_1.showError)('Failed to cancel order. Please try again later.'));
                }
                dispatch((0, confirmSlice_1.hideConfirmation)());
            }),
        }));
    };
    const handleConfirmOrder = (order_id) => {
        dispatch((0, confirmSlice_1.showConfirmation)({
            message: 'Has your order been successfully delivered?',
            onConfirm: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield dispatch((0, userPaymentSlice_1.confirmOrder)({ user_id, order_id })).unwrap();
                    dispatch((0, successSlice_1.showSuccess)('Order confirmed! Thank you for shopping at FrugMart!'));
                }
                catch (error) {
                    dispatch((0, errorSlice_1.showError)('Failed to confirm order. Please try again later.'));
                }
                dispatch((0, confirmSlice_1.hideConfirmation)());
            }),
        }));
    };
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white mt-[11vh] p-8" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                react_1.default.createElement(UserSideBar_1.UserSidebar, null),
                loading && react_1.default.createElement(LoadingVignette_1.default, null),
                react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
                react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); window.location.reload(); }, successMessage: successMessage }),
                react_1.default.createElement(modal_confirm_1.default, { isOpen: isConfirmationOpen, onClose: () => dispatch((0, confirmSlice_1.hideConfirmation)()), onConfirm: onConfirm, message: confirmationMessage }),
                react_1.default.createElement("main", { className: "flex-1" },
                    react_1.default.createElement("div", { className: "mb-6" },
                        react_1.default.createElement("h1", { className: "text-2xl text-gray-800 font-semibold" }, "Ongoing Orders"),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, "Track your current orders")),
                    react_1.default.createElement("div", { className: "space-y-12 text-gray-800" }, loading ? (react_1.default.createElement("div", null,
                        " ",
                        react_1.default.createElement(LoadingVignette_1.default, null),
                        " ")) : error || !orders || orders.length === 0 ? (react_1.default.createElement("div", { className: "text-center py-12" },
                        react_1.default.createElement(lu_1.LuTruck, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
                        react_1.default.createElement("h3", { className: "text-lg font-medium text-gray-800" }, "No Ongoing Orders"),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, "Browse our products and order now!"))) : (orders.map((order, index) => (react_1.default.createElement("div", { key: order.order_id, className: "bg-white rounded-lg p-6 text-gray-800 md:mx-12 shadow-md border animate-in fade-in slide-in-from-bottom-4", style: { animationDelay: `${index * 100}ms` } },
                        react_1.default.createElement("div", { className: "mb-8" },
                            react_1.default.createElement(order_status_1.OrderStatus, { status: order.order_status })),
                        order.order_status === 'PENDING_PAYMENT' && (react_1.default.createElement("div", { onClick: () => window.location.href = `/checkout/${order.order_id}` },
                            react_1.default.createElement("p", { className: "text-gray-900 hover:underline block text-center mb-4" }, "Payment pending. Click here to complete your checkout"))),
                        order.payment_status === "PENDING" && order.gateway_link !== null && (react_1.default.createElement(link_1.default, { href: order.gateway_link, passHref: true },
                            react_1.default.createElement("p", { onClick: () => {
                                    js_cookie_1.default.set('payment_order_id', order.order_id.toString(), { expires: 7, path: '/checkout' });
                                } },
                                react_1.default.createElement("p", { className: "text-gray-900 hover:underline block text-center mb-4" }, "Midtrans payment in-progress. Click here to continue")))),
                        react_1.default.createElement("div", { className: "space-y-4" },
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement("div", { className: "flex justify-between text-sm mb-2" },
                                    react_1.default.createElement("span", { className: "text-muted-foreground" }, "Order Date"),
                                    react_1.default.createElement("span", { className: "font-medium" }, new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))),
                                react_1.default.createElement("div", { className: "flex justify-between font-medium pt-2" },
                                    react_1.default.createElement("span", null, "Cart Total"),
                                    react_1.default.createElement("span", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(order.cart_price))))),
                            react_1.default.createElement("div", { className: "pt-4 border-t space-y-2" },
                                react_1.default.createElement("div", { className: "flex justify-between text-sm" },
                                    react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Method"),
                                    react_1.default.createElement("span", { className: "font-mono" }, order.shipping_method.toUpperCase())),
                                react_1.default.createElement("div", { className: "flex justify-between text-sm" },
                                    react_1.default.createElement("span", { className: "text-muted-foreground" }, "Destination"),
                                    react_1.default.createElement("span", null,
                                        order.address,
                                        ", ",
                                        order.city_name)),
                                react_1.default.createElement("div", { className: "flex justify-between font-medium pt-2" },
                                    react_1.default.createElement("span", null, "Shipping Cost"),
                                    react_1.default.createElement("span", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(order.shipping_price))))),
                            order.order_status === 'PENDING_PAYMENT' && (react_1.default.createElement("button", { onClick: () => handleCancelOrder(order.order_id), className: "mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-red-600" }, "Cancel Order")),
                            order.order_status === 'SENT' && (react_1.default.createElement("button", { onClick: () => handleConfirmOrder(order.order_id), className: "mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-green-600" }, "Confirm Order")))))))))))));
}
exports.default = OrderTracking;
