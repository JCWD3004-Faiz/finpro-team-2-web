"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const io5_1 = require("react-icons/io5");
const input_1 = require("@/components/ui/input.js");
const card_1 = require("@/components/ui/card.js");
function SearchField({ searchTerm, onSearchChange, className, placeholder }) {
    return (react_1.default.createElement(card_1.Card, { className: `p-4 w-full ${className}` },
        react_1.default.createElement("div", { className: "relative w-full" },
            react_1.default.createElement(io5_1.IoSearch, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            react_1.default.createElement(input_1.Input, { placeholder: placeholder, className: "pl-8 w-full", value: searchTerm, onChange: (e) => onSearchChange(e.target.value) }))));
}
exports.default = SearchField;
