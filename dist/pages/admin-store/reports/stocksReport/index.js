"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const storeStockSlice_1 = require("@/redux/slices/storeStockSlice.js");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const searchField_1 = require("@/components/searchField.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const pagination_1 = require("@/components/pagination.js");
function StoreStocksReports() {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { stocksData, currentPage, totalPages, storeId, loading, error } = (0, react_redux_1.useSelector)((state) => state.storeStocks);
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, storeStockSlice_1.setCurrentPage)(page));
        }
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, storeStockSlice_1.fetchStocksStore)({ page: currentPage, search: debouncedQuery }));
    }, [dispatch, currentPage, debouncedQuery]);
    const toggleSidebar = () => {
        dispatch({ type: "storeAdmin/toggleSidebar" });
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Stocks Report"),
            react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search products...", searchTerm: searchQuery, onSearchChange: setSearchQuery }),
            react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
                react_1.default.createElement("table", { className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                            react_1.default.createElement("th", { className: "p-4" }, "Product"),
                            react_1.default.createElement("th", { className: "p-4" }, "Store"),
                            react_1.default.createElement("th", { className: "p-4" }, "Change Type"),
                            react_1.default.createElement("th", { className: "p-4" }, "Quantity"),
                            react_1.default.createElement("th", { className: "p-4" }, "Previous Stock"),
                            react_1.default.createElement("th", { className: "p-4" }, "New Stock"),
                            react_1.default.createElement("th", { className: "p-4" }, "Change Category"),
                            react_1.default.createElement("th", { className: "p-4" }, "Created At"))),
                    react_1.default.createElement("tbody", null, stocksData.map((stock, index) => (react_1.default.createElement("tr", { key: stock.journal_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.inventory_name),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.store_name),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.change_type),
                        react_1.default.createElement("td", { className: `p-4 text-gray-700 font-medium text-center ${stock.change_quantity < 0
                                ? "text-red-500"
                                : "text-green-500"}` }, stock.change_quantity),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.prev_stock),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.new_stock),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, stock.change_category),
                        react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, new Date(stock.created_at).toLocaleDateString()))))))),
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }))));
}
exports.default = StoreStocksReports;
