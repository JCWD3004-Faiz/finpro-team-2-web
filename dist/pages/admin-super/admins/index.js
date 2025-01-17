"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const router_1 = require("next/router");
const md_1 = require("react-icons/md");
const superAdminSlice_1 = require("@/redux/slices/superAdminSlice.js");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const superAdminSlice_2 = require("@/redux/slices/superAdminSlice.js");
const fa_1 = require("react-icons/fa");
const manageInventorySlice_1 = require("@/redux/slices/manageInventorySlice.js");
const fa_2 = require("react-icons/fa");
const searchField_1 = require("@/components/searchField.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const pagination_1 = require("@/components/pagination.js");
const button_1 = require("@/components/ui/button.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
function ManageAdmins() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, router_1.useRouter)();
    const tableRef = (0, react_1.useRef)(null);
    const [isTableRendered, setIsTableRendered] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    (0, react_1.useEffect)(() => {
        if (tableRef.current) {
            setIsTableRendered(true);
        }
    }, []);
    const { totalPages, sortFieldAdmin, storeAdmins, loading, isSidebarOpen, editId, suggestionsPosition, editAdminData, storeSuggestions, allStores } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { sortOrder, currentPage } = (0, react_redux_1.useSelector)((state) => state.manageInventory);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    (0, react_1.useEffect)(() => {
        dispatch((0, superAdminSlice_1.fetchStoreAdmins)({ page: currentPage, sortFieldAdmin, sortOrder, search: debouncedQuery }));
        dispatch((0, superAdminSlice_1.fetchAllStores)({}));
    }, [dispatch, currentPage, sortFieldAdmin, sortOrder, debouncedQuery]);
    const handlePageChange = (page) => { if (page > 0 && page <= totalPages) {
        dispatch((0, manageInventorySlice_1.setCurrentPage)(page));
    } };
    const handleSort = (field) => {
        const updatedSortOrder = sortFieldAdmin === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortFieldAdmin === field) {
            dispatch((0, manageInventorySlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, superAdminSlice_2.setSortFieldAdmin)(field));
            dispatch((0, manageInventorySlice_1.setSortOrder)("asc"));
        }
        dispatch((0, superAdminSlice_1.fetchStoreAdmins)({ page: 1, sortFieldAdmin: field, sortOrder: updatedSortOrder }));
    };
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                dispatch((0, superAdminSlice_2.resetEditState)());
                dispatch((0, superAdminSlice_2.setStoreSuggestions)([]));
            }
        };
        if (isTableRendered) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [dispatch, isTableRendered]);
    const toggleSidebar = () => {
        dispatch({ type: 'superAdmin/toggleSidebar' });
    };
    const handleEditClick = (admin) => {
        if (editId === admin.user_id) {
            if (isValidStoreName(editAdminData.storeName)) {
                const assignedStoreId = editAdminData.storeId !== 0 ? editAdminData.storeId : admin.store_id;
                const assignPayload = { user_id: admin.user_id, store_id: assignedStoreId };
                dispatch((0, superAdminSlice_1.assignStoreAdmin)(assignPayload));
                dispatch((0, superAdminSlice_2.resetEditState)());
                dispatch((0, successSlice_1.showSuccess)("Store admin successfully assigned"));
            }
            else {
                dispatch((0, errorSlice_1.showError)('Please select a valid store.'));
            }
        }
        else {
            dispatch((0, superAdminSlice_2.setEditId)(admin.user_id));
            dispatch((0, superAdminSlice_2.setEditAdminData)({ storeName: admin.store_name, storeId: admin.store_id }));
        }
    };
    const handleDeleteAdmin = (user_id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            dispatch((0, superAdminSlice_1.deleteStoreAdmin)(user_id));
        }
    };
    const handleChange = (e, field) => {
        const value = e.target.value;
        dispatch((0, superAdminSlice_2.setEditAdminData)(Object.assign(Object.assign({}, editAdminData), { [field]: value })));
        if (field === 'storeName') {
            const filteredSuggestions = getStoreSuggestions(value);
            dispatch((0, superAdminSlice_2.setStoreSuggestions)(filteredSuggestions));
            const rect = e.target.getBoundingClientRect();
            dispatch((0, superAdminSlice_2.setSuggestionsPosition)({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX }));
        }
    };
    const handleSuggestionClick = (suggestion) => {
        dispatch((0, superAdminSlice_2.setEditAdminData)(Object.assign(Object.assign({}, editAdminData), { storeName: suggestion.store_name, storeId: suggestion.store_id })));
        dispatch((0, superAdminSlice_2.setStoreSuggestions)([]));
    };
    const getStoreSuggestions = (input) => {
        return allStores.filter((store) => store.store_name.toLowerCase().includes(input.toLowerCase()));
    };
    const isValidStoreName = (storeName) => {
        return allStores.some((store) => store.store_name.toLowerCase() === storeName.toLowerCase());
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); window.location.reload(); }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Manage Store Admins"),
            react_1.default.createElement("div", { className: "ml-1 mb-2" },
                react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push({ pathname: '/admin-super/admins/users' }) }, "View All Users")),
            react_1.default.createElement("div", { className: "ml-1 mb-2" },
                react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push({ pathname: '/admin-super/admins/register' }) },
                    react_1.default.createElement(fa_1.FaUserPlus, null),
                    "Register Admin")),
            react_1.default.createElement("div", { className: "my-5" },
                react_1.default.createElement(searchField_1.default, { searchTerm: searchQuery, onSearchChange: setSearchQuery, className: '', placeholder: "Search admins..." })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "overflow-x-auto" },
                    react_1.default.createElement("table", { ref: tableRef, className: "min-w-full bg-white text-sm shadow-2xl rounded-lg overflow-hidden" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", { className: "bg-gray-800 text-white uppercase text-xs" },
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Username"),
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Email"),
                                react_1.default.createElement("th", { onClick: () => handleSort("store"), className: "p-4 cursor-pointer" },
                                    react_1.default.createElement("div", { className: 'flex items-center' },
                                        "Assigned Store",
                                        react_1.default.createElement(fa_2.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }),
                                        sortFieldAdmin === "store")),
                                react_1.default.createElement("th", { onClick: () => handleSort("created_at"), className: "p-4 cursor-pointer" },
                                    react_1.default.createElement("div", { className: 'flex items-center' },
                                        "Register Date",
                                        react_1.default.createElement(fa_2.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }),
                                        sortFieldAdmin === "created_at")),
                                react_1.default.createElement("th", { className: "py-4 px-6 text-center" }, "Actions"))),
                        react_1.default.createElement("tbody", null, storeAdmins.map((admin, key) => (react_1.default.createElement("tr", { key: key, className: `${key % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                            react_1.default.createElement("td", { className: "p-4" }, admin.username),
                            react_1.default.createElement("td", { className: "p-4" }, admin.email),
                            react_1.default.createElement("td", { className: "p-4" }, editId === admin.user_id ? (react_1.default.createElement("div", { className: "relative" },
                                react_1.default.createElement("input", { type: "text", value: editAdminData.storeName, onChange: (e) => handleChange(e, 'storeName'), className: "border-b-2 border-indigo-600 focus:outline-none" }))) : (admin.store_name)),
                            react_1.default.createElement("td", { className: "p-4" }, new Date(admin.created_at).toLocaleDateString()),
                            react_1.default.createElement("td", { className: "py-3 px-2 text-center whitespace-nowrap" },
                                react_1.default.createElement("button", { title: "Assign store admin", onClick: (e) => { e.stopPropagation(); handleEditClick(admin); }, className: "mx-2 py-2 px-2 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, editId === admin.user_id ? (react_1.default.createElement(md_1.MdSaveAs, { className: "text-2xl" })) : (react_1.default.createElement(fa_1.FaUserEdit, { className: "text-2xl" }))),
                                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); handleDeleteAdmin(admin.user_id); }, className: "mx-2 py-2 px-2 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors transform", title: "Delete store admin" },
                                    react_1.default.createElement(md_1.MdDelete, { className: "text-2xl" }))))))),
                        storeSuggestions.length > 0 && (react_1.default.createElement("div", { className: "absolute z-50 bg-white border border-gray-300 shadow-md rounded-lg max-h-40 overflow-auto", style: { top: `${suggestionsPosition.top}px`, left: `${suggestionsPosition.left}px`, width: '200px', } }, storeSuggestions.map((suggestion, index) => (react_1.default.createElement("div", { key: index, onClick: () => handleSuggestionClick(suggestion), className: `px-4 py-2 cursor-pointer hover:bg-indigo-100 ${suggestion.store_admin === '-' ? 'bg-gray-100' : ''}` }, suggestion.store_name))))))),
                react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })))));
}
exports.default = ManageAdmins;
