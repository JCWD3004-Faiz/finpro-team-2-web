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
const manageProductSlice_1 = require("@/redux/slices/manageProductSlice.js");
const product_field_1 = require("./product-field.js");
const product_image_1 = require("./product-image.js");
const input_1 = require("@/components/ui/input.js");
const label_1 = require("@/components/ui/label.js");
const textarea_1 = require("@/components/ui/textarea.js");
const card_1 = require("@/components/ui/card.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const axios_1 = require("axios");
const zod_1 = require("zod");
const updateProductSchema_1 = require("@/utils/updateProductSchema.js");
function UpdateProductComponent({ product_id }) {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { productDetail, loading, error } = (0, react_redux_1.useSelector)((state) => state.manageProduct);
    const [product, setProduct] = (0, react_1.useState)(null);
    const [imageFiles, setImageFiles] = (0, react_1.useState)([]);
    const handleFieldUpdate = (field, value) => {
        try {
            // Validate the specific field and value using the schema
            const validatedData = updateProductSchema_1.updateProductSchema.parse({
                [field]: value,
            });
            // Dispatch the updateProductField action with validated data
            dispatch((0, manageProductSlice_1.updateProductField)({
                productId: (productDetail === null || productDetail === void 0 ? void 0 : productDetail.product_id) || 0,
                field,
                value: validatedData[field],
            }))
                .unwrap()
                .then(() => dispatch((0, successSlice_1.showSuccess)("Product successfully updated")))
                .catch((error) => {
                var _a, _b;
                let errorMessage = "Failed to update product";
                if (error instanceof axios_1.AxiosError && ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error)) {
                    errorMessage = error.response.data.error;
                }
                dispatch((0, errorSlice_1.showError)(errorMessage));
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Handle validation errors
                const errorMessage = error.errors.map((e) => e.message).join(", ");
                dispatch((0, errorSlice_1.showError)(errorMessage));
            }
            else {
                // Handle unexpected errors
                dispatch((0, errorSlice_1.showError)("An unexpected error occurred."));
            }
        }
    };
    const handleImageChange = (file, index) => {
        const newImageFiles = [...imageFiles];
        newImageFiles[index] = file;
        setImageFiles(newImageFiles);
    };
    const handleImageUpdate = (index, file) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!file || !productDetail)
            return;
        const maxSizeInMB = 1; // Maximum file size in MB
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            dispatch((0, errorSlice_1.showError)(`File "${file.name}" exceeds the maximum size of ${maxSizeInMB}MB.`));
            return;
        }
        const imageId = (_a = productDetail.product_images[index]) === null || _a === void 0 ? void 0 : _a.image_id;
        dispatch((0, manageProductSlice_1.updateProductImage)({ imageId: imageId, imageFile: file, index }))
            .unwrap()
            .then(() => dispatch((0, successSlice_1.showSuccess)("Image updated successfully.")))
            .catch((error) => {
            dispatch((0, errorSlice_1.showError)(error));
        });
    });
    (0, react_1.useEffect)(() => {
        dispatch((0, manageProductSlice_1.fetchProductDetails)(product_id));
    }, [dispatch, product_id]);
    (0, react_1.useEffect)(() => {
        if (productDetail) {
            setProduct(productDetail);
        }
    }, [productDetail]);
    return (react_1.default.createElement("div", { className: "container mx-auto pb-8" },
        react_1.default.createElement("div", { className: "space-y-6" },
            react_1.default.createElement(card_1.Card, { className: "p-6" },
                react_1.default.createElement("div", { className: "" },
                    react_1.default.createElement(label_1.Label, { className: "font-semibold", htmlFor: "name" }, "Product Name"),
                    react_1.default.createElement(product_field_1.ProductField, { isLoading: loading, onUpdate: () => handleFieldUpdate("product_name", (product === null || product === void 0 ? void 0 : product.product_name) || "") },
                        react_1.default.createElement(input_1.Input, { value: product === null || product === void 0 ? void 0 : product.product_name, onChange: (e) => setProduct((prev) => prev ? Object.assign(Object.assign({}, prev), { product_name: e.target.value }) : null), className: "flex-1", placeholder: "Product Name" })),
                    react_1.default.createElement(label_1.Label, { className: "font-semibold", htmlFor: "description" }, "Description"),
                    react_1.default.createElement(product_field_1.ProductField, { isLoading: loading, onUpdate: () => handleFieldUpdate("description", (product === null || product === void 0 ? void 0 : product.description) || "") },
                        react_1.default.createElement(textarea_1.Textarea, { value: product === null || product === void 0 ? void 0 : product.description, onChange: (e) => setProduct((prev) => prev
                                ? Object.assign(Object.assign({}, prev), { description: e.target.value }) : null), className: "flex-1", placeholder: "Product Description" })),
                    react_1.default.createElement(label_1.Label, { className: "font-semibold", htmlFor: "price" }, "Price Rp"),
                    react_1.default.createElement(product_field_1.ProductField, { isLoading: loading, onUpdate: () => handleFieldUpdate("price", String(product === null || product === void 0 ? void 0 : product.price)) },
                        react_1.default.createElement(input_1.Input, { type: "number", value: product === null || product === void 0 ? void 0 : product.price, onChange: (e) => setProduct((prev) => prev
                                ? Object.assign(Object.assign({}, prev), { price: parseFloat(e.target.value) }) : null), className: "flex-1", placeholder: "Price", step: "0.01" })))),
            react_1.default.createElement(card_1.Card, { className: "p-6" },
                react_1.default.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Product Images"),
                react_1.default.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, ((_a = productDetail === null || productDetail === void 0 ? void 0 : productDetail.product_images) === null || _a === void 0 ? void 0 : _a.length) ? (productDetail.product_images.map((image, index) => (react_1.default.createElement(product_image_1.ProductImage, { key: index, src: image.product_image, index: index, isLoading: loading, onImageChange: handleImageChange, onUpdateClick: () => handleImageUpdate(index, imageFiles[index]) })))) : (react_1.default.createElement("p", null, "No product images available.")))))));
}
exports.default = UpdateProductComponent;
