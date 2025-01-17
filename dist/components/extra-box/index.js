"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ai_1 = require("react-icons/ai");
const router_1 = require("next/router");
const md_1 = require("react-icons/md");
const fa6_1 = require("react-icons/fa6");
const ExtraBox = ({ isVisible, onClose }) => {
    const router = (0, router_1.useRouter)();
    const navigateTo = (path) => {
        onClose();
        router.push(path);
    };
    return (react_1.default.createElement("div", { className: `extra-box ${isVisible ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 w-[60vw] h-full bg-white text-black shadow-lg transition-transform duration-500 z-50` },
        react_1.default.createElement("div", { className: "absolute top-4 right-4 cursor-pointer", onClick: onClose },
            react_1.default.createElement(ai_1.AiOutlineClose, { size: 24 })),
        react_1.default.createElement("div", { className: "flex flex-col gap-4 mt-16 px-6" },
            react_1.default.createElement("span", { className: "cursor-pointer hover:bg-gray-200 p-3 rounded flex items-center", onClick: () => navigateTo("/") },
                react_1.default.createElement(md_1.MdHome, { className: "mr-1 text-xl" }),
                "Home"),
            react_1.default.createElement("span", { className: "cursor-pointer hover:bg-gray-200 p-3 rounded flex items-center", onClick: () => navigateTo("/products-page") },
                react_1.default.createElement(md_1.MdShoppingBag, { className: "mr-1 text-xl" }),
                "Products"),
            react_1.default.createElement("span", { className: "cursor-pointer hover:bg-gray-200 p-3 rounded flex items-center", onClick: () => navigateTo("/about-page") },
                react_1.default.createElement(fa6_1.FaCircleInfo, { className: "mr-1 text-xl" }),
                "About"))));
};
exports.default = ExtraBox;
