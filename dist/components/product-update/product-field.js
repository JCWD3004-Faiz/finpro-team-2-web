"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductField = ProductField;
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
function ProductField({ isLoading, onUpdate, children }) {
    return (React.createElement("div", { className: "flex items-center gap-4 mb-3" },
        children,
        React.createElement(button_1.Button, { onClick: onUpdate, disabled: isLoading }, isLoading ? (React.createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" })) : ('Update'))));
}
