"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const router_1 = require("next/router");
const fa_1 = require("react-icons/fa");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
function SuperDashboard() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, router_1.useRouter)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const toggleSidebar = () => {
        dispatch({ type: 'superAdmin/toggleSidebar' });
    };
    const handleContainerClick = (url) => {
        router.push(url);
    };
    const handleButtonClick = (url, event) => {
        event.stopPropagation();
        router.push(url);
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-center text-gray-900 mb-10 tracking-wide" }, "Super Admin Dashboard"),
            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/stores'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaStore, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Stores")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Manage your stores from here."),
                    react_1.default.createElement("button", { onClick: (e) => handleButtonClick('/admin-super/stores/create', e), className: "mt-3 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Create Store")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/products'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaShoppingBag, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Products")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Manage your products here."),
                    react_1.default.createElement("button", { onClick: (e) => handleButtonClick('/admin-super/products/create', e), className: "mt-3 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Create Product")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/admins'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaUsers, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Admins")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Manage your store admins here."),
                    react_1.default.createElement("button", { onClick: (e) => handleButtonClick('/admin-super/admins/register', e), className: "mt-3 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Register Admin")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/vouchers'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaTicketAlt, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Vouchers")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Manage your vouchers here."),
                    react_1.default.createElement("button", { onClick: (e) => handleButtonClick('/admin-super/vouchers/create', e), className: "mt-3 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Create Voucher")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/orders'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaClipboardList, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Orders")),
                    react_1.default.createElement("p", { className: "text-gray-700 mb-10 text-center" }, "Manage customer orders here.")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-super/reports'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaChartLine, { className: "text-indigo-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-indigo-600" }, "Reports")),
                    react_1.default.createElement("p", { className: "text-gray-700 mb-10 text-center" }, "View sales reports here."))))));
}
exports.default = SuperDashboard;
