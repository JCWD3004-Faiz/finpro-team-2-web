"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const manageInventorySlice_1 = require("@/redux/slices/manageInventorySlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const fa6_1 = require("react-icons/fa6");
const md_1 = require("react-icons/md");
const card_1 = require("@/components/ui/card.js");
const lu_1 = require("react-icons/lu");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const pagination_1 = require("@/components/pagination.js");
const searchField_1 = require("@/components/searchField.js");
const Bulk_action_1 = require("@/components/Bulk-action.js");
const modal_stock_1 = require("@/components/modal-stock.js");
const modal_error_1 = require("@/components/modal-error.js");
const modal_success_1 = require("@/components/modal-success.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const checkbox_1 = require("@/components/ui/checkbox.js");
function ManageInventory() {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const params = (0, navigation_1.useParams)();
    const store_id = Number(params === null || params === void 0 ? void 0 : params.store_id);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { store, inventories, selectedItems, sortField, sortOrder, currentPage, totalPages, totalItems, loading, error, } = (0, react_redux_1.useSelector)((state) => state.manageInventory);
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const toggleSidebar = () => {
        dispatch({ type: "superAdmin/toggleSidebar" });
    };
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleCheckboxChange = (inventory) => {
        dispatch((0, manageInventorySlice_1.toggleSelectedItem)(inventory));
    };
    const handleConfirm = (inputInventories) => {
        if (inputInventories.stockChange === 0) {
            dispatch((0, errorSlice_1.showError)("Stock change cannot be 0."));
            return;
        }
        const hasUnsoldItems = inputInventories.inventoryIds.some((id) => {
            const inventory = inventories.find((item) => item.inventory_id === id);
            return (inventory === null || inventory === void 0 ? void 0 : inventory.items_sold) === 0;
        });
        if (hasUnsoldItems && inputInventories.changeCategory === "SOLD") {
            dispatch((0, errorSlice_1.showError)("Cannot set category to 'SOLD' for items with no sales."));
            return;
        }
        dispatch((0, manageInventorySlice_1.createStockJournal)({
            storeId: store_id,
            inventoryIds: inputInventories.inventoryIds,
            stockChange: inputInventories.stockChange,
            changeCategory: inputInventories.changeCategory,
        }))
            .unwrap()
            .then((message) => {
            dispatch((0, successSlice_1.showSuccess)(message || "Stock journal created successfully"));
            closeModal();
            setTimeout(() => {
                router.push("/admin-super");
            }, 3000);
        })
            .catch((error) => {
            console.error("Failed to create stock journal: ", error);
            dispatch((0, errorSlice_1.showError)(error));
        });
    };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, manageInventorySlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, manageInventorySlice_1.setSortField)(field));
            dispatch((0, manageInventorySlice_1.setSortOrder)("asc"));
        }
        dispatch((0, manageInventorySlice_1.fetchInventoriesByStoreId)({
            storeId: store_id,
            page: 1,
            sortField: field,
            sortOrder: updatedSortOrder,
        }));
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, manageInventorySlice_1.setCurrentPage)(page));
        }
    };
    (0, react_1.useEffect)(() => {
        if (error) {
            dispatch((0, errorSlice_1.showError)(error));
        }
    }, [error]);
    (0, react_1.useEffect)(() => {
        if (store_id) {
            dispatch((0, manageInventorySlice_1.fetchStoreByStoreId)(store_id));
            dispatch((0, manageInventorySlice_1.fetchInventoriesByStoreId)({
                storeId: store_id,
                page: currentPage,
                sortField,
                sortOrder,
                search: debouncedQuery,
            }));
        }
    }, [store_id, currentPage, sortField, sortOrder, debouncedQuery, dispatch]);
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => dispatch((0, successSlice_1.hideSuccess)()), successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Inventory Management"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "flex flex-col justify-between sm:flex-row sm:items-center" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: " flex items-center text-xl mb-2 text-gray-700 tracking-wide" },
                            react_1.default.createElement(fa6_1.FaStore, { className: "flex items-center mr-2" }), store === null || store === void 0 ? void 0 :
                            store.store_name),
                        react_1.default.createElement("h3", { className: "text-sm text-gray-700 flex items-center mb-2 tracking-wide" },
                            react_1.default.createElement(fa6_1.FaLocationDot, { className: "flex items-center mr-2" }), store === null || store === void 0 ? void 0 :
                            store.store_location),
                        react_1.default.createElement("h3", { className: "text-sm text-gray-700 flex items-center tracking-wide" },
                            react_1.default.createElement(md_1.MdOutlineAccountCircle, { className: "flex items-center mr-2" }), (_a = store === null || store === void 0 ? void 0 : store.User) === null || _a === void 0 ? void 0 :
                            _a.username)),
                    react_1.default.createElement("div", { className: "w-full mt-2 sm:w-1/2 lg:w-1/4" },
                        react_1.default.createElement(card_1.Card, null,
                            react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                                react_1.default.createElement(card_1.CardTitle, { className: "text-gray-700 text-sm font-medium " }, "Total Products"),
                                react_1.default.createElement(lu_1.LuPackage, { className: "h-4 w-4 text-muted-foreground" })),
                            react_1.default.createElement(card_1.CardContent, null,
                                react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalItems))))),
                react_1.default.createElement("div", { className: "my-5" },
                    react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search products...", searchTerm: searchQuery, onSearchChange: setSearchQuery })),
                react_1.default.createElement(Bulk_action_1.default, { selectedProducts: selectedItems, onUpdateStock: openModal })),
            react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
                react_1.default.createElement("table", { className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                            react_1.default.createElement("th", { className: "p-4" },
                                react_1.default.createElement(checkbox_1.Checkbox, { className: "bg-white cursor-pointer rounded-sm", checked: inventories.length > 0 &&
                                        selectedItems.length === inventories.length, onCheckedChange: (isChecked) => {
                                        if (isChecked) {
                                            dispatch((0, manageInventorySlice_1.selectAllItems)());
                                        }
                                        else {
                                            dispatch((0, manageInventorySlice_1.deselectAllItems)());
                                        }
                                    } })),
                            react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("product_name") },
                                react_1.default.createElement("div", { className: "flex items-center" },
                                    "Product Name",
                                    react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                sortField === "product_name"),
                            react_1.default.createElement("th", { className: "p-4" }, "Category"),
                            react_1.default.createElement("th", { className: "p-4" }, "Price"),
                            react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("stock") },
                                react_1.default.createElement("div", { className: "flex items-center" },
                                    "Stock",
                                    react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                sortField === "stock"),
                            react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("items_sold") },
                                react_1.default.createElement("div", { className: "flex items-center" },
                                    "Items Sold",
                                    react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" })),
                                sortField === "items_sold"),
                            react_1.default.createElement("th", { className: "p-4" }, "Updated At"))),
                    react_1.default.createElement("tbody", null, inventories.map((inventory, index) => {
                        var _a, _b, _c;
                        return (react_1.default.createElement("tr", { key: inventory.inventory_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                            react_1.default.createElement("td", { className: "p-4" },
                                react_1.default.createElement(checkbox_1.Checkbox, { className: "cursor-pointer", checked: selectedItems.some((item) => item.inventory_id === inventory.inventory_id), onCheckedChange: (isChecked) => {
                                        var _a;
                                        return handleCheckboxChange({
                                            inventory_id: inventory.inventory_id,
                                            product_name: ((_a = inventory.Product) === null || _a === void 0 ? void 0 : _a.product_name) ||
                                                "Unknown Product",
                                        });
                                    } })),
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
                            react_1.default.createElement("td", { className: "p-4 text-gray-600" }, inventory.items_sold),
                            react_1.default.createElement("td", null, new Date(inventory.updated_at).toLocaleDateString())));
                    })))),
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }),
            react_1.default.createElement(modal_stock_1.default, { isOpen: isModalOpen, onClose: closeModal, inventories: selectedItems, onConfirm: handleConfirm }))));
}
exports.default = ManageInventory;
