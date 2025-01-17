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
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const modal_success_1 = require("@/components/modal-success.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const superAdminSlice_1 = require("@/redux/slices/superAdminSlice.js");
const manageInventorySlice_1 = require("@/redux/slices/manageInventorySlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const pagination_1 = require("@/components/pagination.js");
const searchField_1 = require("@/components/searchField.js");
const manageVoucherSlice_1 = require("@/redux/slices/manageVoucherSlice.js");
const fa_1 = require("react-icons/fa");
const fa6_1 = require("react-icons/fa6");
const md_1 = require("react-icons/md");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const selectFilter_1 = require("@/components/selectFilter.js");
const go_1 = require("react-icons/go");
const gift_voucher_1 = require("@/components/gift-voucher.js");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
const ManageVouchers = () => {
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen, currentPage } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { vouchers, sortField, totalPages, voucherType, discountType, loading } = (0, react_redux_1.useSelector)((state) => state.manageVoucher);
    const { sortOrder } = (0, react_redux_1.useSelector)((state) => state.manageInventory);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const [editingVoucher, setEditingVoucher] = (0, react_1.useState)(null);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false); // State to control modal visibility
    const [selectedVoucher, setSelectedVoucher] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        dispatch((0, manageVoucherSlice_1.fetchVouchers)({ page: 1, sortField, sortOrder, search: debouncedQuery, voucherType, discountType }));
    }, [currentPage, sortField, sortOrder, debouncedQuery, dispatch]);
    const handleDeleteVoucher = (voucher_id) => {
        if (window.confirm('Are you sure you want to delete this voucher?')) {
            dispatch((0, manageVoucherSlice_1.deleteVoucher)(voucher_id));
        }
    };
    const handlePageChange = (page) => { if (page > 0 && page <= totalPages) {
        dispatch((0, superAdminSlice_1.setCurrentPage)(page));
    } };
    const handleSort = (field) => {
        const updatedSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        if (sortField === field) {
            dispatch((0, manageInventorySlice_1.setSortOrder)(updatedSortOrder));
        }
        else {
            dispatch((0, manageVoucherSlice_1.setSortField)(field));
            dispatch((0, manageInventorySlice_1.setSortOrder)("asc"));
        }
        dispatch((0, manageVoucherSlice_1.fetchVouchers)({ page: 1, sortField: field, sortOrder: updatedSortOrder, search: debouncedQuery, voucherType, discountType }));
    };
    const handleVoucherChange = (voucher) => {
        dispatch((0, manageVoucherSlice_1.setVoucherType)(voucher));
        dispatch((0, manageVoucherSlice_1.fetchVouchers)({ page: currentPage, sortField, sortOrder, search: debouncedQuery, voucherType: voucher, discountType }));
    };
    const voucherTypeOptions = [{ value: "PRODUCT_DISCOUNT", label: "Product" }, { value: "CART_DISCOUNT", label: "Cart" }, { value: "SHIPPING_DISCOUNT", label: "Shipping" }];
    const voucherTypeMap = { "PRODUCT_DISCOUNT": "Product", "CART_DISCOUNT": "Cart", "SHIPPING_DISCOUNT": "Shipping" };
    const handleDiscountChange = (discount) => {
        dispatch((0, manageVoucherSlice_1.setDiscountType)(discount));
        dispatch((0, manageVoucherSlice_1.fetchVouchers)({ page: currentPage, sortField, sortOrder, search: debouncedQuery, voucherType, discountType: discount }));
    };
    const discountTypeOptions = [{ value: "PERCENTAGE", label: "Percentage" }, { value: "NOMINAL", label: "Nominal" }];
    const formatDiscountType = (value) => { return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()); };
    const handleEditClick = (voucher) => { setEditingVoucher(Object.assign({}, voucher)); };
    const handleSaveClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (editingVoucher) {
            const voucherData = Object.assign(Object.assign({}, editingVoucher), { discount_amount: parseFloat(editingVoucher.discount_amount), min_purchase: editingVoucher.min_purchase ? parseFloat(editingVoucher.min_purchase) : null, max_discount: editingVoucher.max_discount ? parseFloat(editingVoucher.max_discount) : null, expire_period: parseFloat(editingVoucher.expire_period) });
            try {
                yield dispatch((0, manageVoucherSlice_1.editVoucher)(voucherData));
                setEditingVoucher(null);
                dispatch((0, successSlice_1.showSuccess)("Voucher successfully edited"));
            }
            catch (error) {
                console.error('Error while saving voucher:', error);
            }
        }
    });
    const handleCancelEdit = () => { setEditingVoucher(null); };
    const editedRowRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (editedRowRef.current && !editedRowRef.current.contains(event.target)) {
                handleCancelEdit();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside); };
    }, [editingVoucher]);
    const handleInputChange = (e, field) => {
        const { value } = e.target;
        const parsedValue = field === 'discount_amount' || field === 'min_purchase' || field === 'max_discount' || field === 'expire_period'
            ? parseFloat(value) : value;
        setEditingVoucher(Object.assign(Object.assign({}, editingVoucher), { [field]: parsedValue }));
    };
    const sortedVouchers = vouchers.filter(voucher => [9, 11].includes(voucher.voucher_id));
    const otherVouchers = vouchers.filter(voucher => ![9, 11].includes(voucher.voucher_id));
    const finalVouchers = [
        ...sortedVouchers.filter(voucher => voucher.voucher_id === 9),
        ...sortedVouchers.filter(voucher => voucher.voucher_id === 11),
        ...otherVouchers
    ];
    const handleGiftButtonClick = (voucher) => {
        setSelectedVoucher(voucher);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleGiftVoucher = (email) => __awaiter(void 0, void 0, void 0, function* () {
        if (email) {
            try {
                yield dispatch((0, manageVoucherSlice_1.giftVoucher)({ voucher_id: selectedVoucher.voucher_id, email }));
                dispatch((0, successSlice_1.showSuccess)(`Voucher successfully gifted to ${email}`));
                handleCloseModal();
            }
            catch (error) {
                dispatch((0, successSlice_1.showSuccess)("Failed to gift voucher"));
            }
        }
    });
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: () => dispatch({ type: 'superAdmin/toggleSidebar' }) }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => { dispatch((0, successSlice_1.hideSuccess)()); window.location.reload(); }, successMessage: successMessage }),
        react_1.default.createElement(gift_voucher_1.default, { isOpen: isModalOpen, onClose: handleCloseModal, onGiftVoucher: handleGiftVoucher }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-10 tracking-wide" }, "Voucher Management"),
            react_1.default.createElement("div", { className: "ml-1 mb-2" },
                react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push({ pathname: '/admin-super/vouchers/create' }) },
                    react_1.default.createElement(lucide_react_1.LucideTicketPlus, null),
                    "Create New Voucher")),
            react_1.default.createElement("div", { className: "mb-5 flex w-full items-center justify-between" },
                react_1.default.createElement("div", { className: "flex-grow mr-3" },
                    react_1.default.createElement(searchField_1.default, { searchTerm: searchQuery, onSearchChange: setSearchQuery, className: "w-full", placeholder: "Search vouchers..." })),
                react_1.default.createElement("div", { className: "flex items-center gap-3" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("label", { className: "text-sm font-semibold whitespace-nowrap" }, "Voucher Type:"),
                        react_1.default.createElement(selectFilter_1.default, { label: "All", value: voucherType, options: voucherTypeOptions, onChange: handleVoucherChange })),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("label", { className: "text-sm font-semibold whitespace-nowrap" }, "Discount Type:"),
                        react_1.default.createElement(selectFilter_1.default, { label: "All", value: discountType, options: discountTypeOptions, onChange: handleDiscountChange })))),
            react_1.default.createElement("div", { className: "overflow-x-auto" },
                react_1.default.createElement("table", { className: "min-w-full bg-white text-[10px] shadow-2xl rounded-lg overflow-hidden" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", { className: "bg-gray-800 text-white uppercase" },
                            react_1.default.createElement("th", { className: "py-4 text-center" }, "Gift"),
                            react_1.default.createElement("th", { className: "p-4 text-left" }, "Description"),
                            react_1.default.createElement("th", { className: "p-4 text-left" }, "Voucher Type"),
                            react_1.default.createElement("th", { className: "p-4 text-left" }, "Discount Type"),
                            react_1.default.createElement("th", { onClick: () => handleSort('discount_amount'), className: "p-4 text-left cursor-pointer" },
                                react_1.default.createElement("div", { className: "flex items-center" },
                                    "Discount Amount",
                                    react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                            react_1.default.createElement("th", { className: "p-4 text-left" }, "Minimum Purchase"),
                            react_1.default.createElement("th", { className: "p-4 text-left" }, "Maximum Discount"),
                            react_1.default.createElement("th", { onClick: () => handleSort('expire_period'), className: "p-4 text-left cursor-pointer" },
                                react_1.default.createElement("div", { className: "flex items-center" },
                                    "Expiry Period",
                                    react_1.default.createElement(fa_1.FaSort, { className: "ml-2 opacity-80 hover:opacity-100 transition-opacity" }))),
                            react_1.default.createElement("th", { className: "py-4 px-6 text-center" }, "Actions"))),
                    react_1.default.createElement("tbody", null, finalVouchers.map((voucher, index) => {
                        const isPinned = voucher.voucher_id === 9 || voucher.voucher_id === 11;
                        const rowClass = isPinned ? "bg-yellow-100 hover:bg-yellow-50" : (index % 2 === 0 ? "bg-gray-50" : "bg-white");
                        return (react_1.default.createElement("tr", { key: voucher.voucher_id, ref: editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ? editedRowRef : null, className: `${rowClass} border-b hover:bg-gray-100 transition-colors` },
                            react_1.default.createElement("td", { className: "py-3 text-center whitespace-nowrap" },
                                react_1.default.createElement("button", { onClick: () => handleGiftButtonClick(voucher), className: "mx-2 p-2 text-gray-800 rounded-full hover:text-gray-600  transition-colors transform", title: "Gift voucher" },
                                    react_1.default.createElement(fa6_1.FaGift, { className: "text-2xl" }))),
                            react_1.default.createElement("td", { className: "p-4 max-w-48", title: voucher.description },
                                react_1.default.createElement("div", { className: "truncate" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ? (react_1.default.createElement("input", { type: "text", value: editingVoucher.description, onChange: (e) => handleInputChange(e, 'description'), className: "p-2 w-full border border-gray-300 rounded" })) : (react_1.default.createElement(react_1.default.Fragment, null,
                                    isPinned && react_1.default.createElement(go_1.GoPin, { className: "inline-block text-black-500 mr-2" }),
                                    " ",
                                    voucher.description)))),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("select", { value: editingVoucher.voucher_type, onChange: (e) => handleInputChange(e, 'voucher_type'), className: "p-2 border border-gray-300 rounded" }, voucherTypeOptions.map(option => react_1.default.createElement("option", { key: option.value, value: option.value }, option.label)))
                                : voucherTypeMap[voucher.voucher_type]),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("select", { value: editingVoucher.discount_type, onChange: (e) => handleInputChange(e, 'discount_type'), className: "p-2 border border-gray-300 rounded" }, discountTypeOptions.map(option => react_1.default.createElement("option", { key: option.value, value: option.value }, option.label)))
                                : formatDiscountType(voucher.discount_type)),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("input", { type: "number", value: editingVoucher.discount_amount, onChange: (e) => handleInputChange(e, 'discount_amount'), className: "p-2 w-full border border-gray-300 rounded" })
                                : voucher.discount_type === "PERCENTAGE" ? `${voucher.discount_amount}%` : `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(voucher.discount_amount))}`),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("input", { type: "number", value: editingVoucher.min_purchase, onChange: (e) => handleInputChange(e, 'min_purchase'), className: "p-2 w-full border border-gray-300 rounded" })
                                : voucher.min_purchase !== null ? `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(voucher.min_purchase))}` : "-"),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("input", { type: "number", value: editingVoucher.max_discount, onChange: (e) => handleInputChange(e, 'max_discount'), className: "p-2 w-full border border-gray-300 rounded" })
                                : voucher.max_discount !== null ? `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(voucher.max_discount))} Off` : "-"),
                            react_1.default.createElement("td", { className: "p-4" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ?
                                react_1.default.createElement("input", { type: "number", value: editingVoucher.expire_period, onChange: (e) => handleInputChange(e, 'expire_period'), className: "p-2 w-full border border-gray-300 rounded" })
                                : `${voucher.expire_period} months`),
                            react_1.default.createElement("td", { className: "py-3 px-2 text-center whitespace-nowrap" },
                                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); handleEditClick(voucher); }, className: `mx-2 p-1 rounded-full transition-colors transform ${isPinned ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'}`, disabled: isPinned, title: "Edit voucher" }, editingVoucher && editingVoucher.voucher_id === voucher.voucher_id ? (react_1.default.createElement(md_1.MdSaveAs, { className: "text-xl", onClick: handleSaveClick })) : (react_1.default.createElement(md_1.MdEditSquare, { className: "text-xl" }))),
                                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); handleDeleteVoucher(voucher.voucher_id); }, className: `mx-2 p-1 rounded-full transition-colors transform ${isPinned ? 'text-gray-400' : 'text-rose-600 hover:bg-rose-600 hover:text-white'}`, disabled: isPinned, title: "Delete voucher" },
                                    react_1.default.createElement(md_1.MdDelete, { className: "text-xl" })))));
                    })))),
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }))));
};
exports.default = ManageVouchers;
