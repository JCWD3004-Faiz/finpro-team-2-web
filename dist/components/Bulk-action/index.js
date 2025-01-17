"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const button_1 = require("@/components/ui/button.js");
function BulkAction({ selectedProducts, onUpdateStock }) {
    const selectedCount = Object.values(selectedProducts).filter(Boolean).length;
    if (selectedCount === 0)
        return null;
    return (react_1.default.createElement("div", { className: "flex items-center gap-4 p-4 bg-muted rounded-lg" },
        react_1.default.createElement("span", { className: "text-sm text-muted-foreground" },
            selectedCount,
            " item",
            selectedCount !== 1 ? "s" : "",
            " selected"),
        react_1.default.createElement(button_1.Button, { size: "sm", onClick: onUpdateStock }, "Create Stock Journal")));
}
exports.default = BulkAction;
