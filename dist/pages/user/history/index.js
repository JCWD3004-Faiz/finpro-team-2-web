"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserSideBar_1 = require("@/components/UserSideBar.js");
const transaction_card_1 = require("@/components/transaction-card.js");
const react_redux_1 = require("react-redux");
const useAuth_1 = require("@/hooks/useAuth.js");
const userPaymentSlice_1 = require("@/redux/slices/userPaymentSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const pagination_1 = require("@/components/pagination.js");
const selectFilter_1 = require("@/components/selectFilter.js");
const md_1 = require("react-icons/md");
function TransactionHistory() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const { payments, loading, error, currentPage, totalPages, status } = (0, react_redux_1.useSelector)((state) => state.userPayment);
    const [page, setPage] = (0, react_1.useState)(currentPage || 1);
    const limit = 5;
    (0, react_1.useEffect)(() => {
        if (user_id) {
            dispatch((0, userPaymentSlice_1.fetchPaymentHistory)({ user_id, page, limit, status }));
        }
    }, [dispatch, user_id, page, limit, status]);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    const handleStatusChange = (newStatus) => {
        dispatch((0, userPaymentSlice_1.setStatus)(newStatus));
        dispatch((0, userPaymentSlice_1.fetchPaymentHistory)({ user_id, page, limit, status: newStatus }));
    };
    const statusOptions = [
        { value: 'ORDER_CONFIRMED', label: 'Confirmed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ];
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white mt-[11vh] p-8" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                react_1.default.createElement(UserSideBar_1.UserSidebar, null),
                react_1.default.createElement("main", { className: "flex-1" },
                    react_1.default.createElement("div", { className: "mb-6" },
                        react_1.default.createElement("div", { className: "flex justify-between" },
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("h1", { className: "text-2xl text-gray-800 font-semibold" }, "Transaction History"),
                                react_1.default.createElement("p", { className: "text-muted-foreground mb-6" }, "Showing your recent transactions")),
                            payments.length > 0 && (react_1.default.createElement("div", null,
                                react_1.default.createElement(selectFilter_1.default, { label: "All Statuses", value: status || 'none', options: statusOptions, onChange: handleStatusChange })))),
                        loading ? (react_1.default.createElement("div", null,
                            react_1.default.createElement(LoadingVignette_1.default, null))) : error ? (react_1.default.createElement("div", { className: "text-center py-12" },
                            react_1.default.createElement("p", { className: "text-gray-500" },
                                "Error: ",
                                error))) : payments.length === 0 ? (react_1.default.createElement("div", { className: "text-center py-12" },
                            react_1.default.createElement(md_1.MdOutlinePayment, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
                            react_1.default.createElement("h3", { className: "text-lg font-medium text-gray-800" }, "No Transaction History"),
                            react_1.default.createElement("p", { className: "text-muted-foreground" }, "Check back later for completed orders!"))) : (react_1.default.createElement("div", { className: "space-y-4" }, payments.map((transaction) => (react_1.default.createElement(transaction_card_1.TransactionCard, { key: transaction.transaction_id, transaction: transaction })))))),
                    payments.length > 0 && (react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })))))));
}
exports.default = TransactionHistory;
