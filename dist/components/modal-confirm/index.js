"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fa6_1 = require("react-icons/fa6");
function ConfirmationModal({ isOpen, onClose, onConfirm, message, }) {
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { className: "bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center" },
            react_1.default.createElement("h2", { className: "text-lg font-semibold text-indigo-600 mb-4" }, "Confirmation"),
            react_1.default.createElement(fa6_1.FaCircleExclamation, { className: "animate-bounce w-12 h-12 text-indigo-600" }),
            react_1.default.createElement("p", { className: "text-gray-700 text-center mt-4" }, message),
            react_1.default.createElement("div", { className: "flex justify-evenly mt-6 w-full" },
                react_1.default.createElement("button", { className: "bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors", onClick: onClose }, "Cancel"),
                react_1.default.createElement("button", { className: "bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors", onClick: onConfirm }, "Confirm")))));
}
exports.default = ConfirmationModal;
