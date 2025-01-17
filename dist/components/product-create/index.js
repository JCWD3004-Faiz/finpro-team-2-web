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
exports.default = NewProduct;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const card_1 = require("@/components/ui/card.js");
const input_1 = require("@/components/ui/input.js");
const label_1 = require("@/components/ui/label.js");
const button_1 = require("@/components/ui/button.js");
const textarea_1 = require("@/components/ui/textarea.js");
const zod_1 = require("zod");
const axios_1 = require("axios");
const select_1 = require("@/components/ui/select.js");
const react_redux_1 = require("react-redux");
const manageCategorySlice_1 = require("@/redux/slices/manageCategorySlice.js");
const manageProductSlice_1 = require("@/redux/slices/manageProductSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const manageProductSchema_1 = require("@/utils/manageProductSchema.js");
function NewProduct() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { allCategory } = (0, react_redux_1.useSelector)((state) => state.manageCategory);
    const { formData, loading } = (0, react_redux_1.useSelector)((state) => state.manageProduct);
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files)
            return;
        const maxSizeInMB = 1; // Maximum file size in MB
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        const validFiles = Array.from(files).filter((file) => {
            if (file.size > maxSizeInBytes) {
                dispatch((0, errorSlice_1.showError)(`File "${file.name}" exceeds the maximum size of ${maxSizeInMB}MB.`));
                return false;
            }
            return true;
        });
        if (validFiles.length === 0) {
            dispatch((0, errorSlice_1.showError)("No valid files to upload. Please try again."));
            return;
        }
        const newImages = Array.from(files);
        dispatch((0, manageProductSlice_1.setFormData)({
            field: "images",
            value: [...formData.images, ...newImages].slice(0, 4),
        }));
    };
    const handleChange = (field, value) => {
        dispatch((0, manageProductSlice_1.setFormData)({ field, value }));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        if (!formData.category_id) {
            alert("Please select a valid category.");
            return;
        }
        try {
            const validatedData = manageProductSchema_1.manageProductSchema.parse(formData);
            yield dispatch((0, manageProductSlice_1.createProduct)(validatedData)).unwrap();
            dispatch((0, successSlice_1.showSuccess)("Product successfully created"));
            dispatch((0, manageProductSlice_1.resetFormData)());
        }
        catch (error) {
            let errorMessage = "Failed to create category";
            if (error instanceof zod_1.ZodError) {
                errorMessage = error.errors.map((e) => e.message).join(", ");
            }
            else if (error instanceof axios_1.AxiosError && ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error)) {
                errorMessage = error.response.data.error;
            }
            dispatch((0, errorSlice_1.showError)(errorMessage));
        }
    });
    (0, react_1.useEffect)(() => {
        dispatch((0, manageCategorySlice_1.fetchCategories)());
    }, [dispatch]);
    return (React.createElement("div", { className: "min-h-screen sm:px-6 lg:px-8" },
        React.createElement("div", { className: "max-w-3xl mx-auto" },
            React.createElement("div", { className: "space-y-6" },
                React.createElement("div", null,
                    React.createElement("p", { className: "mt-2 text-sm text-gray-600" }, "Fill in the details below to add a new grocery product to the store.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
                    React.createElement(card_1.Card, { className: "p-6 space-y-6" },
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "category" }, "Category"),
                                React.createElement(select_1.Select, { onValueChange: (value) => handleChange("category_id", Number(value)) },
                                    React.createElement(select_1.SelectTrigger, { className: "w-full mt-1" },
                                        React.createElement(select_1.SelectValue, { placeholder: "Select a category" })),
                                    React.createElement(select_1.SelectContent, null, allCategory.map((category, index) => (React.createElement(select_1.SelectItem, { key: category.category_id, value: String(category.category_id) }, category.category_name)))))),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "name" }, "Product Name"),
                                React.createElement(input_1.Input, { id: "name", placeholder: "Enter product name", value: formData.product_name, onChange: (e) => handleChange("product_name", e.target.value), className: "mt-1", required: true })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "description" }, "Description"),
                                React.createElement(textarea_1.Textarea, { id: "description", placeholder: "Enter product description", value: formData.description, onChange: (e) => handleChange("description", e.target.value), className: "mt-1 h-32", required: true })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "price" }, "Price (Rp)"),
                                React.createElement(input_1.Input, { id: "price", type: "number", step: "0.01", min: "0", placeholder: "0.00", value: formData.price || "", onChange: (e) => handleChange("price", Number(e.target.value)), className: "mt-1", required: true })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, null, "Product Images"),
                                React.createElement("div", { className: "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4" }, [...Array(4)].map((_, index) => (React.createElement("div", { key: index, className: "relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors" }, formData.images[index] ? (React.createElement("img", { src: URL.createObjectURL(formData.images[index]), alt: `Product ${index + 1}`, className: "absolute inset-0 w-full h-full object-cover rounded-lg" })) : (React.createElement("label", { className: "absolute inset-0 flex flex-col items-center justify-center cursor-pointer" },
                                    React.createElement(lucide_react_1.Upload, { className: "h-8 w-8 text-gray-400" }),
                                    React.createElement("span", { className: "mt-2 text-sm text-gray-500" },
                                        "Upload Image ",
                                        index + 1),
                                    React.createElement("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleImageUpload }))))))),
                                React.createElement("p", { className: "mt-2 text-sm text-gray-500" }, "Upload up to 4 product images. First image will be the main display image. Max image size is 1MB"))),
                        React.createElement("div", { className: "pt-4" },
                            React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: loading }, loading ? "Adding Product..." : "Add Product"))))))));
}
