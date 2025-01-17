"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const fa6_1 = require("react-icons/fa6");
const pagination_1 = require("../pagination.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const router_1 = require("next/router");
const js_cookie_1 = require("js-cookie");
const getDiscountSlice_1 = require("@/redux/slices/getDiscountSlice.js");
const md_1 = require("react-icons/md");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
function DiscountAdminTable() {
    const storeId = js_cookie_1.default.get("storeId");
    const dispatch = (0, react_redux_1.useDispatch)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { discounts, sortField, sortOrder, currentPage, totalPages } = (0, react_redux_1.useSelector)((state) => state.getDiscount);
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
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, getDiscountSlice_1.setCurrentPage)(page));
        }
    };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, getDiscountSlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, getDiscountSlice_1.setSortField)(field));
            dispatch((0, getDiscountSlice_1.setSortOrder)("asc"));
        }
        if (storeId) {
            dispatch((0, getDiscountSlice_1.fetchDiscountsAdmin)({
                storeId: parseInt(storeId),
                page: 1,
                pageSize: 10,
                sortField: field,
                sortOrder: updatedSortOrder,
            }));
        }
    };
    const handleDeleteDiscount = (discountId) => {
        dispatch((0, confirmSlice_1.showConfirmation)({
            message: "Are you sure you want to delete this discount?",
            onConfirm: () => {
                dispatch((0, getDiscountSlice_1.deleteDiscount)(discountId))
                    .unwrap()
                    .then(() => {
                    dispatch((0, successSlice_1.showSuccess)("Discount successfully deleted"));
                })
                    .catch((error) => {
                    dispatch((0, errorSlice_1.showError)(error || "Failed to delete discount"));
                })
                    .finally(() => {
                    dispatch((0, confirmSlice_1.hideConfirmation)());
                });
            },
        }));
    };
    (0, react_1.useEffect)(() => {
        if (storeId) {
            dispatch((0, getDiscountSlice_1.fetchDiscountsAdmin)({
                storeId: parseInt(storeId),
                page: currentPage,
                sortField,
                sortOrder,
                search: debouncedQuery,
            }));
        }
    }, [dispatch, currentPage, sortField, sortOrder, debouncedQuery]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
            react_1.default.createElement("table", { className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                        react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("type") },
                            react_1.default.createElement("div", { className: "flex items-center" },
                                "Discount Type",
                                react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                        react_1.default.createElement("th", { className: "p-4" }, "Product Name"),
                        react_1.default.createElement("th", { className: "p-4" }, "Value"),
                        react_1.default.createElement("th", { className: "p-4" }, "Active"),
                        react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("start_date") },
                            react_1.default.createElement("div", { className: "flex items-center" },
                                "Start Date",
                                react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                        react_1.default.createElement("th", { className: "p-4 cursor-pointer", onClick: () => handleSort("end_date") },
                            react_1.default.createElement("div", { className: "flex items-center" },
                                "End Date",
                                react_1.default.createElement(fa6_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                        react_1.default.createElement("th", { className: "p-4" }, "Created At"),
                        react_1.default.createElement("th", { className: "p-4" }, "Updated At"),
                        react_1.default.createElement("th", { className: "p-4" }, "Actions"))),
                react_1.default.createElement("tbody", null, discounts.map((discount, index) => (react_1.default.createElement("tr", { key: discount.discount_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b text-sm hover:bg-gray-100 transition-colors` },
                    react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, discount.type || "Unkown Product"),
                    react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, discount.product_name || "Unkown Product"),
                    react_1.default.createElement("td", { className: "p-4 text-gray-700 font-medium" }, discount.type === "PERCENTAGE"
                        ? `${discount.value}%`
                        : discount.type === "BOGO"
                            ? "Buy One Get One"
                            : new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                            }).format(Number(discount.value))),
                    react_1.default.createElement("td", { className: "p-4 text-gray-700 text-sm text-center" },
                        react_1.default.createElement("div", { className: `${getActiveColor(discount.is_active)} font-bold py-2 rounded-full text-white` }, discount.is_active ? "Yes" : "No")),
                    react_1.default.createElement("td", null, new Date(discount.start_date).toLocaleDateString()),
                    react_1.default.createElement("td", null, new Date(discount.end_date).toLocaleDateString()),
                    react_1.default.createElement("td", null, new Date(discount.created_at).toLocaleDateString()),
                    react_1.default.createElement("td", null, new Date(discount.updated_at).toLocaleDateString()),
                    react_1.default.createElement("td", { className: "" },
                        react_1.default.createElement("div", { className: "flex justify-center items-center h-full" },
                            react_1.default.createElement("button", { title: "Edit product", onClick: (e) => {
                                    e.stopPropagation();
                                    router_1.default.push(`/admin-store/discounts/update-discount/${discount.discount_id}`);
                                }, className: "py-2 px-2 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" },
                                react_1.default.createElement(md_1.MdEditSquare, { className: "text-2xl" })),
                            react_1.default.createElement("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    handleDeleteDiscount(discount.discount_id);
                                }, className: "py-2 px-2 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors transform", title: "Delete product" },
                                react_1.default.createElement(md_1.MdDelete, { className: "text-2xl" })))))))))),
        react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })));
}
exports.default = DiscountAdminTable;
