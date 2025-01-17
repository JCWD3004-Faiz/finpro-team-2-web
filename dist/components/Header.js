"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = require("next/head");
const react_1 = require("react");
function Header({ children }) {
    return (react_1.default.createElement(head_1.default, null, children));
}
exports.default = Header;
