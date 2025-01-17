"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const FruggerMarquee = () => {
    return (react_1.default.createElement("div", { className: "w-full h-[20vh] bg-black overflow-hidden flex items-center" },
        react_1.default.createElement("div", { className: "marquee text-white text-6xl font-bold whitespace-nowrap" }, Array(20).fill('Get frugal with FRUGMART').map((text, index) => (react_1.default.createElement("span", { key: index, className: "mx-4" }, text))))));
};
exports.default = FruggerMarquee;
