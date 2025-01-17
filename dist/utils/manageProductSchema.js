"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductData = exports.manageProductSchema = void 0;
const zod_1 = require("zod");
exports.manageProductSchema = zod_1.z.object({
    category_id: zod_1.z
        .number()
        .min(1, "Category ID is required and must be a positive number."),
    product_name: zod_1.z
        .string()
        .min(1, "Product name is required.")
        .max(50, "Product name must not exceed 50 characters."),
    description: zod_1.z
        .string()
        .min(1, "Product description is required.")
        .max(200, "Product description must not exceed 200 characters."),
    price: zod_1.z.number().positive("Price must be a positive number."),
    images: zod_1.z
        .array(zod_1.z.instanceof(File))
        .min(1, "At least one product image is required.")
        .max(4, "You can upload up to 4 images only."),
});
const validateProductData = (data) => {
    try {
        return exports.manageProductSchema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return error.errors.map((err) => err.message);
        }
        throw error;
    }
};
exports.validateProductData = validateProductData;
