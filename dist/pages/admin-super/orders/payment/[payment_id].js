"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const managePaymentSlice_1 = require("@/redux/slices/managePaymentSlice.js");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const card_1 = require("@/components/ui/card.js");
const paymentProof_1 = require("@/components/paymentProof.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const cartItemsTable_1 = require("@/components/cartItemsTable.js");
function PaymentManagement() {
    const params = (0, navigation_1.useParams)();
    const payment_id = Number(params === null || params === void 0 ? void 0 : params.payment_id);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { payment, cartItems, loading, error } = (0, react_redux_1.useSelector)((state) => state.managePayment);
    const toggleSidebar = () => {
        dispatch({ type: 'storeAdmin/toggleSidebar' });
    };
    (0, react_1.useEffect)(() => {
        if (payment_id) {
            dispatch((0, managePaymentSlice_1.fetchSuperPayment)({ payment_id }));
        }
    }, [dispatch, payment_id]);
    (0, react_1.useEffect)(() => {
        var _a;
        if ((_a = payment === null || payment === void 0 ? void 0 : payment.Order) === null || _a === void 0 ? void 0 : _a.order_id) {
            dispatch((0, managePaymentSlice_1.fetchSuperCartItems)({ order_id: payment.Order.order_id }));
        }
    }, [dispatch, payment]);
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6 relative` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Manage Payment"),
            error && react_1.default.createElement("p", { className: "text-red-600" }, error),
            !loading && payment && (react_1.default.createElement("div", null,
                react_1.default.createElement(card_1.Card, { className: "mb-6" },
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, null, "Payment Details")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" },
                            react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Transaction ID"),
                                react_1.default.createElement("p", { className: "font-medium" }, payment === null || payment === void 0 ? void 0 : payment.transaction_id)),
                            react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Payment Method"),
                                react_1.default.createElement("p", { className: "font-medium" }, payment === null || payment === void 0 ? void 0 : payment.payment_method.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))),
                            react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Amount"),
                                react_1.default.createElement("p", { className: "font-medium" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(payment === null || payment === void 0 ? void 0 : payment.total_price)))),
                            react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Date"),
                                react_1.default.createElement("p", { className: "font-medium" }, new Date(payment === null || payment === void 0 ? void 0 : payment.created_at).toLocaleDateString())),
                            react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Status"),
                                react_1.default.createElement("p", { className: `font-medium ${(payment === null || payment === void 0 ? void 0 : payment.payment_status) === 'COMPLETED' ? 'text-emerald-600' : (payment === null || payment === void 0 ? void 0 : payment.payment_status) === 'FAILED' && 'CANCELLED' ? 'text-rose-600' : 'text-orange-600'}` }, payment === null || payment === void 0 ? void 0 : payment.payment_status)),
                            (payment === null || payment === void 0 ? void 0 : payment.payment_reference) && (react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Payment Reference"),
                                react_1.default.createElement("p", { className: "font-medium" }, payment === null || payment === void 0 ? void 0 : payment.payment_reference)))),
                        react_1.default.createElement("div", { className: "space-y-3" },
                            react_1.default.createElement("h4", { className: "font-medium" }, "Proof of Payment"),
                            react_1.default.createElement(paymentProof_1.PaymentProofSection, { proof: payment })))))),
            react_1.default.createElement(cartItemsTable_1.CartItemsTable, { items: cartItems }))));
}
exports.default = PaymentManagement;
