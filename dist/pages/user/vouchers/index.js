"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserSideBar_1 = require("@/components/UserSideBar.js");
const lucide_react_1 = require("lucide-react");
const card_1 = require("@/components/ui/card.js");
const date_fns_1 = require("date-fns");
const useAuth_1 = require("@/hooks/useAuth.js");
const react_redux_1 = require("react-redux");
const userPaymentSlice_1 = require("@/redux/slices/userPaymentSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
function UserVouchers() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const { vouchers, loading, error } = (0, react_redux_1.useSelector)((state) => state.userPayment);
    (0, react_1.useEffect)(() => {
        if (user_id) {
            dispatch((0, userPaymentSlice_1.fetchUserVouchers)(user_id));
        }
    }, [dispatch, user_id]);
    const voucherTypeMap = { "PRODUCT_DISCOUNT": "Product", "CART_DISCOUNT": "Cart", "SHIPPING_DISCOUNT": "Shipping" };
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white mt-[11vh] p-8" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                react_1.default.createElement(UserSideBar_1.UserSidebar, null),
                react_1.default.createElement("main", { className: "flex-1" },
                    react_1.default.createElement("div", { className: "mb-7" },
                        react_1.default.createElement("h1", { className: "text-2xl text-gray-800 font-semibold" }, "Vouchers"),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, "View your available vouchers")),
                    loading ? (react_1.default.createElement(LoadingVignette_1.default, null)) : error ? (react_1.default.createElement("p", null, error)) : (react_1.default.createElement("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3" }, vouchers.length === 0 ? (react_1.default.createElement("div", { className: "text-center py-12" },
                        react_1.default.createElement(lucide_react_1.Gift, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
                        react_1.default.createElement("h3", { className: "text-lg font-medium text-gray-800" }, "No Active Vouchers"),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, "Check back later for new vouchers!"))) : (vouchers.map((voucher, index) => (react_1.default.createElement(card_1.Card, { key: voucher.user_voucher_id, className: "p-6 hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-left-4", style: { animationDelay: `${index * 100}ms` } },
                        react_1.default.createElement("div", { className: "space-y-4" },
                            react_1.default.createElement("div", { className: "flex justify-between items-start" },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("p", { className: "text-2xl font-bold font-mono" }, voucher.redeem_code),
                                    react_1.default.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, voucherTypeMap[voucher.voucher_type])),
                                react_1.default.createElement("div", { className: "px-3 py-1 bg-primary/10 rounded-full text-primary text-sm" }, voucher.discount_type === 'PERCENTAGE'
                                    ? `${voucher.discount_amount}% OFF`
                                    : `${new Intl.NumberFormat("id-ID", { style: "currency",
                                        currency: "IDR", minimumFractionDigits: 0 }).format(Number(voucher.discount_amount))} OFF`)),
                            react_1.default.createElement("p", { className: "text-sm text-foreground/80" }, voucher.description),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                voucher.min_purchase && (react_1.default.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    react_1.default.createElement(lucide_react_1.ShoppingBasket, { className: "h-4 w-4 text-muted-foreground" }),
                                    react_1.default.createElement("span", null,
                                        "Min. spend: Rp. ",
                                        voucher.min_purchase))),
                                voucher.max_discount && (react_1.default.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    react_1.default.createElement(lucide_react_1.ShoppingBasket, { className: "h-4 w-4 text-muted-foreground" }),
                                    react_1.default.createElement("span", null,
                                        "Max. discount: $",
                                        voucher.max_discount))),
                                react_1.default.createElement("div", { className: "flex items-center gap-2 text-sm" },
                                    react_1.default.createElement(lucide_react_1.Clock, { className: "h-4 w-4 text-muted-foreground" }),
                                    react_1.default.createElement("span", null,
                                        "Expires ",
                                        (0, date_fns_1.formatDistanceToNow)(new Date(voucher.expiration_date), { addSuffix: true }))))))))))))))));
}
exports.default = UserVouchers;
