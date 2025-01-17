"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarFallback = exports.AvatarImage = exports.Avatar = void 0;
const React = require("react");
const AvatarPrimitive = require("@radix-ui/react-avatar");
const utils_1 = require("@/lib/utils.js");
const Avatar = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (React.createElement(AvatarPrimitive.Root, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className) }, props)));
});
exports.Avatar = Avatar;
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (React.createElement(AvatarPrimitive.Image, Object.assign({ ref: ref, className: (0, utils_1.cn)("aspect-square h-full w-full", className) }, props)));
});
exports.AvatarImage = AvatarImage;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (React.createElement(AvatarPrimitive.Fallback, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted", className) }, props)));
});
exports.AvatarFallback = AvatarFallback;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
