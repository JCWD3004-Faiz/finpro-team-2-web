"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const storeAdminSlice_1 = require("@/redux/slices/storeAdminSlice.js");
const js_cookie_1 = require("js-cookie");
const searchField_1 = require("@/components/searchField.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const fa_1 = require("react-icons/fa");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const pagination_1 = require("@/components/pagination.js");
const selectFilter_1 = require("@/components/selectFilter.js");
function StoreOrders() {
    const router = (0, router_1.useRouter)();
    const store_id = js_cookie_1.default.get("storeId");
    const storeId = Number(store_id);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen, storeName, storeOrders, loading, orderStatus, currentPage, sortField, totalPages, sortOrder } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const toggleSidebar = () => { dispatch({ type: 'storeAdmin/toggleSidebar' }); };
    (0, react_1.useEffect)(() => {
        if (storeId) {
            dispatch((0, storeAdminSlice_1.fetchStoreByStoreId)(storeId));
            dispatch((0, storeAdminSlice_1.fetchStoreOrders)({
                storeId,
                page: currentPage,
                sortField,
                sortOrder,
                search: debouncedQuery,
                orderStatus
            }));
        }
    }, [dispatch, storeId, currentPage, sortField, sortOrder, debouncedQuery, orderStatus]);
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, storeAdminSlice_1.setCurrentPage)(page));
        }
    };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "desc" ? "asc" : "desc";
        if (sortField === field) {
            dispatch((0, storeAdminSlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, storeAdminSlice_1.setSortField)(field));
            dispatch((0, storeAdminSlice_1.setSortOrder)("desc"));
        }
        dispatch((0, storeAdminSlice_1.fetchStoreOrders)({ storeId, page: 1, sortField: field, sortOrder: updatedSortOrder, orderStatus }));
    };
    const handleRowClick = (url) => { router.push(url); };
    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING_PAYMENT': return 'bg-yellow-500';
            case 'AWAITING_CONFIRMATION': return 'bg-blue-500';
            case 'PROCESSING': return 'bg-orange-500';
            case 'SENT': return 'bg-green-500';
            case 'ORDER_CONFIRMED': return 'bg-emerald-600';
            case 'CANCELLED': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const formatStatus = (status) => { return status.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); };
    const handleOrderStatusChange = (status) => {
        dispatch((0, storeAdminSlice_1.setOrderStatus)(status));
        dispatch((0, storeAdminSlice_1.fetchStoreOrders)({
            storeId,
            page: 1,
            sortField,
            sortOrder,
            search: debouncedQuery,
            orderStatus: status
        }));
    };
    const orderStatusOptions = [
        { value: "PENDING_PAYMENT", label: "Pending Payment" },
        { value: "AWAITING_CONFIRMATION", label: "Awaiting Confirmation" },
        { value: "PROCESSING", label: "Processing" },
        { value: "SENT", label: "Sent" },
        { value: "ORDER_CONFIRMED", label: "Order Confirmed" },
        { value: "CANCELLED", label: "Cancelled" },
    ];
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6 relative` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" },
                storeName,
                " Orders"),
            react_1.default.createElement("div", { className: "my-5 flex w-full items-center" },
                react_1.default.createElement(searchField_1.default, { searchTerm: searchQuery, onSearchChange: setSearchQuery, className: "flex-grow", placeholder: "Search order recipients..." }),
                react_1.default.createElement("div", { className: "ml-5" },
                    react_1.default.createElement("label", { className: "mr-2 text-sm font-semibold" }, "Order Status:"),
                    react_1.default.createElement(selectFilter_1.default, { label: "All Statuses", value: orderStatus, options: orderStatusOptions, onChange: handleOrderStatusChange }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "overflow-x-auto" },
                    react_1.default.createElement("table", { className: "min-w-full bg-white text-sm shadow-2xl rounded-lg overflow-hidden" },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", { className: "bg-gray-800 text-white uppercase text-xs" },
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Order Recipient"),
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Destination Address"),
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Cart Price"),
                                react_1.default.createElement("th", { className: "p-4 text-left" }, "Shipping Price"),
                                react_1.default.createElement("th", { onClick: () => handleSort("created_at"), className: "p-4 cursor-pointer" },
                                    react_1.default.createElement("div", { className: 'flex items-center' },
                                        "Order Date",
                                        react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }),
                                        sortField === "created_at")),
                                react_1.default.createElement("th", { className: "py-4 px-6 text-center" }, "Status"))),
                        react_1.default.createElement("tbody", null, (storeOrders && Array.isArray(storeOrders) && storeOrders.length > 0) ?
                            (storeOrders.map((order, index) => {
                                const isPendingPayment = order.order_status === "PENDING_PAYMENT" && "CANCELLED";
                                return (react_1.default.createElement("tr", { key: order.order_id, onClick: (e) => {
                                        if (isPendingPayment) {
                                            e.preventDefault();
                                        }
                                        else {
                                            handleRowClick(`/admin-store/orders/payment/${order.payment_id}`);
                                        }
                                    }, className: `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} 
                  ${isPendingPayment ? "hover:bg-gray-100 cursor-default" : "hover:bg-gray-200 hover:cursor-pointer"} 
                  border-b transition-colors`, title: isPendingPayment ? "Payment unavailable" : "Click to view payment details" },
                                    react_1.default.createElement("td", { className: "p-4" }, order.username),
                                    react_1.default.createElement("td", { className: "p-4" },
                                        order.address,
                                        ", ",
                                        order.city_name),
                                    react_1.default.createElement("td", { className: "p-4" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(order.cart_price))),
                                    react_1.default.createElement("td", { className: "p-4" }, new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(order.shipping_price))),
                                    react_1.default.createElement("td", { className: "p-4" }, new Date(order.created_at).toLocaleDateString()),
                                    react_1.default.createElement("td", { className: "py-3 px-2 text-center whitespace-nowrap" },
                                        react_1.default.createElement("div", { className: `${getStatusColor(order.order_status)} font-bold py-2 rounded-full text-white` }, formatStatus(order.order_status)))));
                            })) : (react_1.default.createElement("tr", null,
                            react_1.default.createElement("td", { colSpan: 6, className: "text-center py-4" }, "No orders found")))))),
                react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })))));
}
exports.default = StoreOrders;
