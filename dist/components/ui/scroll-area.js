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
exports.ScrollBar = exports.ScrollArea = void 0;
const React = require("react");
const ScrollAreaPrimitive = require("@radix-ui/react-scroll-area");
const utils_1 = require("@/lib/utils.js");
const ScrollArea = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (React.createElement(ScrollAreaPrimitive.Root, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative overflow-hidden", className) }, props),
        React.createElement(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]" }, children),
        React.createElement(ScrollBar, null),
        React.createElement(ScrollAreaPrimitive.Corner, null)));
});
exports.ScrollArea = ScrollArea;
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef((_a, ref) => {
    var { className, orientation = "vertical" } = _a, props = __rest(_a, ["className", "orientation"]);
    return (React.createElement(ScrollAreaPrimitive.ScrollAreaScrollbar, Object.assign({ ref: ref, orientation: orientation, className: (0, utils_1.cn)("flex touch-none select-none transition-colors", orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-[1px]", className) }, props),
        React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })));
});
exports.ScrollBar = ScrollBar;
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
