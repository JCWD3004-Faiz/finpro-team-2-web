"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const useAuth_1 = require("@/hooks/useAuth.js");
const select_1 = require("@/components/ui/select.js");
const card_1 = require("@/components/ui/card.js");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
const gr_1 = require("react-icons/gr");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const checkoutSlice_1 = require("@/redux/slices/checkoutSlice.js");
const modal_error_1 = require("@/components/modal-error.js");
const modal_success_1 = require("@/components/modal-success.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
function OrderOptions() {
    const router = (0, router_1.useRouter)();
    const params = (0, navigation_1.useParams)();
    const order_id = Number(params === null || params === void 0 ? void 0 : params.order_id);
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { orderDetails, selectedAddress, selectedShipping, newShippingPrice, loading, shippingVouchers } = (0, react_redux_1.useSelector)((state) => state.checkout);
    const { addresses } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const [isVoucherSelectVisible, setIsVoucherSelectVisible] = (0, react_1.useState)(false);
    const [selectedVoucher, setSelectedVoucher] = (0, react_1.useState)(undefined);
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const shippingMethods = [
        { label: 'JNE', value: 'jne' },
        { label: 'POS', value: 'pos' },
        { label: 'TIKI', value: 'tiki' }
    ];
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (user_id && order_id) {
            dispatch((0, checkoutSlice_1.fetchOrderDetails)({ user_id, order_id }));
            dispatch((0, checkoutSlice_1.fetchShippingVouchers)(user_id));
        }
    }, [user_id, order_id, dispatch]);
    (0, react_1.useEffect)(() => {
        if (selectedAddress) {
            dispatch((0, checkoutSlice_1.updateAddress)({ user_id, order_id, address_id: selectedAddress })).unwrap()
                .catch((error) => {
                dispatch((0, errorSlice_1.showError)(error));
            });
        }
    }, [selectedAddress, dispatch]);
    (0, react_1.useEffect)(() => {
        if (selectedShipping) {
            dispatch((0, checkoutSlice_1.updateShippingMethod)({ user_id, order_id, shipping_method: selectedShipping }));
        }
    }, [selectedShipping, dispatch]);
    const formatStatus = (status) => {
        return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    };
    const handleVoucherApply = () => {
        if (selectedVoucher) {
            dispatch((0, checkoutSlice_1.redeemShippingVoucher)({ user_id, order_id, redeem_code: selectedVoucher }));
            dispatch((0, successSlice_1.showSuccess)(`Voucher ${selectedVoucher} applied!`));
        }
    };
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white py-8 mt-[11vh]" },
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); }, successMessage: successMessage }),
        mounted && (react_1.default.createElement("div", { className: "container mx-auto max-w-3xl px-4" },
            react_1.default.createElement("div", { className: "mb-8" },
                react_1.default.createElement("h1", { className: "text-4xl font-bold text-gray-900" }, "Checkout Order"),
                react_1.default.createElement("p", { className: "mt-2 text-gray-600" }, "Please confirm your shipping details before proceeding to payment")),
            react_1.default.createElement("div", { className: "space-y-6" },
                react_1.default.createElement(card_1.Card, { className: "border-2" },
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                            react_1.default.createElement(lucide_react_1.Store, { className: "h-5 w-5" }),
                            "Order Details")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "space-y-2" },
                            react_1.default.createElement("p", { className: "font-medium" }, (orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.store_name) ? (orderDetails.store_name) : (react_1.default.createElement("div", { className: "w-[200px] h-[20px] bg-gray-200 rounded-md" }))),
                            react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, (orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.order_status) ? (`Order Status: ${formatStatus(orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.order_status).toUpperCase()}`) : (react_1.default.createElement("div", { className: "w-[200px] h-[20px] bg-gray-200 rounded-md" }))),
                            react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, (orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.created_at) ? (`Order Date: ${new Date(orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`) : (react_1.default.createElement("div", { className: "w-[200px] h-[20px] bg-gray-200 rounded-md" })))))),
                react_1.default.createElement(card_1.Card, { className: 'border-2' },
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                            react_1.default.createElement(gr_1.GrLocation, { className: "h-5 w-5" }),
                            "Shipping Address"),
                        react_1.default.createElement(card_1.CardDescription, null, "Select where you want your groceries delivered")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement(select_1.Select, { value: selectedAddress, onValueChange: (value) => dispatch((0, checkoutSlice_1.setSelectedAddress)(value)) },
                            react_1.default.createElement(select_1.SelectTrigger, { className: "w-full" },
                                react_1.default.createElement(select_1.SelectValue, { placeholder: "Select delivery address" })),
                            react_1.default.createElement(select_1.SelectContent, null, addresses.map((address) => (react_1.default.createElement(select_1.SelectItem, { key: address.address_id, value: address.address_id }, `${address.address}, ${address.city_name}`))))))),
                react_1.default.createElement(card_1.Card, { className: 'border-2' },
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                            react_1.default.createElement(lucide_react_1.Truck, { className: "h-5 w-5" }),
                            "Shipping Method"),
                        react_1.default.createElement(card_1.CardDescription, null, "Choose your preferred delivery option")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement(select_1.Select, { value: selectedShipping, onValueChange: (value) => dispatch((0, checkoutSlice_1.setSelectedShipping)(value)) },
                            react_1.default.createElement(select_1.SelectTrigger, { className: "w-full" },
                                react_1.default.createElement(select_1.SelectValue, { placeholder: "Select shipping method" })),
                            react_1.default.createElement(select_1.SelectContent, null, shippingMethods.map((method) => (react_1.default.createElement(select_1.SelectItem, { key: method.value, value: method.value },
                                react_1.default.createElement("div", { className: "flex items-center justify-between w-full" },
                                    react_1.default.createElement("span", null, method.label))))))))),
                react_1.default.createElement(card_1.Card, { className: "border-2" },
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "space-y-4" },
                            react_1.default.createElement("div", { className: 'font-semibold text-xl py-4 flex justify-between mt-2' },
                                react_1.default.createElement("p", { className: "" }, "Shipping Price:"),
                                react_1.default.createElement("p", null, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(newShippingPrice)))),
                            react_1.default.createElement("div", { className: "flex items-center" },
                                react_1.default.createElement(button_1.Button, { size: "lg", onClick: () => {
                                        setIsVoucherSelectVisible(!isVoucherSelectVisible);
                                        if (isVoucherSelectVisible && selectedVoucher) {
                                            handleVoucherApply();
                                        }
                                    }, disabled: !selectedAddress || !selectedShipping }, isVoucherSelectVisible ? 'Apply Voucher' : 'Apply Shipping Voucher'),
                                isVoucherSelectVisible && (react_1.default.createElement(select_1.Select, { value: selectedVoucher, onValueChange: (value) => setSelectedVoucher(value) },
                                    react_1.default.createElement(select_1.SelectTrigger, { className: "w-full ml-4 px-4" },
                                        react_1.default.createElement(select_1.SelectValue, { placeholder: "Select a shipping voucher" })),
                                    react_1.default.createElement(select_1.SelectContent, null, shippingVouchers.map((voucher) => (react_1.default.createElement(select_1.SelectItem, { key: voucher.redeem_code, value: voucher.redeem_code },
                                        voucher.redeem_code,
                                        react_1.default.createElement("label", { className: "ml-4 text-muted-foreground" }, voucher.discount_type === 'PERCENTAGE' ? (`${voucher.discount_amount}% OFF`) : (`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(voucher.discount_amount)} OFF`)))))))))))),
                react_1.default.createElement("div", { className: "flex justify-end" },
                    react_1.default.createElement(button_1.Button, { size: "lg", disabled: !selectedAddress || !selectedShipping, onClick: () => { router.push(`/checkout/form/${order_id}`); } }, "Continue to Payment")))))));
}
exports.default = OrderOptions;
