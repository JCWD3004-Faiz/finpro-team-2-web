"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button.js");
const card_1 = require("@/components/ui/card.js");
const checkoutSlice_1 = require("@/redux/slices/checkoutSlice.js");
const react_redux_1 = require("react-redux");
const useAuth_1 = require("@/hooks/useAuth.js");
const userPaymentSlice_1 = require("@/redux/slices/userPaymentSlice.js");
const js_cookie_1 = require("js-cookie");
function PaymentSuccess() {
    const router = (0, navigation_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const [countdown, setCountdown] = (0, react_1.useState)(10);
    const [shouldRedirect, setShouldRedirect] = (0, react_1.useState)(false);
    const { paymentDetails } = (0, react_redux_1.useSelector)((state) => state.checkout);
    const { details } = (0, react_redux_1.useSelector)((state) => state.userPayment);
    const order_id = Number(js_cookie_1.default.get("payment_order_id"));
    (0, react_1.useEffect)(() => {
        if (user_id && order_id) {
            dispatch((0, userPaymentSlice_1.fetchTransactionDetails)({ user_id, order_id }));
        }
    }, [user_id, order_id, dispatch]);
    (0, react_1.useEffect)(() => {
        const transaction_id = String(details === null || details === void 0 ? void 0 : details.transaction_id);
        if (user_id && transaction_id) {
            dispatch((0, checkoutSlice_1.successMidtransPaymentStatus)({ user_id, transaction_id }));
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShouldRedirect(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [details, dispatch, user_id]);
    (0, react_1.useEffect)(() => {
        if (shouldRedirect) {
            js_cookie_1.default.remove("payment_order_id", { path: '/checkout' });
            router.push('/');
        }
    }, [shouldRedirect, router]);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-background flex items-center justify-center p-4 bg-white" },
        react_1.default.createElement(card_1.Card, { className: "w-full max-w-lg p-8 space-y-6" },
            react_1.default.createElement("div", { className: "flex flex-col items-center text-center space-y-4" },
                react_1.default.createElement("div", { className: "rounded-full bg-green-100 p-3" },
                    react_1.default.createElement(lucide_react_1.CheckCircle, { className: "w-12 h-12 text-green-600" })),
                react_1.default.createElement("h1", { className: "text-2xl font-bold text-foreground" }, "Payment Successful!"),
                react_1.default.createElement("p", { className: "text-muted-foreground" }, "Thank you for your purchase. Your payment has been confirmed."),
                react_1.default.createElement("div", { className: "flex items-center space-x-2 text-muted-foreground" },
                    react_1.default.createElement(lucide_react_1.Timer, { className: "w-4 h-4" }),
                    react_1.default.createElement("span", null,
                        "Redirecting in ",
                        countdown,
                        " seconds...")),
                react_1.default.createElement("div", { className: "w-full pt-4" },
                    react_1.default.createElement(button_1.Button, { className: "w-full gap-2", onClick: () => setShouldRedirect(true) },
                        react_1.default.createElement(lucide_react_1.ShoppingBag, { className: "w-4 h-4" }),
                        "Back to Home"))),
            react_1.default.createElement("div", { className: "border-t pt-6" },
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement("h2", { className: "font-semibold" }, "Payment Details"),
                    react_1.default.createElement("div", { className: "text-sm text-muted-foreground" },
                        (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.transaction_id) && react_1.default.createElement("p", null,
                            "Transaction ID: ", paymentDetails === null || paymentDetails === void 0 ? void 0 :
                            paymentDetails.transaction_id),
                        (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.payment_reference) && react_1.default.createElement("p", null,
                            "Payment Reference: ", paymentDetails === null || paymentDetails === void 0 ? void 0 :
                            paymentDetails.payment_reference),
                        (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.payment_date) && react_1.default.createElement("p", null,
                            "Payment Date: ",
                            new Date(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.payment_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }))))))));
}
exports.default = PaymentSuccess;
