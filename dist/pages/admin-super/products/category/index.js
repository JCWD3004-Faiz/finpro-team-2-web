"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const category_admin_table_1 = require("@/components/category-admin-table.js");
const category_create_1 = require("@/components/category-create.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const modal_confirm_1 = require("@/components/modal-confirm.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
function ManageCategories() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const params = (0, navigation_1.useParams)();
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { loading, error, totalItems } = (0, react_redux_1.useSelector)((state) => state.manageCategory);
    const { isConfirmationOpen, confirmationMessage, onConfirm } = (0, react_redux_1.useSelector)((state) => state.confirm);
    const toggleSidebar = () => {
        dispatch({ type: "superAdmin/toggleSidebar" });
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.reload();
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_confirm_1.default, { isOpen: isConfirmationOpen, message: confirmationMessage || "Are you sure you want to proceed?", onConfirm: () => {
                if (onConfirm) {
                    onConfirm(); // Execute the confirmation action
                }
                dispatch((0, confirmSlice_1.hideConfirmation)()); // Close the modal after confirmation
            }, onClose: () => dispatch((0, confirmSlice_1.hideConfirmation)()) }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Category Management"),
            react_1.default.createElement("div", { className: "grid grid-cols-1 gap-5" },
                react_1.default.createElement(category_create_1.default, null),
                react_1.default.createElement(category_admin_table_1.default, null)))));
}
exports.default = ManageCategories;
