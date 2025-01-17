"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
// Shared validation schema for products
exports.productSchema = zod_1.z.object({
    category_id: zod_1.z
        .union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => parseFloat(val.toString()))
        .refine((val) => val > 0, {
        message: "Category ID can't be empty",
    }),
    product_name: zod_1.z
        .string()
        .min(1, "Product name is required")
        .max(50, "Maximum product name is 50 characters"),
    description: zod_1.z
        .string()
        .min(1, "Product description is required")
        .max(200, "Maximum product description is 200 characters"),
    price: zod_1.z
        .union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => parseFloat(val.toString()))
        .refine((val) => val > 0, {
        message: "Price must be a positive number above 0",
    }),
});
// Partial schema for updates
exports.updateProductSchema = exports.productSchema.partial();
