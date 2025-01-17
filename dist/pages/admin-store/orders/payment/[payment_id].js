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
const navigation_1 = require("next/navigation");
const js_cookie_1 = require("js-cookie");
const react_redux_1 = require("react-redux");
const managePaymentSlice_1 = require("@/redux/slices/managePaymentSlice.js");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const card_1 = require("@/components/ui/card.js");
const button_1 = require("@/components/ui/button.js");
const paymentProof_1 = require("@/components/paymentProof.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const cartItemsTable_1 = require("@/components/cartItemsTable.js");
const ri_1 = require("react-icons/ri");
const md_1 = require("react-icons/md");
const modal_error_1 = require("@/components/modal-error.js");
const modal_success_1 = require("@/components/modal-success.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const io5_1 = require("react-icons/io5");
const paymentStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'];
function PaymentManagement() {
    const params = (0, navigation_1.useParams)();
    const payment_id = Number(params === null || params === void 0 ? void 0 : params.payment_id);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { payment, cartItems, loading, newStatus, processing, editingStatus } = (0, react_redux_1.useSelector)((state) => state.managePayment);
    const [isProcessed, setIsProcessed] = (0, react_1.useState)(false);
    const storeId = js_cookie_1.default.get("storeId");
    const store_id = Number(storeId);
    const toggleSidebar = () => {
        dispatch({ type: 'storeAdmin/toggleSidebar' });
    };
    (0, react_1.useEffect)(() => {
        if (store_id && payment_id) {
            dispatch((0, managePaymentSlice_1.fetchPayment)({ store_id, payment_id }));
        }
    }, [dispatch, store_id, payment_id]);
    (0, react_1.useEffect)(() => {
        var _a;
        if ((_a = payment === null || payment === void 0 ? void 0 : payment.Order) === null || _a === void 0 ? void 0 : _a.order_id) {
            dispatch((0, managePaymentSlice_1.fetchCartItems)({ store_id, order_id: payment.Order.order_id }));
        }
    }, [dispatch, payment]);
    const handleSaveStatus = () => {
        if (newStatus !== (payment === null || payment === void 0 ? void 0 : payment.payment_status)) {
            dispatch((0, managePaymentSlice_1.savePaymentStatus)({ store_id, payment_id, newStatus }));
            window.location.reload();
        }
    };
    const handleProcessOrder = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield dispatch((0, managePaymentSlice_1.processOrder)({ store_id, order_id: payment.Order.order_id })).unwrap();
            dispatch((0, successSlice_1.showSuccess)('Order processed successfully!'));
            setIsProcessed(true);
        }
        catch (error) {
            dispatch((0, errorSlice_1.showError)('Failed to process the order'));
        }
    });
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => dispatch((0, successSlice_1.hideSuccess)()), successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6 relative` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Manage Payment"),
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
                                !editingStatus ? (react_1.default.createElement("div", { className: "flex items-center gap-2" },
                                    react_1.default.createElement("p", { className: `font-medium ${(payment === null || payment === void 0 ? void 0 : payment.payment_status) === 'COMPLETED' ? 'text-emerald-600' : (payment === null || payment === void 0 ? void 0 : payment.payment_status) === 'FAILED' && 'CANCELLED' ? 'text-rose-600' : 'text-orange-600'}` }, payment === null || payment === void 0 ? void 0 : payment.payment_status),
                                    react_1.default.createElement("button", { className: "hover:text-gray-600", onClick: () => dispatch((0, managePaymentSlice_1.setEditingStatus)(true)) },
                                        react_1.default.createElement(ri_1.RiEdit2Fill, { className: "text-lg" })))) : (react_1.default.createElement("div", { className: "flex items-center gap-3" },
                                    react_1.default.createElement("select", { value: newStatus, onChange: (e) => dispatch((0, managePaymentSlice_1.setNewStatus)(e.target.value)), className: "border p-1 rounded-md" }, paymentStatuses.map((status) => (react_1.default.createElement("option", { key: status, value: status }, status)))),
                                    react_1.default.createElement("button", { onClick: handleSaveStatus },
                                        react_1.default.createElement(ri_1.RiSave2Fill, { className: "text-xl text-indigo-600 hover:text-indigo-500" })),
                                    react_1.default.createElement("button", { onClick: () => dispatch((0, managePaymentSlice_1.setEditingStatus)(false)) },
                                        react_1.default.createElement(md_1.MdCancel, { className: "text-xl text-rose-600 hover:text-rose-500" }))))),
                            (payment === null || payment === void 0 ? void 0 : payment.payment_reference) && (react_1.default.createElement("div", { className: "space-y-1" },
                                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Payment Reference"),
                                react_1.default.createElement("p", { className: "font-medium" }, payment === null || payment === void 0 ? void 0 : payment.payment_reference)))),
                        react_1.default.createElement("div", { className: "space-y-3" },
                            react_1.default.createElement("h4", { className: "font-medium" }, "Proof of Payment"),
                            react_1.default.createElement(paymentProof_1.PaymentProofSection, { proof: payment })))),
                react_1.default.createElement("div", { className: "flex gap-4 mb-6" }, (payment === null || payment === void 0 ? void 0 : payment.payment_status) === 'COMPLETED' && (react_1.default.createElement("div", { className: "flex items-center gap-4 p-4 bg-muted bg-white rounded-lg" },
                    react_1.default.createElement("span", { className: "text-sm text-green-600" }, "\u2713 Payment has been confirmed"),
                    react_1.default.createElement(button_1.Button, { className: "gap-2", onClick: handleProcessOrder, disabled: processing || isProcessed },
                        react_1.default.createElement(io5_1.IoSend, { className: "text-xl" }),
                        isProcessed ? 'Order Processed' : (processing ? 'Processing...' : 'Process Order'))))))),
            react_1.default.createElement(cartItemsTable_1.CartItemsTable, { items: cartItems }))));
}
exports.default = PaymentManagement;
