"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function StockJournalModal({ isOpen, onClose, inventories, onConfirm, }) {
    const [stockChange, setStockChange] = (0, react_1.useState)(0);
    const [changeCategory, setChangeCategory] = (0, react_1.useState)("STOCK_CHANGE");
    const handleSubmit = () => {
        const inventoryIds = inventories.map((item) => item.inventory_id);
        onConfirm({
            inventoryIds,
            stockChange: Number(stockChange),
            changeCategory,
        });
        onClose();
    };
    if (!isOpen)
        return null;
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { className: "bg-white w-96 p-6 rounded-lg shadow-lg" },
            react_1.default.createElement("h2", { className: "text-lg font-semibold mb-4" },
                "Update Stock for:",
                react_1.default.createElement("ul", { className: "mt-2 text-sm text-gray-700 list-disc pl-5" }, inventories.map((item) => (react_1.default.createElement("li", { key: item.inventory_id }, item.product_name))))),
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Stock Change"),
                react_1.default.createElement("input", { type: "number", className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: stockChange, onChange: (e) => {
                        const value = e.target.value;
                        if (value === "" || value === "-") {
                            setStockChange(value);
                        }
                        else if (!isNaN(Number(value))) {
                            setStockChange(Number(value));
                        }
                    } })),
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Change Category"),
                react_1.default.createElement("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md", value: changeCategory, onChange: (e) => setChangeCategory(e.target.value) },
                    react_1.default.createElement("option", { value: "SOLD" }, "Sold"),
                    react_1.default.createElement("option", { value: "STOCK_CHANGE" }, "Stock Change"),
                    react_1.default.createElement("option", { value: "OTHERS" }, "Others"))),
            react_1.default.createElement("div", { className: "flex justify-end" },
                react_1.default.createElement("button", { className: "bg-gray-300 px-4 py-2 rounded-md mr-2", onClick: onClose }, "Cancel"),
                react_1.default.createElement("button", { className: "bg-gray-800 text-white px-4 py-2 rounded-md", onClick: handleSubmit }, "Confirm")))));
}
exports.default = StockJournalModal;
