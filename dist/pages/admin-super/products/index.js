"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const button_1 = require("@/components/ui/button.js");
const products_admin_table_1 = require("@/components/products-admin-table.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const card_1 = require("@/components/ui/card.js");
const md_1 = require("react-icons/md");
const fa_1 = require("react-icons/fa");
const modal_confirm_1 = require("@/components/modal-confirm.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function ManageProducts() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const params = (0, navigation_1.useParams)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { loading, error, totalItems } = (0, react_redux_1.useSelector)((state) => state.manageProduct);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isConfirmationOpen, confirmationMessage, onConfirm } = (0, react_redux_1.useSelector)((state) => state.confirm);
    const toggleSidebar = () => {
        dispatch({ type: "superAdmin/toggleSidebar" });
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
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
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Products Management"),
            react_1.default.createElement("div", { className: "ml-1 mb-2 flex flex-col gap-5 lg:flex-row lg:justify-between" },
                react_1.default.createElement("div", { className: "flex flex-col justify-center gap-5" },
                    react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push("/admin-super/products/create") },
                        react_1.default.createElement(fa_1.FaShoppingBag, null),
                        "Upload a Product"),
                    react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push("/admin-super/products/category") },
                        react_1.default.createElement(md_1.MdCategory, null),
                        "Manage Categories")),
                react_1.default.createElement("div", { className: "w-full mt-2 sm:w-1/2 lg:w-1/4" },
                    react_1.default.createElement(card_1.Card, null,
                        react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                            react_1.default.createElement(card_1.CardTitle, { className: "text-gray-700 text-sm font-medium " }, "Total Products"),
                            react_1.default.createElement(fa_1.FaShoppingBag, { className: "h-4 w-4 text-muted-foreground" })),
                        react_1.default.createElement(card_1.CardContent, null,
                            react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalItems))))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(products_admin_table_1.default, null)))));
}
exports.default = ManageProducts;
