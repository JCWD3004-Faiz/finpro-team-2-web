"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const LoadingVignette_1 = require("@/components/LoadingVignette");
const StoreSidebar_1 = require("@/components/StoreSidebar");
const discount_admin_table_1 = require("@/components/discount-admin-table");
const button_1 = require("@/components/ui/button");
const md_1 = require("react-icons/md");
const modal_confirm_1 = require("@/components/modal-confirm");
const confirmSlice_1 = require("@/redux/slices/confirmSlice");
const modal_success_1 = require("@/components/modal-success");
const modal_error_1 = require("@/components/modal-error");
const successSlice_1 = require("@/redux/slices/successSlice");
const errorSlice_1 = require("@/redux/slices/errorSlice");
function DiscountManagment() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const { isSidebarOpen, storeName } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isConfirmationOpen, confirmationMessage, onConfirm } = (0, react_redux_1.useSelector)((state) => state.confirm);
    const { loading } = (0, react_redux_1.useSelector)((state) => state.getDiscount);
    const toggleSidebar = () => {
        dispatch({ type: "storeAdmin/toggleSidebar" });
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        react_1.default.createElement(modal_confirm_1.default, { isOpen: isConfirmationOpen, message: confirmationMessage || "Are you sure you want to proceed?", onConfirm: () => {
                if (onConfirm) {
                    onConfirm(); // Execute the confirmation action
                }
                dispatch((0, confirmSlice_1.hideConfirmation)()); // Close the modal after confirmation
            }, onClose: () => dispatch((0, confirmSlice_1.hideConfirmation)()) }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.reload();
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6 relative` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" },
                storeName,
                " Discounts"),
            react_1.default.createElement(button_1.Button, { size: "default", onClick: () => window.location.href = "/admin-store/discounts/create-discount" },
                react_1.default.createElement(md_1.MdDiscount, null),
                "Create a Discount"),
            react_1.default.createElement("div", { className: "mt-5" },
                react_1.default.createElement(discount_admin_table_1.default, null)))));
}
exports.default = DiscountManagment;
