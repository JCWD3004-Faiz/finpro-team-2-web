"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PageBanner = ({ title }) => {
    return (react_1.default.createElement("div", { className: "h-[40vh] mt-[11vh] w-full bg-black text-white flex items-end justify-end p-6" },
        react_1.default.createElement("h1", { className: "text-6xl font-bold" }, title)));
};
exports.default = PageBanner;
