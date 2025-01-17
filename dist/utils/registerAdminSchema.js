"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminSchema = void 0;
const zod_1 = require("zod");
exports.registerAdminSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password_hash: zod_1.z
        .string()
        .min(6, "Must be at least 6 characters"),
});
