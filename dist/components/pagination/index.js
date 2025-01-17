"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const md_1 = require("react-icons/md");
function Pagination({ currentPage, totalPages, onPageChange, }) {
    return (react_1.default.createElement("div", { className: "flex items-center justify-center mt-4" },
        react_1.default.createElement("button", { className: "px-4 py-2 bg-white border border-black text-black text-xl disabled:opacity-50 hover:bg-black hover:text-white transition-all duration-300", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1 },
            react_1.default.createElement(md_1.MdNavigateBefore, null)),
        react_1.default.createElement("span", { className: "px-4 py-2 text-gray-700" },
            "Page ",
            currentPage,
            " of ",
            totalPages),
        react_1.default.createElement("button", { className: "px-4 py-2 bg-white border border-black text-black text-xl disabled:opacity-50 hover:bg-black hover:text-white transition-all duration-300", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages },
            react_1.default.createElement(md_1.MdNavigateNext, null))));
}
exports.default = Pagination;
