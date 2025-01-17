"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ProductCard = ({ productName, productDescription, productImage, onClick, // Destructure the onClick prop
 }) => {
    return (react_1.default.createElement("div", { className: "product-card w-[20vw] h-[55vh] bg-white shadow-lg border border-black overflow-hidden cursor-pointer", onClick: onClick },
        react_1.default.createElement("img", { src: productImage, alt: productName, className: "w-full h-2/3 object-cover" }),
        react_1.default.createElement("div", { className: "p-4" },
            react_1.default.createElement("h3", { className: "text-xl font-bold" }, productName),
            react_1.default.createElement("p", { className: "text-sm text-gray-600" }, productDescription))));
};
exports.default = ProductCard;
