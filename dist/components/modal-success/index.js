"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fa6_1 = require("react-icons/fa6");
function SuccessModal({ isOpen, onClose, successMessage }) {
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { className: "bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center" },
            react_1.default.createElement("h2", { className: "text-lg font-semibold text-emerald-600 mb-4" }, "Success!"),
            react_1.default.createElement(fa6_1.FaRegCircleCheck, { className: "animate-bounce w-12 h-12 text-emerald-600" }),
            react_1.default.createElement("p", { className: "text-gray-700 text-center mt-4" }, successMessage || "The operation was completed successfully!"),
            react_1.default.createElement("div", { className: "flex justify-end mt-6" },
                react_1.default.createElement("button", { className: "bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors", onClick: onClose }, "Close")))));
}
exports.default = SuccessModal;
