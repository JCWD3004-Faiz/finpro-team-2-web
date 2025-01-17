"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsTable = CartItemsTable;
const react_1 = require("react");
const card_1 = require("@/components/ui/card.js");
function CartItemsTable({ items }) {
    return (react_1.default.createElement(card_1.Card, null,
        react_1.default.createElement(card_1.CardHeader, null,
            react_1.default.createElement(card_1.CardTitle, null, "Cart Items")),
        react_1.default.createElement(card_1.CardContent, null,
            react_1.default.createElement("div", { className: "relative overflow-x-auto" },
                react_1.default.createElement("table", { className: "w-full text-sm text-left" },
                    react_1.default.createElement("thead", { className: "text-xs uppercase bg-muted/50" },
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { className: "px-6 py-3 font-medium" }, "Product Name"),
                            react_1.default.createElement("th", { className: "px-6 py-3 font-medium" }, "Price"),
                            react_1.default.createElement("th", { className: "px-6 py-3 font-medium" }, "Quantity"),
                            react_1.default.createElement("th", { className: "px-6 py-3 font-medium" }, "Total Price"),
                            react_1.default.createElement("th", { className: "px-6 py-3 font-medium" }, "Available Stock"))),
                    react_1.default.createElement("tbody", { className: "divide-y divide-border" }, items.map((item) => (react_1.default.createElement("tr", { key: item.cart_item_id, className: "bg-background" },
                        react_1.default.createElement("td", { className: "px-6 py-4 font-medium" }, item.product_name),
                        react_1.default.createElement("td", { className: "px-6 py-4" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(item.product_price))),
                        react_1.default.createElement("td", { className: "px-6 py-4" }, item.quantity),
                        react_1.default.createElement("td", { className: "px-6 py-4" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number((item.product_price) * item.quantity))),
                        react_1.default.createElement("td", { className: "px-6 py-4" },
                            react_1.default.createElement("span", { className: `${item.stock_available < 10 ? 'text-destructive' : ''}` }, item.stock_available)))))))))));
}
