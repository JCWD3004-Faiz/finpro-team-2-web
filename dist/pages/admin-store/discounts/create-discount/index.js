"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const js_cookie_1 = require("js-cookie");
const discount_create_1 = require("@/components/discount-create.js");
function CreateDiscount() {
    const storeId = Number(js_cookie_1.default.get("storeId"));
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { loading } = (0, react_redux_1.useSelector)((state) => state.createDiscount);
    const toggleSidebar = () => {
        dispatch({ type: "storeAdmin/toggleSidebar" });
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = "/admin-store/dashboard";
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Create a new Discount"),
            react_1.default.createElement(discount_create_1.default, { store_id: storeId }))));
}
exports.default = CreateDiscount;
