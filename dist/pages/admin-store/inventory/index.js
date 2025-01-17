"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const fa_1 = require("react-icons/fa");
const fa6_1 = require("react-icons/fa6");
const card_1 = require("@/components/ui/card.js");
const lu_1 = require("react-icons/lu");
const searchField_1 = require("@/components/searchField.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const storeInventorySlice_1 = require("@/redux/slices/storeInventorySlice.js");
const storeAdminSlice_1 = require("@/redux/slices/storeAdminSlice.js");
const js_cookie_1 = require("js-cookie");
const pagination_1 = require("@/components/pagination.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
function StoreInventory() {
    const storeId = js_cookie_1.default.get("storeId");
    const dispatch = (0, react_redux_1.useDispatch)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { isSidebarOpen, storeLocation, storeName } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { store, inventories, sortField, sortOrder, currentPage, totalPages, totalItems, loading, error, } = (0, react_redux_1.useSelector)((state) => state.storeInventory);
    const toggleSidebar = () => {
        dispatch({ type: "storeAdmin/toggleSidebar" });
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, storeInventorySlice_1.setCurrentPage)(page));
        }
    };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, storeInventorySlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, storeInventorySlice_1.setSortField)(field));
            dispatch((0, storeInventorySlice_1.setSortOrder)("asc"));
        }
        dispatch((0, storeInventorySlice_1.fetchInventoriesByStoreId)({
            page: 1,
            sortField: field,
            sortOrder: updatedSortOrder,
        }));
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, storeInventorySlice_1.fetchInventoriesByStoreId)({
            page: currentPage,
            sortField,
            sortOrder,
            search: debouncedQuery,
        }));
    }, [currentPage, sortField, sortOrder, debouncedQuery, dispatch]);
    (0, react_1.useEffect)(() => {
        if (storeId) {
            dispatch((0, storeAdminSlice_1.fetchStoreByStoreId)(parseInt(storeId)));
        }
    }, [dispatch, storeId]);
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6 relative` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Inventory"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "flex flex-col justify-between sm:flex-row sm:items-center" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: " flex items-center text-xl mb-2 text-gray-700 tracking-wide" },
                            react_1.default.createElement(fa_1.FaStore, { className: "flex items-center mr-2" }),
                            storeName),
                        react_1.default.createElement("h3", { className: "text-sm text-gray-700 flex items-center mb-2 tracking-wide" },
                            react_1.default.createElement(fa6_1.FaLocationDot, { className: "flex items-center mr-2" }),
                            storeLocation)),
                    react_1.default.createElement("div", { className: "w-full mt-2 sm:w-1/2 lg:w-1/4" },
                        react_1.default.createElement(card_1.Card, null,
                            react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                                react_1.default.createElement(card_1.CardTitle, { className: "text-gray-700 text-sm font-medium " }, "Total Products"),
                                react_1.default.createElement(lu_1.LuPackage, { className: "h-4 w-4 text-muted-foreground" })),
                            react_1.default.createElement(card_1.CardContent, null,
                                react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalItems))))),
                react_1.default.createElement("div", { className: "my-5" },
                    react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search products...", searchTerm: searchQuery, onSearchChange: setSearchQuery })),
                react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
                    react_1.default.createElement("table", { className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                                react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("product_name") },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        "Product Name",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                    sortField === "product_name"),
                                react_1.default.createElement("th", { className: "p-4" }, "Category"),
                                react_1.default.createElement("th", { className: "p-4" }, "Price"),
                                react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("stock") },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        "Stock",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                    sortField === "stock"),
                                react_1.default.createElement("th", { className: "p-4" }, "User Stock"),
                                react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("items_sold") },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        "Items Sold",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                    sortField === "items_sold"),
                                react_1.default.createElement("th", { className: "p-4" }, "Updated At"))),
                        react_1.default.createElement("tbody", null, inventories.map((inventory, index) => {
                            var _a, _b, _c;
                            return (react_1.default.createElement("tr", { key: inventory.inventory_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                                react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, ((_a = inventory.Product) === null || _a === void 0 ? void 0 : _a.product_name) || "Unkown Product"),
                                react_1.default.createElement("td", { className: "p-4 text-gray-600" }, (_c = (_b = inventory.Product) === null || _b === void 0 ? void 0 : _b.Category) === null || _c === void 0 ? void 0 : _c.category_name),
                                react_1.default.createElement("td", { className: "p-4 text-gray-600" }, inventory.discounted_price
                                    ? new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0, // Ensures no decimals like "Rp. 35.000"
                                    }).format(Number(inventory.discounted_price))
                                    : "N/A"),
                                react_1.default.createElement("td", { className: `p-4 font-medium ${inventory.stock < 10 ? "text-red-500" : "text-gray-600"}` }, inventory.stock),
                                react_1.default.createElement("td", { className: "p-4 text-gray-600" }, inventory.user_stock),
                                react_1.default.createElement("td", { className: "p-4 text-gray-600" }, inventory.items_sold),
                                react_1.default.createElement("td", null, new Date(inventory.updated_at).toLocaleDateString())));
                        }))))),
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }))));
}
exports.default = StoreInventory;
