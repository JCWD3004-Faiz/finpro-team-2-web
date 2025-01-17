"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const fa_1 = require("react-icons/fa");
const bi_1 = require("react-icons/bi");
const cg_1 = require("react-icons/cg");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const storeAdminSlice_1 = require("@/redux/slices/storeAdminSlice.js");
const js_cookie_1 = require("js-cookie");
function StoreDashboard() {
    const storeId = js_cookie_1.default.get("storeId");
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { storeName, storeLocation, loading, error, isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    (0, react_1.useEffect)(() => {
        if (storeId) {
            dispatch((0, storeAdminSlice_1.fetchStoreByStoreId)(parseInt(storeId)));
        }
    }, [dispatch, storeId]);
    const toggleSidebar = () => {
        dispatch({ type: 'storeAdmin/toggleSidebar' });
    };
    const handleContainerClick = (url) => {
        router.push(url);
    };
    const handleButtonClick = (url, event) => {
        event.stopPropagation();
        window.location.href = url;
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6 relative` }, loading ? (react_1.default.createElement("div", { className: "flex flex-col items-center justify-center space-y-4 h-[82vh]" },
            react_1.default.createElement(cg_1.CgSpinner, { className: "animate-spin text-6xl text-teal-500" }))) : error ? (react_1.default.createElement("div", { className: "text-red-600 text-center" }, error) // Display error message if any
        ) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900" },
                storeName,
                " Dashboard"),
            react_1.default.createElement("h1", { className: "text-xl font-semibold text-gray-900 mb-10" },
                "Location: ",
                storeLocation),
            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-store/inventory'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaBoxOpen, { className: "text-teal-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" }, "Inventory")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-10 text-center" }, "Manage your store inventory from here.")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-store/orders'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaClipboardList, { className: "text-teal-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" }, "Orders")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-10 text-center" }, "Manage store orders here.")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-store/discounts'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(bi_1.BiSolidDiscount, { className: "text-teal-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" }, "Discounts")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Manage your store discounts here."),
                    react_1.default.createElement("button", { onClick: (e) => handleButtonClick('/admin-store/discounts/create-discount', e), className: "mt-3 bg-white text-teal-600 font-semibold border-2 border-teal-600 py-3 px-8 rounded-full hover:bg-teal-600 hover:text-white transition-colors transform" }, "Create Discount")),
                react_1.default.createElement("div", { onClick: () => handleContainerClick('/admin-store/reports'), className: "bg-white p-8 shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-between" },
                    react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
                        react_1.default.createElement(fa_1.FaChartLine, { className: "text-teal-600 text-3xl" }),
                        react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" }, "Reports")),
                    react_1.default.createElement("p", { className: "text-gray-700 my-10 text-center" }, "View store sales reports here."))))))));
}
exports.default = StoreDashboard;
