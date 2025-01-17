"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const Footer = () => {
    return (react_1.default.createElement("footer", { className: "bg-black text-white h-auto flex flex-col" },
        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] flex-grow" },
            react_1.default.createElement("div", { className: "flex flex-col mx-12 my-8" },
                react_1.default.createElement("div", { className: "relative mb-4" },
                    react_1.default.createElement("input", { type: "text", placeholder: "Search bar of frugality...", className: "w-full md:w-[35vw] p-2 bg-black border-b border-white text-white pl-10" }),
                    react_1.default.createElement(fa_1.FaSearch, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xl cursor-pointer hover:text-gray-400" })),
                react_1.default.createElement("p", { className: "font-bold text-4xl" }, "Get Frugal With FRUGMART."),
                react_1.default.createElement("div", { className: "flex items-center space-x-8 mt-4" },
                    react_1.default.createElement(fa_1.FaYoutube, { className: "text-4xl hover:text-red-600 cursor-pointer" }),
                    react_1.default.createElement(fa_1.FaInstagram, { className: "text-4xl hover:text-pink-500 cursor-pointer" }),
                    react_1.default.createElement(fa_1.FaTwitter, { className: "text-4xl hover:text-blue-400 cursor-pointer" }),
                    react_1.default.createElement(fa_1.FaFacebookF, { className: "text-4xl hover:text-blue-600 cursor-pointer" }))),
            react_1.default.createElement("div", { className: "flex flex-col mx-12 my-8" },
                react_1.default.createElement("p", { className: "font-bold text-2xl" }, "Categories"),
                react_1.default.createElement("ul", { className: "text-sm mt-2" },
                    react_1.default.createElement("li", null, "Fruits and Vegetables"),
                    react_1.default.createElement("li", null, "Poultry"),
                    react_1.default.createElement("li", null, "Dairy"),
                    react_1.default.createElement("li", null, "Baked Goods"))),
            react_1.default.createElement("div", { className: "flex flex-col mx-12 my-8" },
                react_1.default.createElement("p", { className: "font-bold text-2xl" }, "Policies"),
                react_1.default.createElement("ul", { className: "text-sm mt-2" },
                    react_1.default.createElement("li", null, "Privacy Policy"),
                    react_1.default.createElement("li", null, "Cookie Policy")))),
        react_1.default.createElement("div", { className: "border-t border-white text-right py-4 mx-12 my-4" },
            react_1.default.createElement("p", { className: "text-sm" },
                "Copyright \u00A9 ",
                new Date().getFullYear(),
                " FrugMart Indonesia"))));
};
exports.default = Footer;
