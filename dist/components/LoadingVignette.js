"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const cg_1 = require("react-icons/cg");
function LoadingVignette() {
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" },
        react_1.default.createElement(cg_1.CgSpinner, { className: "animate-spin text-6xl  text-indigo-500" })));
}
;
exports.default = LoadingVignette;
