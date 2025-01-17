"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// components/HeroBannerCard.tsx
const react_1 = require("react");
const HeroBannerCard = ({ title, description, imagePath }) => {
    return (react_1.default.createElement("div", { className: "relative w-full h-[70vh] bg-gray-500" // Fallback grey background in case image fails
        , style: {
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } },
        react_1.default.createElement("div", { className: "absolute bottom-10 right-10 text-white text-right p-4" },
            react_1.default.createElement("h2", { className: "text-3xl md:text-4xl font-bold" }, title),
            react_1.default.createElement("p", { className: "text-lg md:text-xl" }, description))));
};
exports.default = HeroBannerCard;
