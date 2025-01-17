"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const pagination_1 = require("@/components/pagination.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const select_1 = require("@/components/ui/select.js");
const getUserSlice_1 = require("@/redux/slices/getUserSlice.js");
const searchField_1 = require("@/components/searchField.js");
const fa_1 = require("react-icons/fa");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const card_1 = require("@/components/ui/card.js");
function Users() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [selectedRole, setSelectedRole] = (0, react_1.useState)("");
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { allUser, role, search, currentPage, totalPages, totalItems, loading, error, } = (0, react_redux_1.useSelector)((state) => state.getUsers);
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const toggleSidebar = () => {
        dispatch({ type: "superAdmin/toggleSidebar" });
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, getUserSlice_1.setCurrentPage)(page));
        }
    };
    const getActiveColor = (active) => {
        switch (active) {
            case true:
                return "bg-green-500";
            case false:
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, getUserSlice_1.fetchAllUsers)({
            page: currentPage,
            pageSize: 10,
            search: debouncedQuery,
            role: selectedRole === "ALL" ? "" : selectedRole,
        }));
    }, [currentPage, debouncedQuery, dispatch, selectedRole]);
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "View All Users"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-5 justify-between items-center" },
                    react_1.default.createElement("div", { className: "my-5 w-full" },
                        react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search Users...", searchTerm: searchQuery, onSearchChange: setSearchQuery }),
                        react_1.default.createElement("div", { className: "mt-4 bg-white p-4 rounded-md shadow-md" },
                            react_1.default.createElement(select_1.Select, { onValueChange: (value) => {
                                    setSelectedRole(value); // Update selected role when dropdown value changes
                                } },
                                react_1.default.createElement(select_1.SelectTrigger, { className: "w-full" },
                                    react_1.default.createElement(select_1.SelectValue, { placeholder: "Select Role" })),
                                react_1.default.createElement(select_1.SelectContent, null,
                                    react_1.default.createElement(select_1.SelectItem, { value: "ALL" }, "All Roles"),
                                    react_1.default.createElement(select_1.SelectItem, { value: "USER" }, "User"),
                                    react_1.default.createElement(select_1.SelectItem, { value: "STORE_ADMIN" }, "Store Admin"),
                                    react_1.default.createElement(select_1.SelectItem, { value: "SUPER_ADMIN" }, "Super Admin"))))),
                    react_1.default.createElement("div", { className: "w-full mt-2 sm:w-1/2 lg:w-1/4" },
                        react_1.default.createElement(card_1.Card, null,
                            react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                                react_1.default.createElement(card_1.CardTitle, { className: "text-gray-700 text-sm font-medium " }, "Total Users"),
                                react_1.default.createElement(fa_1.FaUser, { className: "h-4 w-4 text-muted-foreground" })),
                            react_1.default.createElement(card_1.CardContent, null,
                                react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalItems))))),
                react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
                    react_1.default.createElement("table", { className: "min-w-full bg-white text-xs shadow-2xl rounded-lg overflow-hidden" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                                react_1.default.createElement("th", { className: "p-4" }, "Username"),
                                react_1.default.createElement("th", { className: "p-4" }, "Email"),
                                react_1.default.createElement("th", { className: "p-4" }, "Role"),
                                react_1.default.createElement("th", { className: "p-4" }, "Referral Code"),
                                react_1.default.createElement("th", { className: "p-4" }, "Verified"),
                                react_1.default.createElement("th", { className: "p-4" }, "Created At"),
                                react_1.default.createElement("th", { className: "p-4" }, "Updated At"))),
                        react_1.default.createElement("tbody", null, allUser.map((user, index) => (react_1.default.createElement("tr", { key: index, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, user.username),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, user.email),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, user.role),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, user.referral_code),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 text-sm text-center" },
                                react_1.default.createElement("div", { className: `${getActiveColor(user.is_verified)} font-bold py-2 rounded-full text-white` }, user.is_verified ? "Yes" : "No")),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, new Date(user.created_at).toLocaleDateString("en-US")),
                            react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, new Date(user.updated_at).toLocaleDateString("en-US"))))))))),
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }))));
}
exports.default = Users;
