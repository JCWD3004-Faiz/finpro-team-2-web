"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const manageCategorySlice_1 = require("@/redux/slices/manageCategorySlice.js");
const searchField_1 = require("../searchField.js");
const pagination_1 = require("../pagination.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const md_1 = require("react-icons/md");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
function CategoryAdminTable() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const tableRef = (0, react_1.useRef)(null);
    const [editCategoryData, setEditCategoryData] = (0, react_1.useState)({
        category_name: "",
    });
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const { category, editId, loading, error, currentPage, totalPages } = (0, react_redux_1.useSelector)((state) => state.manageCategory);
    const handleEditClick = (cat) => {
        if (editId === cat.category_id) {
            dispatch((0, manageCategorySlice_1.resetEditState)());
        }
        else {
            dispatch((0, manageCategorySlice_1.setEditId)(cat.category_id));
            setEditCategoryData({ category_name: cat.category_name });
        }
    };
    const handleSaveClick = (categoryId) => __awaiter(this, void 0, void 0, function* () {
        if (!editCategoryData.category_name.trim()) {
            dispatch((0, errorSlice_1.showError)("Category name cannot be empty"));
            return;
        }
        if (editCategoryData.category_name.length > 50) {
            dispatch((0, errorSlice_1.showError)("Category name cannot exceed 50 characters"));
            return;
        }
        try {
            yield dispatch((0, manageCategorySlice_1.updateCategory)(Object.assign({ category_id: categoryId }, editCategoryData)));
            dispatch((0, manageCategorySlice_1.resetEditState)());
            dispatch((0, successSlice_1.showSuccess)("Category successfully edited"));
        }
        catch (error) {
            dispatch((0, errorSlice_1.showError)("Failed to edit Category"));
        }
    });
    const handleDeleteCategory = (categoryId) => {
        dispatch((0, confirmSlice_1.showConfirmation)({
            message: "Are you sure you want to delete this item?",
            onConfirm: () => {
                dispatch((0, manageCategorySlice_1.deleteCategory)({ category_id: categoryId }))
                    .unwrap()
                    .then(() => {
                    dispatch((0, successSlice_1.showSuccess)("Category successfully deleted"));
                })
                    .catch((error) => {
                    dispatch((0, errorSlice_1.showError)("Failed to delete category"));
                })
                    .finally(() => {
                    dispatch((0, confirmSlice_1.hideConfirmation)());
                });
            },
        }));
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, manageCategorySlice_1.setCurrentPage)(page));
        }
    };
    const handleChange = (e, field) => {
        const value = e.target.value;
        setEditCategoryData(Object.assign(Object.assign({}, editCategoryData), { [field]: value }));
    };
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current &&
                !tableRef.current.contains(event.target)) {
                dispatch((0, manageCategorySlice_1.resetEditState)());
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        dispatch((0, manageCategorySlice_1.fetchAllCategories)({
            page: currentPage,
            pageSize: 10,
            search: debouncedQuery,
        }));
    }, [currentPage, debouncedQuery, dispatch]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "mt-5" },
            react_1.default.createElement(searchField_1.default, { className: "", placeholder: "Search categories...", searchTerm: searchQuery, onSearchChange: setSearchQuery })),
        react_1.default.createElement("div", { className: "overflow-x-auto mt-2" },
            react_1.default.createElement("table", { ref: tableRef, className: "min-w-full bg-white shadow-2xl rounded-lg overflow-hidden" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { className: "bg-gray-800 text-white text-left text-xs uppercase font-semibold" },
                        react_1.default.createElement("th", { className: "p-4" }, "Category Name"),
                        react_1.default.createElement("th", { className: "p-4" }, "Total Products"),
                        react_1.default.createElement("th", { className: "p-4" }, "Created At"),
                        react_1.default.createElement("th", { className: "p-4" }, "Action"))),
                react_1.default.createElement("tbody", null, category.map((cat, index) => (react_1.default.createElement("tr", { key: cat.category_id, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-gray-100 transition-colors` },
                    react_1.default.createElement("td", { className: "p-4 text-gray-600" }, editId === cat.category_id ? (react_1.default.createElement("input", { type: "text", value: editCategoryData.category_name, onChange: (e) => handleChange(e, "category_name"), className: "border-b-2 border-indigo-600 focus:outline-none" })) : (cat.category_name)),
                    react_1.default.createElement("td", { className: "p-4 text-gray-600" }, cat.totalProducts),
                    react_1.default.createElement("td", { className: "p-4 text-gray-600" }, new Date(cat.created_at).toLocaleDateString()),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement("button", { title: "Edit store", onClick: (e) => {
                                e.stopPropagation();
                                if (editId === cat.category_id) {
                                    handleSaveClick(cat.category_id); // Save changes
                                }
                                else {
                                    handleEditClick(cat); // Enter edit mode
                                }
                            }, className: "mx-2 py-2 px-2 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, editId === cat.category_id ? (react_1.default.createElement(md_1.MdSaveAs, { className: "text-2xl" })) : (react_1.default.createElement(md_1.MdEditSquare, { className: "text-2xl" }))),
                        react_1.default.createElement("button", { onClick: (e) => {
                                e.stopPropagation();
                                handleDeleteCategory(cat.category_id);
                            }, className: "mx-2 py-2 px-2 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors transform", title: "Delete store" },
                            react_1.default.createElement(md_1.MdDelete, { className: "text-2xl" }))))))))),
        react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })));
}
exports.default = CategoryAdminTable;
