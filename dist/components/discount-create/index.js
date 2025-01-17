"use client";
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
const react_date_range_1 = require("react-date-range");
require("react-date-range/dist/styles.css");
require("react-date-range/dist/theme/default.css");
const date_fns_1 = require("date-fns");
const card_1 = require("@/components/ui/card.js");
const input_1 = require("@/components/ui/input.js");
const label_1 = require("@/components/ui/label.js");
const popover_1 = require("@/components/ui/popover.js");
const textarea_1 = require("@/components/ui/textarea.js");
const select_1 = require("@/components/ui/select.js");
const createDiscountSlice_1 = require("@/redux/slices/createDiscountSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const getDiscountSlice_1 = require("@/redux/slices/getDiscountSlice.js");
const button_1 = require("../ui/button.js");
function DiscountCreateComponent({ store_id }) {
    const [range, setRange] = (0, react_1.useState)({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const [preview, setPreview] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { type, inventory_id, value, min_purchase, max_discount, bogo_product_id, description, start_date, end_date, image, error, } = (0, react_redux_1.useSelector)((state) => state.createDiscount);
    const { inventoryNames, inventoryWithoutDiscounts, loading } = (0, react_redux_1.useSelector)((state) => state.getDiscount);
    const formatDateRange = (startDate, endDate) => `${(0, date_fns_1.format)(startDate, "yyyy-MM-dd")} - ${(0, date_fns_1.format)(endDate, "yyyy-MM-dd")}`;
    const handleDateChange = (date, type) => {
        if (date) {
            // Formats the date into ISO format
            if (type === "start") {
                dispatch((0, createDiscountSlice_1.setStartDate)(new Date(date).toISOString())); // Dispatch Redux action for start date
            }
            else {
                dispatch((0, createDiscountSlice_1.setEndDate)(new Date(date).toISOString())); // Dispatch Redux action for end date
            }
        }
    };
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            dispatch((0, createDiscountSlice_1.setImage)(file));
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // Set the image preview
            };
            reader.readAsDataURL(file);
        }
        else {
            setPreview(null);
            dispatch((0, createDiscountSlice_1.setImage)(null));
        }
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const maxSizeInMB = 1; // Maximum file size in MB
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (image && image.size > maxSizeInBytes) {
            dispatch((0, errorSlice_1.showError)(`Image exceeds the maximum size of ${maxSizeInMB}MB.`));
            return;
        }
        dispatch((0, createDiscountSlice_1.createDiscount)({
            type,
            inventory_id,
            value,
            min_purchase,
            max_discount,
            bogo_product_id,
            description,
            start_date,
            end_date,
            image,
        }))
            .unwrap()
            .then(() => {
            dispatch((0, successSlice_1.showSuccess)("Discount successfully created"));
            dispatch((0, createDiscountSlice_1.resetForm)());
        })
            .catch((error) => {
            console.error("Error:", error); // Logs the rejectWithValue output
            dispatch((0, errorSlice_1.showError)(error));
        });
    });
    (0, react_1.useEffect)(() => {
        if (store_id) {
            dispatch((0, getDiscountSlice_1.fetchInventoryNamesAdmin)(store_id));
            dispatch((0, getDiscountSlice_1.fetchInventoryWithoutDiscountsAdmin)(store_id));
        }
    }, [dispatch, store_id]);
    return (react_1.default.createElement("div", { className: "min-h-screen sm:px-6 lg:px-8" },
        react_1.default.createElement("div", { className: "mx-auto" },
            react_1.default.createElement("div", { className: "space-y-6" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", { className: "mt-2 text-sm text-gray-600" }, "Fill in the details below to add a new discount to the store.")),
                react_1.default.createElement("form", { onSubmit: handleSubmit, className: "space-y-8" },
                    react_1.default.createElement(card_1.Card, { className: "grid grid-cols-1 p-6 space-y-6" },
                        react_1.default.createElement("div", { className: "space-y-4" },
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(label_1.Label, { htmlFor: "discountType" }, "Discount Type"),
                                react_1.default.createElement(select_1.Select, { onValueChange: (value) => {
                                        dispatch((0, createDiscountSlice_1.resetBogo)());
                                        dispatch((0, createDiscountSlice_1.setDiscountType)(value));
                                    }, defaultValue: "" },
                                    react_1.default.createElement(select_1.SelectTrigger, { className: "w-full" },
                                        react_1.default.createElement(select_1.SelectValue, { placeholder: "Select Discount Type" })),
                                    react_1.default.createElement(select_1.SelectContent, null,
                                        react_1.default.createElement(select_1.SelectItem, { value: "BOGO" }, "Buy One Get One"),
                                        react_1.default.createElement(select_1.SelectItem, { value: "PERCENTAGE" }, "Percentage"),
                                        react_1.default.createElement(select_1.SelectItem, { value: "NOMINAL" }, "Nominal")))),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(label_1.Label, { htmlFor: "product-name" }, "Product Name"),
                                react_1.default.createElement(select_1.Select, { onValueChange: (value) => {
                                        dispatch((0, createDiscountSlice_1.resetMinMax)());
                                        if (value === "whole-store") {
                                            dispatch((0, createDiscountSlice_1.setInventoryId)(null)); // Set inventory_id to null for "Whole Store"
                                            dispatch((0, createDiscountSlice_1.setBogoProductId)(null));
                                        }
                                        else {
                                            const selectedInventory = inventoryWithoutDiscounts.find((item) => item.inventory_id.toString() === value);
                                            if (selectedInventory) {
                                                dispatch((0, createDiscountSlice_1.setInventoryId)(parseInt(value))); // Set inventory_id
                                                if (type === "BOGO") {
                                                    dispatch((0, createDiscountSlice_1.setBogoProductId)(selectedInventory.product_id));
                                                }
                                            }
                                        }
                                    } },
                                    react_1.default.createElement(select_1.SelectTrigger, { id: "product-name", className: "mt-1" },
                                        react_1.default.createElement(select_1.SelectValue, { placeholder: "Select a product" })),
                                    react_1.default.createElement(select_1.SelectContent, null,
                                        react_1.default.createElement(select_1.SelectItem, { value: "whole-store", key: "whole-store" }, "Whole Store"),
                                        inventoryWithoutDiscounts.map((item) => (react_1.default.createElement(select_1.SelectItem, { key: item.inventory_id, value: item.inventory_id.toString() }, item.product_name)))))),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(label_1.Label, { htmlFor: "discount-value" }, "Value"),
                                react_1.default.createElement(input_1.Input, { type: "number", id: "discount-value", placeholder: "Enter value", value: value || "", disabled: type === "BOGO", onChange: (e) => {
                                        const inputValue = parseFloat(e.target.value);
                                        if (inputValue >= 0 || isNaN(inputValue)) {
                                            dispatch((0, createDiscountSlice_1.setValue)(inputValue));
                                        }
                                        else {
                                            dispatch((0, createDiscountSlice_1.setValue)(0));
                                        }
                                    }, className: "mt-1" })),
                            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(label_1.Label, { htmlFor: "min-purchase" }, "Minimum Purchase"),
                                    react_1.default.createElement("h3", { className: "text-xs text-gray-500" }, "Only for whole store"),
                                    react_1.default.createElement(input_1.Input, { type: "number", id: "min-purchase", placeholder: "Enter minimum purchase", value: min_purchase || "", disabled: type === "BOGO" || !!inventory_id, onChange: (e) => {
                                            const inputValue = parseFloat(e.target.value);
                                            if (inputValue >= 0 || isNaN(inputValue)) {
                                                dispatch((0, createDiscountSlice_1.setMinPurchase)(inputValue));
                                            }
                                            else {
                                                dispatch((0, createDiscountSlice_1.setMinPurchase)(0));
                                            }
                                        }, className: "mt-1" })),
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement(label_1.Label, { htmlFor: "max-discount" }, "Maximum Discount"),
                                    react_1.default.createElement("h3", { className: "text-xs text-gray-500" }, "Only for whole store"),
                                    react_1.default.createElement(input_1.Input, { type: "number", id: "max-discount", placeholder: "Enter maximum discount", value: max_discount || "", disabled: type === "BOGO" || !!inventory_id, onChange: (e) => {
                                            const inputValue = parseFloat(e.target.value);
                                            if (inputValue >= 0 || isNaN(inputValue)) {
                                                dispatch((0, createDiscountSlice_1.setMaxDiscount)(inputValue));
                                            }
                                            else {
                                                // Reset to a positive value or an empty field
                                                dispatch((0, createDiscountSlice_1.setMaxDiscount)(0)); // Optional: set to default positive value
                                            }
                                        }, className: "mt-1" }))),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(label_1.Label, { htmlFor: "discount-description" }, "Description"),
                                react_1.default.createElement(textarea_1.Textarea, { id: "discount-description", placeholder: "Enter discount description", value: description || "", onChange: (e) => dispatch((0, createDiscountSlice_1.setDescription)(e.target.value)), className: "mt-1" })),
                            react_1.default.createElement("div", { className: "sm:w-1/2 lg:w-1/3" },
                                react_1.default.createElement(label_1.Label, null, "Discount Date Range"),
                                react_1.default.createElement(popover_1.Popover, null,
                                    react_1.default.createElement(popover_1.PopoverTrigger, { asChild: true },
                                        react_1.default.createElement(button_1.Button, { variant: "outline", className: "w-full text-left" }, formatDateRange(range.startDate, range.endDate))),
                                    react_1.default.createElement(popover_1.PopoverContent, { className: "w-auto p-0" },
                                        react_1.default.createElement(react_date_range_1.DateRange, { ranges: [range], onChange: (ranges) => {
                                                const startDate = ranges.selection.startDate || new Date();
                                                const endDate = ranges.selection.endDate || new Date();
                                                setRange({
                                                    startDate,
                                                    endDate,
                                                    key: "selection",
                                                });
                                                handleDateChange(startDate, "start");
                                                handleDateChange(endDate, "end");
                                            } })))),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(label_1.Label, null, "Upload Discount Image"),
                                react_1.default.createElement("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "block sm:w-1/2 lg:w-1/3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" })),
                            preview && (react_1.default.createElement("div", { className: "mt-4" },
                                react_1.default.createElement(label_1.Label, null, "Preview"),
                                react_1.default.createElement("img", { src: preview, alt: "Uploaded Preview", className: "w-48 h-48 object-contain border border-gray-300 rounded-md" })))),
                        react_1.default.createElement("div", { className: "pt-4" },
                            react_1.default.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: loading }, loading ? "Adding Discount..." : "Add Discount"))))))));
}
exports.default = DiscountCreateComponent;
