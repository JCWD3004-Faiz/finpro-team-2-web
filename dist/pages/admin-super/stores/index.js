"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const md_1 = require("react-icons/md");
const superAdminSlice_1 = require("@/redux/slices/superAdminSlice.js");
const globalSlice_1 = require("@/redux/slices/globalSlice.js");
const pagination_1 = require("@/components/pagination.js");
const superAdminSlice_2 = require("@/redux/slices/superAdminSlice.js");
const manageInventorySlice_1 = require("@/redux/slices/manageInventorySlice.js");
const fa_1 = require("react-icons/fa");
const searchField_1 = require("@/components/searchField.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const button_1 = require("@/components/ui/button.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
function ManageStores() {
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const tableRef = (0, react_1.useRef)(null);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { currentPage, totalPages, sortField, isSidebarOpen, loading, allStores, editId, editStoreData, locationSuggestions, suggestionsPosition } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { sortOrder } = (0, react_redux_1.useSelector)((state) => state.manageInventory);
    const { cities } = (0, react_redux_1.useSelector)((state) => state.global);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    (0, react_1.useEffect)(() => {
        dispatch((0, superAdminSlice_1.fetchAllStores)({ page: currentPage, sortField, sortOrder, search: debouncedQuery }));
        dispatch((0, globalSlice_1.fetchCities)());
    }, [dispatch, currentPage, sortField, sortOrder, debouncedQuery]);
    const handlePageChange = (page) => { if (page > 0 && page <= totalPages) {
        dispatch((0, manageInventorySlice_1.setCurrentPage)(page));
    } };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, manageInventorySlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, superAdminSlice_2.setSortField)(field));
            dispatch((0, manageInventorySlice_1.setSortOrder)("asc"));
        }
        dispatch((0, superAdminSlice_1.fetchAllStores)({ page: 1, sortField: field, sortOrder: updatedSortOrder }));
    };
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                dispatch((0, superAdminSlice_2.resetEditState)());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [dispatch]);
    const toggleSidebar = () => { dispatch({ type: 'superAdmin/toggleSidebar' }); };
    const handleRowClick = (url) => { if (editId === null) {
        router.push(url);
    } };
    const handleEditClick = (store) => {
        if (editId === store.store_id) {
            if (isValidLocation(editStoreData.locationName)) {
                const updatedCityId = editStoreData.cityId !== 0 ? editStoreData.cityId : store.city_id;
                const updatePayload = { store_id: store.store_id, store_name: editStoreData.storeName,
                    store_location: editStoreData.locationName, city_id: updatedCityId };
                dispatch((0, superAdminSlice_1.updateStore)(updatePayload));
                dispatch((0, superAdminSlice_2.resetEditState)());
                dispatch((0, successSlice_1.showSuccess)("Store successfully edited"));
            }
            else {
                alert('Please select a valid location.');
            }
        }
        else {
            dispatch((0, superAdminSlice_2.setEditId)(store.store_id));
            dispatch((0, superAdminSlice_2.setEditStoreData)({ storeName: store.store_name, locationName: store.store_location, cityId: store.city_id }));
        }
    };
    const handleDeleteStore = (store_id) => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            dispatch((0, superAdminSlice_1.deleteStore)(store_id));
        }
    };
    const handleChange = (e, field) => {
        const value = e.target.value;
        dispatch((0, superAdminSlice_2.setEditStoreData)(Object.assign(Object.assign({}, editStoreData), { [field]: value })));
        if (field === 'locationName') {
            const filteredSuggestions = getLocationSuggestions(value);
            dispatch((0, superAdminSlice_2.setLocationSuggestions)(filteredSuggestions));
            const rect = e.target.getBoundingClientRect();
            dispatch((0, superAdminSlice_2.setSuggestionsPosition)({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX }));
        }
    };
    const handleSuggestionClick = (suggestion) => {
        dispatch((0, superAdminSlice_2.setEditStoreData)(Object.assign(Object.assign({}, editStoreData), { locationName: suggestion.city_name, cityId: Number(suggestion.city_id) })));
        dispatch((0, superAdminSlice_2.setLocationSuggestions)([]));
    };
    const getLocationSuggestions = (input) => {
        return cities.filter((city) => city.city_name.toLowerCase().includes(input.toLowerCase()));
    };
    const isValidLocation = (location) => {
        return cities.some((city) => city.city_name.toLowerCase() === location.toLowerCase());
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); window.location.reload(); }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Store Management"),
            react_1.default.createElement("div", { className: "ml-1 mb-2" },
                react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push({ pathname: '/admin-super/stores/create' }) },
                    react_1.default.createElement(md_1.MdAddBusiness, null),
                    "Create New Store")),
            react_1.default.createElement("div", { className: "my-5" },
                react_1.default.createElement(searchField_1.default, { searchTerm: searchQuery, onSearchChange: setSearchQuery, className: '', placeholder: "Search stores..." })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "overflow-x-auto" },
                    react_1.default.createElement("table", { ref: tableRef, className: "min-w-full bg-white text-sm shadow-2xl rounded-lg overflow-hidden" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", { className: "bg-gray-800 text-white uppercase text-xs" },
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Store Name"),
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Location"),
                                react_1.default.createElement("th", { onClick: () => handleSort("admin"), className: "p-4 cursor-pointer" },
                                    react_1.default.createElement("div", { className: 'flex items-center' },
                                        "Assigned Admin",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }),
                                        sortField === "admin")),
                                react_1.default.createElement("th", { onClick: () => handleSort("created_at"), className: "p-4 cursor-pointer" },
                                    react_1.default.createElement("div", { className: 'flex items-center' },
                                        "Created Date",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }),
                                        sortField === "created_at")),
                                react_1.default.createElement("th", { className: "py-4 px-6 text-center" }, "Actions"))),
                        react_1.default.createElement("tbody", null, allStores.map((store, index) => (react_1.default.createElement("tr", { key: store.store_id, onClick: () => handleRowClick(`/admin-super/stores/inventory/${store.store_id}`), className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-200 hover:cursor-pointer transition-colors`, title: "Click to manage store inventory" },
                            react_1.default.createElement("td", { className: "p-4" }, editId === store.store_id ? (react_1.default.createElement("input", { type: "text", value: editStoreData.storeName, onChange: (e) => handleChange(e, 'storeName'), className: "border-b-2 border-indigo-600 focus:outline-none" })) : (store.store_name)),
                            react_1.default.createElement("td", { className: "p-4" }, editId === store.store_id ? (react_1.default.createElement("div", { className: "relative" },
                                react_1.default.createElement("input", { type: "text", value: editStoreData.locationName, onChange: (e) => handleChange(e, 'locationName'), className: "border-b-2 border-indigo-600 focus:outline-none" }))) : (store.store_location)),
                            react_1.default.createElement("td", { className: "p-4" }, store.store_admin),
                            react_1.default.createElement("td", { className: "p-4" }, new Date(store.created_at).toLocaleDateString()),
                            react_1.default.createElement("td", { className: "py-3 px-2 text-center whitespace-nowrap" },
                                react_1.default.createElement("button", { title: "Edit store", onClick: (e) => { e.stopPropagation(); handleEditClick(store); }, className: "mx-2 py-2 px-2 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, editId === store.store_id ? (react_1.default.createElement(md_1.MdSaveAs, { className: "text-2xl" })) : (react_1.default.createElement(md_1.MdEditSquare, { className: "text-2xl" }))),
                                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); handleDeleteStore(store.store_id); }, className: "mx-2 py-2 px-2 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors transform", title: "Delete store" },
                                    react_1.default.createElement(md_1.MdDelete, { className: "text-2xl" }))))))),
                        locationSuggestions.length > 0 && (react_1.default.createElement("div", { className: "absolute z-10 bg-white border border-gray-300 shadow-md rounded-lg max-h-40 overflow-auto", style: { top: `${suggestionsPosition.top}px`, left: `${suggestionsPosition.left}px`, width: '200px', } }, locationSuggestions.map((suggestion, index) => (react_1.default.createElement("div", { key: index, onClick: () => handleSuggestionClick(suggestion), className: "px-4 py-2 hover:bg-indigo-100 cursor-pointer" }, suggestion.city_name))))))),
                react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })))));
}
exports.default = ManageStores;
