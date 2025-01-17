"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = ProductImage;
const react_1 = require("react");
const image_1 = require("next/image");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
function ProductImage({ src, index, isLoading, onImageChange, onUpdateClick, }) {
    const [preview, setPreview] = (0, react_1.useState)(src);
    const [hasNewFile, setHasNewFile] = (0, react_1.useState)(false);
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview);
            setHasNewFile(true);
            onImageChange(file, index);
        }
    };
    return (React.createElement("div", { className: "space-y-2" },
        React.createElement("div", { className: "relative aspect-square rounded-lg overflow-hidden border bg-muted" },
            React.createElement(image_1.default, { src: preview, alt: `Product image ${index + 1}`, fill: true, className: "object-cover" }),
            React.createElement("label", { className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" },
                React.createElement(lucide_react_1.ImagePlus, { className: "h-8 w-8 text-white" }),
                React.createElement("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleFileChange }))),
        React.createElement(button_1.Button, { onClick: () => onUpdateClick(index), disabled: isLoading || !hasNewFile, className: "w-full" }, isLoading ? (React.createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" })) : ('Update Image'))));
}
