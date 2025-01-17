"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCard = TransactionCard;
const card_1 = require("@/components/ui/card.js");
const badge_1 = require("@/components/ui/badge.js");
const separator_1 = require("@/components/ui/separator.js");
const dialog_1 = require("@/components/ui/dialog.js");
const lucide_react_1 = require("lucide-react");
const button_1 = require("../ui/button.js");
const transaction_details_1 = require("../transaction-details.js");
const react_redux_1 = require("react-redux");
const userPaymentSlice_1 = require("@/redux/slices/userPaymentSlice.js");
const userPaymentSlice_2 = require("@/redux/slices/userPaymentSlice.js");
const statusColors = {
    ORDER_CONFIRMED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
};
function TransactionCard({ transaction }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { details } = (0, react_redux_1.useSelector)((state) => state.userPayment);
    const handleViewDetailsClick = () => {
        if (transaction.order_id) {
            dispatch((0, userPaymentSlice_1.fetchTransactionDetails)({
                user_id: transaction.user_id,
                order_id: transaction.order_id
            }));
        }
    };
    const handleDialogClose = () => {
        dispatch((0, userPaymentSlice_2.clearTransactionDetails)());
    };
    const formatStatus = (status) => { return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); };
    const frontPrice = Number(transaction.cart_price) + Number(transaction.shipping_price);
    return (React.createElement(card_1.Card, { className: "overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm border" },
        React.createElement("div", null,
            React.createElement("div", { className: "flex justify-between" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm px-6 pt-4 text-gray-500 mb-1" }, "Transaction ID"),
                    React.createElement("p", { className: "font-medium px-6 text-lg" }, transaction.transaction_id || "-"),
                    React.createElement("div", { className: "px-6 pb-4" },
                        React.createElement(badge_1.Badge, { variant: "secondary", className: `${statusColors[transaction.order_status]} text-sm px-3 py-1 border mt-2` }, formatStatus(transaction.order_status).toUpperCase()))),
                React.createElement("div", { className: "flex items-center md:items-start justify-end pr-6 pt-6" },
                    React.createElement(dialog_1.Dialog, { onOpenChange: (open) => !open && handleDialogClose() },
                        React.createElement(dialog_1.DialogTrigger, { asChild: true },
                            React.createElement(button_1.Button, { className: "", onClick: handleViewDetailsClick },
                                React.createElement(lucide_react_1.Eye, { className: "h-4 w-4 mr-2" }),
                                "View Details")),
                        React.createElement(dialog_1.DialogContent, { className: "w-full max-h-[90vh] overflow-auto bg-white text-gray-800" },
                            details && (React.createElement(transaction_details_1.TransactionDetails, { items: details.items, payment_reference: details.payment_reference, address: details.address, city_name: details.city_name, shipping_price: details.shipping_price, cart_price: details.cart_price })),
                            !details && React.createElement("p", null, "Loading...")))))),
        React.createElement(separator_1.Separator, null),
        React.createElement("div", { className: "p-4 grid gap-2" },
            React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-2 rounded-lg bg-gray-50" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { className: "p-2.5" },
                        React.createElement(lucide_react_1.Store, { className: "h-6 w-6 text-primary" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-gray-600" }, "Store"),
                        React.createElement("p", { className: "text-lg font-semibold" }, transaction.store_name || "-"))),
                React.createElement("div", { className: "flex items-center mr-4" },
                    React.createElement("div", { className: "p-2.5" },
                        React.createElement(lucide_react_1.Receipt, { className: "h-6 w-6 text-primary" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-gray-600" }, "Total Price"),
                        React.createElement("p", { className: "text-lg font-semibold" }, transaction.total_price !== undefined ? `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(transaction.total_price))}`
                            : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(frontPrice)))))),
            React.createElement("div", { className: "grid sm:grid-cols-2 gap-4" },
                React.createElement("div", { className: "flex items-start p-3 rounded-md bg-gray-50" },
                    React.createElement("div", { className: "p-2 rounded-full mt-1" },
                        React.createElement(lucide_react_1.Truck, { className: "h-5 w-5 text-primary" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-gray-600" }, "Shipping Method"),
                        React.createElement("p", { className: "text-base" }, transaction.shipping_method.toUpperCase() || "-"))),
                React.createElement("div", { className: "flex items-start p-3 rounded-md bg-gray-50" },
                    React.createElement("div", { className: "p-2 rounded-full mt-1" },
                        React.createElement(lucide_react_1.CreditCard, { className: "h-5 w-5 text-primary" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-gray-600" }, "Payment Method"),
                        React.createElement("p", { className: "text-base" }, transaction.payment_method ? formatStatus(transaction.payment_method) : "-")))),
            React.createElement("div", { className: "flex items-center p-3 rounded-md bg-gray-50" },
                React.createElement("div", { className: "p-2" },
                    React.createElement(lucide_react_1.Calendar, { className: "h-6 w-6 text-primary" })),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm font-medium text-gray-600" }, transaction.transaction_id ? "Transaction Date" : "Order Date"),
                    React.createElement("p", { className: "text-base" }, transaction.payment_date
                        ? new Date(transaction.payment_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "-"))))));
}
