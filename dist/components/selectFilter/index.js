"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const select_1 = require("@/components/ui/select.js"); // Import shadcn components
const SelectFilter = ({ label, value, options, onChange }) => {
    // This is to clear the selection without causing errors
    const handleClearSelection = () => {
        onChange(""); // or use `null` if you prefer to use null to represent empty state
    };
    return (react_1.default.createElement("div", { className: "mb-4" },
        react_1.default.createElement(select_1.Select, { value: value, onValueChange: (newValue) => {
                // Only call onChange if it's not the "clear" selection
                if (newValue === "none") {
                    handleClearSelection(); // Clear the selection
                }
                else {
                    onChange(newValue); // Proceed with normal selection
                }
            } },
            react_1.default.createElement(select_1.SelectTrigger, { className: "bg-white p-2 border border-gray-300 rounded-md text-gray-800" },
                react_1.default.createElement(select_1.SelectValue, { placeholder: label })),
            react_1.default.createElement(select_1.SelectContent, null,
                react_1.default.createElement(select_1.SelectItem, { value: "none" },
                    label,
                    " "),
                options.map((option) => (react_1.default.createElement(select_1.SelectItem, { key: option.value, value: option.value }, option.label)))))));
};
exports.default = SelectFilter;
