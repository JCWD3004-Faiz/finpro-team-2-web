"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckAccess = exports.storeId = void 0;
const router_1 = require("next/router");
const useAuth_1 = require("../hooks/useAuth.js");
const js_cookie_1 = require("js-cookie");
exports.storeId = js_cookie_1.default.get("storeId");
const useCheckAccess = () => {
    var _a;
    const user = (0, useAuth_1.default)();
    const router = (0, router_1.useRouter)();
    const role = (_a = user === null || user === void 0 ? void 0 : user.role) !== null && _a !== void 0 ? _a : '';
    const is_verified = user === null || user === void 0 ? void 0 : user.is_verified;
    const checkAccess = () => {
        if ((role === "SUPER_ADMIN" && !router.pathname.startsWith("/admin-super")) ||
            (role === "STORE_ADMIN" && !router.pathname.startsWith("/admin-store"))) {
            return true;
        }
        if ((role === "STORE_ADMIN" && is_verified === false) && (router.pathname.startsWith("/admin-store/"))) {
            return true;
        }
        if ((role === "USER" || !role) && (router.pathname.startsWith("/admin"))) {
            return true;
        }
        if (!user && router.pathname.startsWith("/user")) {
            return true;
        }
        return false;
    };
    return checkAccess();
};
exports.useCheckAccess = useCheckAccess;
