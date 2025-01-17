"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const md_1 = require("react-icons/md");
function ErrorModal({ isOpen, onClose, errorMessage }) {
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { className: "bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center" },
            react_1.default.createElement("h2", { className: "text-lg font-semibold text-rose-600 mb-4" }, "An Error Occurred"),
            react_1.default.createElement(md_1.MdErrorOutline, { className: "animate-bounce w-12 h-12 text-rose-600" }),
            react_1.default.createElement("p", { className: "text-gray-700 text-center mt-4" }, errorMessage || "Something went wrong. Please try again later."),
            react_1.default.createElement("div", { className: "flex justify-end mt-6" },
                react_1.default.createElement("button", { className: "bg-rose-600 text-white px-4 py-2 rounded-md", onClick: onClose }, "Close")))));
}
exports.default = ErrorModal;
