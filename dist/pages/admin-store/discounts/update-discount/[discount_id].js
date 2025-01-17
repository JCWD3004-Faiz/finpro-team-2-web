"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const discount_update_1 = require("@/components/discount-update.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function UpdateDiscount() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const params = (0, navigation_1.useParams)();
    const discount_id = Number(params === null || params === void 0 ? void 0 : params.discount_id);
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { loading, error } = (0, react_redux_1.useSelector)((state) => state.updateDiscount // Adjust if the slice is named differently
    );
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
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Discount Details"),
            react_1.default.createElement(discount_update_1.default, { discount_id: discount_id }))));
}
exports.default = UpdateDiscount;
