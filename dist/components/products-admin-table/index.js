"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const fa6_1 = require("react-icons/fa6");
const manageProductSlice_1 = require("@/redux/slices/manageProductSlice.js");
const searchField_1 = require("../searchField.js");
const pagination_1 = require("../pagination.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const md_1 = require("react-icons/md");
const router_1 = require("next/router");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function ProductAdminTable() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const [searchCatQuery, setSearchCatQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const debounceCatQuery = (0, useDebounce_1.default)(searchCatQuery, 500);
    const { products, sortOrder, currentPage, totalPages, sortField, search, category, error, loading, } = (0, react_redux_1.useSelector)((state) => state.manageProduct);
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, manageProductSlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, manageProductSlice_1.setSortField)(field));
            dispatch((0, manageProductSlice_1.setSortOrder)("asc"));
        }
        dispatch((0, manageProductSlice_1.fetchAllProductsAdmin)({
            page: 1,
            pageSize: 10,
            sortField: field,
            sortOrder: updatedSortOrder,
        }));
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, manageProductSlice_1.setCurrentPage)(page));
        }
    };
    const handleDeleteProduct = (productId) => {
        dispatch((0, confirmSlice_1.showConfirmation)({
            message: "Are you sure you want to delete this product?",
            onConfirm: () => {
                dispatch((0, manageProductSlice_1.deleteProduct)(productId))
                    .unwrap()
                    .then(() => {
                    dispatch((0, successSlice_1.showSuccess)("Product successfully deleted!"));
                })
                    .catch((error) => {
                    dispatch((0, errorSlice_1.showError)(error || "Failed to delete product. Please try again."));
                })
                    .finally(() => {
                    dispatch((0, confirmSlice_1.hideConfirmation)());
                });
            },
        }));
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, manageProductSlice_1.fetchAllProductsAdmin)({
            page: currentPage,
            pageSize: 10,
            search: debouncedQuery,
            category: debounceCatQuery,
            sortField,
            sortOrder,
        }));
    }, [
        currentPage,
        sortField,
        sortOrder,
        debounceCatQuery,
        debouncedQuery,
        dispatch,
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "my-5" },
                react_1.default.createElement("div", { className: "flex flex-col gap-5 lg:flex-row" },
                    react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search products...", searchTerm: searchQuery, onSearchChange: setSearchQuery }),
                    react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search categories...", searchTerm: searchCatQuery, onSearchChange: setSearchCatQuery })))),
        react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
            react_1.default.createElement("table", { className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                        react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("product_name") },
                            react_1.default.createElement("div", { className: "flex items-center" },
                                "Name",
                                react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                        react_1.default.createElement("th", { className: "p-4" }, "Category"),
                        react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("price") },
                            react_1.default.createElement("div", { className: "flex items-center" },
                                "Price",
                                react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                        react_1.default.createElement("th", { className: "p-4" }, "Created At"),
                        react_1.default.createElement("th", { className: "p-4" }, "Updated At"),
                        react_1.default.createElement("th", { className: "p-4" }, "Actions"))),
                react_1.default.createElement("tbody", null, products.map((product, index) => (react_1.default.createElement("tr", { key: product.product_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                    react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, product.product_name),
                    react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, product.category),
                    react_1.default.createElement("td", { className: "p-4 text-gray-600" }, product.price
                        ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(Number(product.price))
                        : "N/A"),
                    react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, new Date(product.created_at).toLocaleDateString()),
                    react_1.default.createElement("td", { className: "p-4  text-gray-700 font-medium" }, new Date(product.updated_at).toLocaleDateString()),
                    react_1.default.createElement("td", { className: "py-3 px-2 text-center whitespace-nowrap" },
                        react_1.default.createElement("button", { title: "Edit product", onClick: (e) => {
                                e.stopPropagation();
                                router_1.default.push(`/admin-super/products/updateProduct/${product.product_id}`);
                            }, className: "mx-2 py-2 px-2 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" },
                            react_1.default.createElement(md_1.MdEditSquare, { className: "text-2xl" })),
                        react_1.default.createElement("button", { onClick: (e) => {
                                e.stopPropagation();
                                handleDeleteProduct(product.product_id);
                            }, className: "mx-2 py-2 px-2 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors transform", title: "Delete product" },
                            react_1.default.createElement(md_1.MdDelete, { className: "text-2xl" }))))))))),
        react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })));
}
exports.default = ProductAdminTable;
