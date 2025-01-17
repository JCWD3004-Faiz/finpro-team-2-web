"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const js_cookie_1 = require("js-cookie");
const fa_1 = require("react-icons/fa");
const bi_1 = require("react-icons/bi");
function StoreSidebar({ isSidebarOpen, toggleSidebar }) {
    function logOut() {
        js_cookie_1.default.remove("access_token");
        js_cookie_1.default.remove("storeId", { path: '/admin-store' });
        window.location.href = "/";
    }
    return (react_1.default.createElement("div", { className: "flex" },
        react_1.default.createElement("div", { className: `fixed left-0 top-0 h-full bg-gray-800 text-white w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block z-30` },
            react_1.default.createElement("div", { className: "flex justify-between items-center p-4" },
                react_1.default.createElement("h2", { className: "text-xl font-bold" }, "Store Admin Panel"),
                react_1.default.createElement("button", { className: "text-white md:hidden", onClick: toggleSidebar }, isSidebarOpen ? react_1.default.createElement(fa_1.FaTimes, null) : react_1.default.createElement(fa_1.FaBars, null))),
            react_1.default.createElement("ul", { className: "space-y-4 mt-8" },
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "/admin-store/dashboard", className: "flex items-center px-4 py-2 hover:bg-gray-700 rounded" },
                        react_1.default.createElement(fa_1.FaTh, { className: "mr-3" }),
                        "Dashboard")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "/admin-store/inventory", className: "flex items-center px-4 py-2 hover:bg-gray-700 rounded" },
                        react_1.default.createElement(fa_1.FaBoxOpen, { className: "mr-3" }),
                        "Inventory")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "/admin-store/orders", className: "flex items-center px-4 py-2 hover:bg-gray-700 rounded" },
                        react_1.default.createElement(fa_1.FaClipboardList, { className: "mr-3" }),
                        "Orders")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "/admin-store/discounts", className: "flex items-center px-4 py-2 hover:bg-gray-700 rounded" },
                        react_1.default.createElement(bi_1.BiSolidDiscount, { className: "mr-3" }),
                        "Discounts")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "/admin-store/reports", className: "flex items-center px-4 py-2 hover:bg-gray-700 rounded" },
                        react_1.default.createElement(fa_1.FaChartLine, { className: "mr-3" }),
                        "Reports")))),
        react_1.default.createElement("div", { className: "flex-1 md:ml-0" },
            react_1.default.createElement("div", { className: "bg-gray-800 text-white p-4 flex justify-between items-center shadow-md" },
                react_1.default.createElement("div", { className: "flex items-center" },
                    react_1.default.createElement("button", { className: "text-white md:hidden", onClick: toggleSidebar }, isSidebarOpen ? react_1.default.createElement(fa_1.FaTimes, null) : react_1.default.createElement(fa_1.FaBars, null)),
                    react_1.default.createElement("button", { onClick: logOut, className: "md:hidden hover:bg-gray-700 rounded ml-56 flex items-center" },
                        react_1.default.createElement(fa_1.FaSignOutAlt, { className: "mr-3" }),
                        "Log Out")),
                react_1.default.createElement("div", { className: "hidden md:flex space-x-6" },
                    react_1.default.createElement("button", { onClick: logOut, className: "hover:bg-gray-700 px-3 rounded flex items-center" },
                        react_1.default.createElement(fa_1.FaSignOutAlt, { className: "mr-3" }),
                        "Log Out"))),
            react_1.default.createElement("div", { className: "p-2" }))));
}
;
exports.default = StoreSidebar;
