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
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const modal_error_1 = require("@/components/modal-error.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const manageVoucherSlice_1 = require("@/redux/slices/manageVoucherSlice.js");
function CreateVoucher() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { loading } = (0, react_redux_1.useSelector)((state) => state.manageVoucher);
    const [voucherType, setVoucherType] = (0, react_1.useState)('');
    const [discountType, setDiscountType] = (0, react_1.useState)("PERCENTAGE");
    const [discountAmount, setDiscountAmount] = (0, react_1.useState)(0);
    const [expirePeriod, setExpirePeriod] = (0, react_1.useState)(0);
    const [minPurchase, setMinPurchase] = (0, react_1.useState)(undefined);
    const [maxDiscount, setMaxDiscount] = (0, react_1.useState)(undefined);
    const [description, setDescription] = (0, react_1.useState)('');
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const newVoucherData = {
                voucher_type: voucherType,
                discount_type: discountType,
                discount_amount: discountAmount,
                expire_period: expirePeriod,
                min_purchase: minPurchase,
                max_discount: maxDiscount,
                description,
            };
            try {
                yield dispatch((0, manageVoucherSlice_1.createVoucher)(newVoucherData)).unwrap();
                dispatch((0, successSlice_1.showSuccess)("Voucher successfully created"));
            }
            catch (error) {
                dispatch((0, errorSlice_1.showError)("Failed to create voucher"));
            }
        });
    }
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: () => dispatch({ type: 'superAdmin/toggleSidebar' }) }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = '/admin-super/vouchers';
            }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-center text-gray-900 mb-10 tracking-wide" }, "Create Voucher"),
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: "max-w-screen-md mx-auto bg-white p-6 rounded-md shadow-xl" },
                react_1.default.createElement("div", { className: 'grid md:grid-cols-2 gap-y-3' },
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "description", className: "block text-gray-700" }, "Voucher Description"),
                        react_1.default.createElement("textarea", { id: "description", className: "w-72 p-2 mt-2 border border-gray-300 rounded-md", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Enter description" })),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "discountAmount", className: "block text-gray-700" }, "Discount Amount"),
                        react_1.default.createElement("div", { className: "flex items-center" },
                            discountType === "NOMINAL" && react_1.default.createElement("span", { className: "text-gray-700 mr-2" }, "Rp."),
                            react_1.default.createElement("input", { type: "number", id: "discountAmount", className: "p-2 mt-2 border border-gray-300 rounded-md", value: discountAmount, onChange: (e) => setDiscountAmount(Number(e.target.value)), required: true }),
                            discountType === "PERCENTAGE" && react_1.default.createElement("span", { className: "text-gray-700 ml-2" }, "%"))),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "voucherType", className: "block text-gray-700" }, "Voucher Type"),
                        react_1.default.createElement("select", { id: "voucherType", className: "p-2 mt-2 border border-gray-300 rounded-md", value: voucherType, onChange: (e) => setVoucherType(e.target.value) },
                            react_1.default.createElement("option", { value: "" }, "Select voucher type"),
                            react_1.default.createElement("option", { value: "PRODUCT_DISCOUNT" }, "Product"),
                            react_1.default.createElement("option", { value: "CART_DISCOUNT" }, "Cart"),
                            react_1.default.createElement("option", { value: "SHIPPING_DISCOUNT" }, "Shipping"))),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "discountType", className: "block text-gray-700" }, "Discount Type"),
                        react_1.default.createElement("select", { id: "discountType", className: "p-2 mt-2 border border-gray-300 rounded-md", value: discountType, onChange: (e) => setDiscountType(e.target.value) },
                            react_1.default.createElement("option", { value: "PERCENTAGE" }, "Percentage"),
                            react_1.default.createElement("option", { value: "NOMINAL" }, "Nominal"))),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "minPurchase", className: "block text-gray-700" }, "Minimum Purchase (Optional)"),
                        "Rp. ",
                        react_1.default.createElement("input", { type: "number", id: "minPurchase", className: "w-64 p-2 mt-2 border border-gray-300 rounded-md", value: minPurchase || '', onChange: (e) => setMinPurchase(Number(e.target.value)) })),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "maxDiscount", className: "block text-gray-700" }, "Maximum Discount (Optional)"),
                        "Rp. ",
                        react_1.default.createElement("input", { type: "number", id: "maxDiscount", className: "w-64 p-2 mt-2 border border-gray-300 rounded-md", value: maxDiscount || '', onChange: (e) => setMaxDiscount(Number(e.target.value)) })),
                    react_1.default.createElement("div", { className: "md:ml-4 mt-4" },
                        react_1.default.createElement("label", { htmlFor: "expirePeriod", className: "block text-gray-700" }, "Expire Period (Months)"),
                        react_1.default.createElement("input", { type: "number", id: "expirePeriod", className: "p-2 mt-2 border border-gray-300 rounded-md", value: expirePeriod, onChange: (e) => setExpirePeriod(Number(e.target.value)), required: true }))),
                react_1.default.createElement("div", { className: "mt-8 flex justify-center" },
                    react_1.default.createElement("button", { type: "submit", className: "bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-20 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Submit"))))));
}
exports.default = CreateVoucher;
