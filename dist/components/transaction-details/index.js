"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetails = TransactionDetails;
const lucide_react_1 = require("lucide-react");
const separator_1 = require("@/components/ui/separator.js");
const scroll_area_1 = require("@/components/ui/scroll-area.js");
function TransactionDetails({ items, payment_reference, address, city_name, shipping_price, cart_price }) {
    const total = items.reduce((sum, item) => sum + item.original_price * item.quantity, 0);
    const totalDiscount = Number(total) - Number(cart_price);
    return (React.createElement("div", null,
        payment_reference && (React.createElement("div", null,
            React.createElement("h3", { className: "text-base font-semibold" }, "Payment Reference"),
            React.createElement("div", { className: "flex items-center space-x-2" },
                React.createElement(lucide_react_1.CreditCard, { className: "h-4 w-4" }),
                React.createElement("p", null, payment_reference)))),
        React.createElement("div", { className: "space-y-6 mt-4" },
            React.createElement("div", null,
                React.createElement("h3", { className: "text-lg font-semibold " }, "Cart Items"),
                React.createElement("div", { className: "relative" },
                    React.createElement(scroll_area_1.ScrollArea, { className: "h-[200px] pr-4" },
                        React.createElement("div", { className: "space-y-1" }, items.map((item) => (React.createElement("div", { key: item.cart_item_id, className: "flex justify-between items-center py-2 border-b last:border-b-0" },
                            React.createElement("div", { className: "min-w-0 flex-1 pr-4" },
                                React.createElement("p", { className: "font-medium truncate" }, item.product_name),
                                React.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "Quantity: ",
                                    item.quantity)),
                            React.createElement("div", { className: "text-right shrink-0" },
                                React.createElement("p", { className: "font-medium" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(item.original_price))),
                                React.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "Subtotal: ",
                                    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(item.product_price)))))))))),
                React.createElement("div", { className: "flex justify-between items-center pt-2 border-t pr-4" },
                    React.createElement("p", null, "Cart Price"),
                    React.createElement("p", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(total)))),
                totalDiscount !== 0 && (React.createElement("div", { className: "flex justify-between items-center pr-4 text-green-700" },
                    React.createElement("p", null, "Discount Amount"),
                    React.createElement("p", null,
                        "- ",
                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(totalDiscount))))),
                React.createElement("div", { className: "flex justify-between items-center pt-2 font-semibold pr-4" },
                    React.createElement("p", null, "Cart Total"),
                    React.createElement("p", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(cart_price))))),
            React.createElement(separator_1.Separator, null),
            React.createElement("div", { className: "space-y-3" },
                React.createElement("div", { className: "flex justify-between items-center font-semibold pr-4" },
                    React.createElement("p", null, "Shipping Price"),
                    React.createElement("p", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(shipping_price)))),
                React.createElement("div", { className: "text-sm text-muted-foreground" },
                    React.createElement("p", { className: "font-medium" }, "Billing Address:"),
                    React.createElement("p", null,
                        address,
                        ", ",
                        city_name))))));
}
