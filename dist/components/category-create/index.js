"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const manageCategorySlice_1 = require("@/redux/slices/manageCategorySlice.js");
const input_1 = require("@/components/ui/input.js");
const button_1 = require("@/components/ui/button.js");
const card_1 = require("@/components/ui/card.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function CategoryCreate() {
    const [categoryName, setCategoryName] = (0, react_1.useState)("");
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleCreateCategory = () => {
        if (!categoryName.trim()) {
            dispatch((0, errorSlice_1.showError)("Category name cannot be empty"));
            return;
        }
        if (categoryName.trim().length > 50) {
            dispatch((0, errorSlice_1.showError)("Category name cannot exceed 50 characters"));
            return;
        }
        dispatch((0, manageCategorySlice_1.createCategory)({ category_name: categoryName }))
            .unwrap()
            .then(() => {
            dispatch((0, successSlice_1.showSuccess)("Category successfully created"));
            setCategoryName("");
        })
            .catch((error) => {
            var _a, _b;
            const errorMessage = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || "Failed to create category";
            dispatch((0, errorSlice_1.showError)(errorMessage));
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-2 text-gray-800" }, "Create a new Category"),
        react_1.default.createElement(card_1.Card, { className: "p-4 w-full" },
            react_1.default.createElement("div", { className: "flex flex-col lg:flex-row lg:justify-between gap-4" },
                react_1.default.createElement(input_1.Input, { className: "w-full", placeholder: "Enter category name", value: categoryName, onChange: (e) => setCategoryName(e.target.value) }),
                react_1.default.createElement(button_1.Button, { onClick: handleCreateCategory }, "Create Category")))));
}
exports.default = CategoryCreate;
