"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const updateDiscountSlice_1 = require("@/redux/slices/updateDiscountSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const card_1 = require("@/components/ui/card.js");
const badge_1 = require("@/components/ui/badge.js");
const separator_1 = require("@/components/ui/separator.js");
const button_1 = require("../ui/button.js");
function UpdateDiscountComponent({ discount_id }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { discountDetail, loading, error, selectedImage } = (0, react_redux_1.useSelector)((state) => state.updateDiscount // Adjust if the slice is named differently
    );
    const handleStartDateChange = (e) => {
        const updatedStartDate = new Date(e.target.value); // Convert the string to a Date object
        if (!isNaN(updatedStartDate.getTime())) {
            dispatch((0, updateDiscountSlice_1.setDiscountStartDate)(String(updatedStartDate))); // Dispatch the Date object
        }
        else {
            console.error("Invalid date selected");
        }
    };
    const handleEndDateChange = (e) => {
        const updatedEndDate = new Date(e.target.value); // Convert the string to a Date object
        if (!isNaN(updatedEndDate.getTime())) {
            dispatch((0, updateDiscountSlice_1.setDiscountEndDate)(String(updatedEndDate))); // Dispatch the Date object
        }
        else {
            console.error("Invalid date selected");
        }
    };
    const handleValueSave = () => {
        if (discount_id) {
            dispatch((0, updateDiscountSlice_1.saveUpdatedValue)({
                discount_id,
                value: discountDetail.value,
                type: discountDetail.type,
            }))
                .unwrap()
                .then(() => {
                dispatch((0, successSlice_1.showSuccess)("Discount value successfully updated."));
            })
                .catch((error) => {
                dispatch((0, errorSlice_1.showError)(error));
            });
        }
    };
    const handleStartSave = () => {
        handleDateSave("start_date");
    };
    const handleEndSave = () => {
        handleDateSave("end_date");
    };
    const handleDateSave = (dateField) => {
        if (!discount_id) {
            dispatch((0, errorSlice_1.showError)("Invalid discount ID."));
            return;
        }
        const adjustedDate = new Date(discountDetail[dateField]);
        if (isNaN(adjustedDate.getTime())) {
            dispatch((0, errorSlice_1.showError)(`Invalid ${dateField.replace("_", " ")} value.`));
            return;
        }
        if (dateField === "start_date" && discountDetail.end_date) {
            const endDate = new Date(discountDetail.end_date);
            if (adjustedDate >= endDate) {
                dispatch((0, errorSlice_1.showError)("Start date must be smaller than end date."));
                return;
            }
        }
        if (dateField === "end_date" && discountDetail.start_date) {
            const startDate = new Date(discountDetail.start_date);
            if (adjustedDate <= startDate) {
                dispatch((0, errorSlice_1.showError)("End date must be larger than start date."));
                return;
            }
        }
        const formattedDate = new Date(Date.UTC(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate(), 0, 0, 0)).toISOString();
        dispatch((0, updateDiscountSlice_1.saveUpdatedStartDate)({
            discount_id,
            date: String(formattedDate),
            field: dateField,
        }))
            .unwrap()
            .then(() => {
            dispatch((0, successSlice_1.showSuccess)(`Discount ${dateField.replace("_", " ")} successfully updated.`));
        })
            .catch((error) => {
            dispatch((0, errorSlice_1.showError)(error));
        });
    };
    const handleImageSave = () => {
        if (!discount_id || !selectedImage) {
            dispatch((0, errorSlice_1.showError)("Please select an image to upload."));
            return;
        }
        const maxSizeInMB = 1;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(selectedImage.type)) {
            dispatch((0, errorSlice_1.showError)(`Invalid file type. Please upload a valid image (JPEG, PNG, or WEBP).`));
            return;
        }
        if (selectedImage.size > maxSizeInBytes) {
            dispatch((0, errorSlice_1.showError)(`File size exceeds ${maxSizeInMB}MB limit.`));
            return;
        }
        dispatch((0, updateDiscountSlice_1.saveUpdatedImage)({
            discount_id,
            image: selectedImage,
        }))
            .unwrap()
            .then(() => {
            dispatch((0, successSlice_1.showSuccess)("Image uploaded successfully."));
            dispatch((0, updateDiscountSlice_1.clearDiscountImage)());
        })
            .catch((error) => {
            dispatch((0, errorSlice_1.showError)(error));
        });
    };
    const handleToggleActiveStatus = () => {
        if (discountDetail.discount_id) {
            dispatch((0, updateDiscountSlice_1.toggleIsActive)({
                discount_id: discountDetail.discount_id,
                currentStatus: discountDetail.is_active,
            }))
                .unwrap()
                .then(() => {
                dispatch((0, successSlice_1.showSuccess)("Active status toggled successfully."));
            })
                .catch((error) => {
                dispatch((0, errorSlice_1.showError)(error));
            });
        }
        else {
            dispatch((0, errorSlice_1.showError)("Invalid discount ID."));
        }
    };
    (0, react_1.useEffect)(() => {
        if (discount_id) {
            dispatch((0, updateDiscountSlice_1.fetchDiscountDetails)(discount_id));
        }
    }, [dispatch, discount_id]);
    return (react_1.default.createElement("div", { className: "container mx-auto pb-8" },
        react_1.default.createElement("div", { className: "space-y-6" },
            react_1.default.createElement(card_1.Card, { className: "p-6" },
                react_1.default.createElement(card_1.CardHeader, null,
                    react_1.default.createElement(card_1.CardTitle, null, "Update Discount")),
                react_1.default.createElement(card_1.CardContent, null,
                    react_1.default.createElement("div", { className: "space-y-4" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Product Name:"),
                                " ",
                                discountDetail.inventory_name || "N/A")),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Type:"),
                                " ",
                                discountDetail.type || "N/A")),
                        discountDetail.type !== "BOGO" && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(separator_1.Separator, null),
                            react_1.default.createElement("div", { className: "flex flex-col justify-between items-start sm:flex-row gap-2" },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("label", { htmlFor: "value-input", className: "text-md font-medium mr-2" },
                                        react_1.default.createElement("strong", null, "Value:")),
                                    react_1.default.createElement("input", { id: "value-input", type: "number", value: discountDetail.value || "", onChange: (e) => {
                                            const updatedValue = parseFloat(e.target.value);
                                            dispatch((0, updateDiscountSlice_1.setDiscountValue)(updatedValue || null));
                                        }, className: "w-20 p-2 border border-gray-300 rounded-md", placeholder: "Enter value" })),
                                react_1.default.createElement(button_1.Button, { variant: "default", className: "ml-2", onClick: () => {
                                        handleValueSave();
                                    } }, loading ? "Saving..." : "Save")))),
                        discountDetail.type !== "BOGO" && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(separator_1.Separator, null),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("p", null,
                                    react_1.default.createElement("strong", null, "Minimum Purchase:"),
                                    " ",
                                    discountDetail.min_purchase !== null
                                        ? discountDetail.min_purchase
                                        : "N/A")),
                            react_1.default.createElement(separator_1.Separator, null),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("p", null,
                                    react_1.default.createElement("strong", null, "Maximum Discount:"),
                                    " ",
                                    discountDetail.max_discount !== null
                                        ? discountDetail.max_discount
                                        : "N/A")))),
                        discountDetail.type === "BOGO" && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(separator_1.Separator, null),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("p", null,
                                    react_1.default.createElement("strong", null, "Buy one get one:"),
                                    " ",
                                    discountDetail.bogo_product_name || "N/A")))),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Description:"),
                                " ",
                                discountDetail.description || "N/A")),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", { className: "flex justify-between items-center gap-4" },
                            react_1.default.createElement("p", { className: "flex items-center gap-2" },
                                react_1.default.createElement("strong", null, "Active Status:"),
                                " ",
                                discountDetail.is_active ? (react_1.default.createElement(badge_1.Badge, { variant: "default" }, "Active")) : (react_1.default.createElement(badge_1.Badge, { variant: "destructive" }, "Inactive"))),
                            react_1.default.createElement(button_1.Button, { variant: discountDetail.is_active ? "destructive" : "default", onClick: handleToggleActiveStatus }, discountDetail.is_active ? "Deactivate" : "Activate")),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", { className: "flex flex-col justify-between items-start sm:flex-row gap-2" },
                            react_1.default.createElement("div", { className: "flex items-center gap-2" },
                                react_1.default.createElement("label", { htmlFor: "start-date-input", className: "text-md font-medium" },
                                    react_1.default.createElement("strong", null, "Start Date:")),
                                react_1.default.createElement("input", { id: "start-date-input", type: "date", value: discountDetail.start_date
                                        ? new Date(discountDetail.start_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : "", onChange: handleStartDateChange, className: "p-2 border border-gray-300 rounded-md" })),
                            react_1.default.createElement(button_1.Button, { variant: "default", className: "ml-2", onClick: () => {
                                    handleStartSave();
                                } }, loading ? "Saving..." : "Save")),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", { className: "flex flex-col justify-between items-start sm:flex-row gap-2" },
                            react_1.default.createElement("div", { className: "flex items-center gap-2" },
                                react_1.default.createElement("label", { htmlFor: "end-date-input", className: "text-md font-medium" },
                                    react_1.default.createElement("strong", null, "End Date:")),
                                react_1.default.createElement("input", { id: "end-date-input", type: "date", value: discountDetail.end_date
                                        ? new Date(discountDetail.end_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : "", onChange: handleEndDateChange, className: "p-2 border border-gray-300 rounded-md" })),
                            react_1.default.createElement(button_1.Button, { variant: "default", className: "ml-2", onClick: () => {
                                    handleEndSave();
                                } }, loading ? "Saving..." : "Save")),
                        react_1.default.createElement(separator_1.Separator, null),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Image:")),
                            react_1.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 items-center gap-5" },
                                react_1.default.createElement("div", null, selectedImage ? (react_1.default.createElement("img", { src: URL.createObjectURL(selectedImage), alt: "Selected Discount", className: "w-48 h-48 object-contain border rounded-md mt-2" })) : discountDetail.image ? (react_1.default.createElement("img", { src: discountDetail.image, alt: "Discount", className: "w-48 h-48 object-contain border rounded-md mt-2" })) : ("No image available")),
                                react_1.default.createElement("div", { className: "flex flex-col gap-4" },
                                    react_1.default.createElement("input", { type: "file", accept: "image/*", id: "image-upload", onChange: (e) => {
                                            var _a;
                                            const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                            if (file) {
                                                dispatch((0, updateDiscountSlice_1.setDiscountImage)(file));
                                            }
                                        }, className: "file-input file-input-bordered file-input-primary w-full max-w-xs" }),
                                    react_1.default.createElement(button_1.Button, { variant: "default", onClick: () => handleImageSave() }, loading ? "Saving..." : "Upload Image"))))))))));
}
exports.default = UpdateDiscountComponent;
