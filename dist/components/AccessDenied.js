"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AccessDenied = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 0);
        return () => clearTimeout(timeout);
    }, []);
    if (isLoading) {
        return (react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-900 flex justify-center items-center z-50" }));
    }
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-900 flex justify-center items-center z-50" },
        react_1.default.createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg text-center" },
            react_1.default.createElement("h2", { className: "text-3xl font-semibold text-red-600" }, "Access Denied"),
            react_1.default.createElement("p", { className: "mt-4 text-lg text-gray-700" }, "You do not have permission to view this page."))));
};
exports.default = AccessDenied;
