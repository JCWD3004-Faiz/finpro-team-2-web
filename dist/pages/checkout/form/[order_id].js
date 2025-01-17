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
const calendar_1 = require("@/components/ui/calendar.js");
const card_1 = require("@/components/ui/card.js");
const select_1 = require("@/components/ui/select.js");
const input_1 = require("@/components/ui/input.js");
const button_1 = require("@/components/ui/button.js");
const separator_1 = require("@/components/ui/separator.js");
const date_fns_1 = require("date-fns");
const lucide_react_1 = require("lucide-react");
const popover_1 = require("@/components/ui/popover.js");
const utils_1 = require("@/lib/utils.js");
const react_redux_1 = require("react-redux");
const useAuth_1 = require("@/hooks/useAuth.js");
const checkoutSlice_1 = require("@/redux/slices/checkoutSlice.js");
const navigation_1 = require("next/navigation");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const js_cookie_1 = require("js-cookie");
const modal_error_1 = require("@/components/modal-error.js");
const modal_success_1 = require("@/components/modal-success.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
function PaymentForm() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const params = (0, navigation_1.useParams)();
    const order_id = Number(params === null || params === void 0 ? void 0 : params.order_id);
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const { orderDetails, loading, paymentError } = (0, react_redux_1.useSelector)((state) => state.checkout);
    const [date, setDate] = (0, react_1.useState)();
    const [paymentMethod, setPaymentMethod] = (0, react_1.useState)('');
    const [popImage, setPopImage] = (0, react_1.useState)(null);
    const [errorText, setErrorText] = (0, react_1.useState)('');
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    js_cookie_1.default.set('payment_order_id', order_id.toString(), { expires: 7, path: '/checkout' });
    (0, react_1.useEffect)(() => {
        if (user_id && order_id) {
            dispatch((0, checkoutSlice_1.fetchOrderDetails)({ user_id, order_id }));
        }
    }, [user_id, order_id, dispatch]);
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    const cartPrice = (orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.cart_price) ? parseFloat(String(orderDetails.cart_price)) : 0;
    const shippingPrice = (orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.shipping_price) ? parseFloat(String(orderDetails.shipping_price)) : 0;
    const total = cartPrice + shippingPrice;
    const formatStatus = (status) => {
        return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    };
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setPopImage(file);
        }
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!paymentMethod || !date || (paymentMethod !== 'MIDTRANS' && !popImage)) {
            setErrorText('Please fill all the required fields');
            return;
        }
        const dateString = date.toISOString();
        if (paymentMethod === 'MANUAL_TRANSFER') {
            dispatch((0, checkoutSlice_1.submitPayment)({ user_id, order_id, paymentMethod, date: dateString, popImage }))
                .unwrap()
                .then(() => {
                dispatch((0, successSlice_1.showSuccess)('Payment submitted successfully!'));
            })
                .catch((error) => {
                dispatch((0, errorSlice_1.showError)(error || paymentError || 'Failed to submit payment'));
            });
        }
        else if (paymentMethod === 'MIDTRANS') {
            try {
                const paymentResponse = yield dispatch((0, checkoutSlice_1.submitPayment)({
                    user_id,
                    order_id,
                    paymentMethod,
                    date: dateString,
                    popImage,
                })).unwrap();
                const transaction_id = paymentResponse.data.payment.transaction_id;
                if (!transaction_id) {
                    throw new Error('Transaction ID not found in payment response');
                }
                const vaResponse = yield dispatch((0, checkoutSlice_1.createVABankTransfer)({
                    user_id,
                    transaction_id,
                })).unwrap();
                const redirect_url = vaResponse === null || vaResponse === void 0 ? void 0 : vaResponse.redirect_url;
                if (!redirect_url) {
                    throw new Error('Redirect URL not found in VA Bank Transfer response');
                }
                alert('Redirecting to Midtrans...');
                window.location.href = redirect_url;
            }
            catch (error) {
                dispatch((0, errorSlice_1.showError)((error === null || error === void 0 ? void 0 : error.message) || 'An error occurred during payment processing'));
            }
        }
    });
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white py-8 mt-[11vh]" },
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); window.location.href = "/"; }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: "container mx-auto py-8 px-4 max-w-4xl" },
            react_1.default.createElement("h1", { className: "text-3xl font-bold mb-8 text-gray-800" }, "Payment Submission"),
            react_1.default.createElement("div", { className: "grid gap-8 md:grid-cols-2" },
                react_1.default.createElement(card_1.Card, { className: "h-fit" },
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                            react_1.default.createElement(lucide_react_1.Store, { className: "h-5 w-5" }),
                            "Order Summary")),
                    mounted && orderDetails ? (react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Store"),
                                react_1.default.createElement("span", { className: "font-medium" }, orderDetails.store_name)),
                            react_1.default.createElement("div", { className: "flex justify-between items-start" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Address"),
                                react_1.default.createElement("span", { className: "font-medium text-right max-w-[200px]" },
                                    orderDetails.address,
                                    ", ",
                                    orderDetails.city_name)),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Order Status"),
                                react_1.default.createElement("span", { className: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm" }, formatStatus(orderDetails.order_status))),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Method"),
                                react_1.default.createElement("span", { className: "font-medium flex items-center gap-2" },
                                    react_1.default.createElement(lucide_react_1.Truck, { className: "h-4 w-4" }),
                                    orderDetails.shipping_method.toUpperCase()))),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Cart Total"),
                                react_1.default.createElement("span", { className: "font-medium" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(orderDetails.cart_price)))),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Fee"),
                                react_1.default.createElement("span", { className: "font-medium" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(orderDetails.shipping_price)))),
                            react_1.default.createElement("div", { className: "flex justify-between items-center text-lg font-bold" },
                                react_1.default.createElement("span", null, "Total"),
                                react_1.default.createElement("span", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(total))))))) : (react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Store"),
                                react_1.default.createElement("div", { className: "w-[200px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-between items-start" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Address"),
                                react_1.default.createElement("div", { className: "w-[200px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-end items-center" },
                                react_1.default.createElement("div", { className: "w-[100px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Order Status"),
                                react_1.default.createElement("div", { className: "w-[100px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Method"),
                                react_1.default.createElement("div", { className: "w-[100px] h-[20px] bg-gray-200 rounded-md" }))),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Cart Total"),
                                react_1.default.createElement("div", { className: "w-[120px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-between items-center" },
                                react_1.default.createElement("span", { className: "text-muted-foreground" }, "Shipping Fee"),
                                react_1.default.createElement("div", { className: "w-[120px] h-[20px] bg-gray-200 rounded-md" })),
                            react_1.default.createElement("div", { className: "flex justify-between items-center text-lg font-bold" },
                                react_1.default.createElement("span", null, "Total"),
                                react_1.default.createElement("div", { className: "w-[120px] h-[20px] bg-gray-200 rounded-md" })))))),
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                            react_1.default.createElement(lucide_react_1.CreditCard, { className: "h-5 w-5" }),
                            "Payment Details")),
                    react_1.default.createElement(card_1.CardContent, { className: "space-y-6" },
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("label", { className: "text-sm font-medium" }, "Payment Method"),
                            react_1.default.createElement(select_1.Select, { value: paymentMethod, onValueChange: setPaymentMethod },
                                react_1.default.createElement(select_1.SelectTrigger, null,
                                    react_1.default.createElement(select_1.SelectValue, { placeholder: "Select payment method" })),
                                react_1.default.createElement(select_1.SelectContent, null,
                                    react_1.default.createElement(select_1.SelectItem, { value: "MANUAL_TRANSFER" }, "Manual Transfer"),
                                    react_1.default.createElement(select_1.SelectItem, { value: "MIDTRANS" }, "Midtrans")))),
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("label", { className: "text-sm font-medium" }, "Payment Date"),
                            react_1.default.createElement(popover_1.Popover, null,
                                react_1.default.createElement(popover_1.PopoverTrigger, { asChild: true },
                                    react_1.default.createElement(button_1.Button, { variant: "outline", className: (0, utils_1.cn)("w-full justify-start text-left font-normal", !date && "text-muted-foreground") },
                                        react_1.default.createElement(lucide_react_1.Calendar, { className: "mr-2 h-4 w-4" }),
                                        date ? (0, date_fns_1.format)(date, "PPP") : "Select date")),
                                react_1.default.createElement(popover_1.PopoverContent, { className: "w-auto p-0" },
                                    react_1.default.createElement(calendar_1.Calendar, { mode: "single", selected: date, onSelect: setDate })))),
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("label", { className: "text-sm font-medium" }, "Proof of Payment"),
                            react_1.default.createElement("div", { className: "grid w-full max-w-sm items-center gap-1.5" },
                                react_1.default.createElement(input_1.Input, { id: "payment-proof", type: "file", accept: "image/*", onChange: handleFileChange, className: "cursor-pointer", disabled: paymentMethod === 'MIDTRANS' }))),
                        react_1.default.createElement(button_1.Button, { className: "w-full", onClick: handleSubmit, disabled: loading }, loading ? 'Submitting...' : react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(lucide_react_1.Upload, { className: "mr-2 h-4 w-4" }),
                            " Submit Payment")),
                        errorText && react_1.default.createElement("div", { className: "text-red-600 text-sm" }, errorText)))))));
}
exports.default = PaymentForm;
