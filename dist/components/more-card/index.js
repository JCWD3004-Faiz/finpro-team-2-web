"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const MoreCard = ({ onClickMore }) => {
    return (react_1.default.createElement("div", { className: "product-card w-[20vw] h-[55vh] bg-white shadow-lg border border-black overflow-hidden relative flex justify-center items-center" },
        react_1.default.createElement("span", { className: "text-2xl font-bold text-black cursor-pointer", onClick: onClickMore }, "More")));
};
exports.default = MoreCard;
