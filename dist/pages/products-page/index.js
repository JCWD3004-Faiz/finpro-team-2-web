"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const search_bar_1 = require("../../components/search-bar.js");
const product_card_latest_1 = require("../../components/product-card-latest.js");
const pagination_1 = require("../../components/pagination.js");
const page_banner_1 = require("../../components/page-banner.js");
const react_redux_1 = require("react-redux");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const getProductsSlice_1 = require("@/redux/slices/getProductsSlice.js");
const useDebounce_1 = require("@/hooks/useDebounce.js");
const js_cookie_1 = require("js-cookie");
const Products = () => {
    const current_store_id = js_cookie_1.default.get("current_store_id");
    const dispatch = (0, react_redux_1.useDispatch)();
    const { loading, productAllUser, currentPage, totalPages, categories, // Get categories from the store
     } = (0, react_redux_1.useSelector)((state) => state.getProducts);
    const [category, setCategory] = (0, react_1.useState)("all");
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const debouncedQuery = (0, useDebounce_1.default)(searchQuery, 500);
    const router = (0, router_1.useRouter)();
    // Fetch all categories when the component mounts
    (0, react_1.useEffect)(() => {
        dispatch((0, getProductsSlice_1.fetchAllCategories)());
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        const pageSize = 12;
        const sortField = "product_name";
        const sortOrder = "asc";
        dispatch((0, getProductsSlice_1.fetchInventoriesUser)({
            page: currentPage,
            pageSize,
            search: debouncedQuery,
            category: category === "all" ? "" : category,
            sortField,
            sortOrder,
            store_id: Number(current_store_id)
        }))
            .unwrap()
            .then((data) => {
        })
            .catch((err) => {
            console.error("Error fetching inventories:", err);
        });
    }, [dispatch, debouncedQuery, currentPage, category, current_store_id]);
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            dispatch((0, getProductsSlice_1.setCurrentPage)(page));
        }
    };
    const handleCategoryClick = (category) => {
        setCategory(category); // This will update the category and trigger the useEffect to fetch products
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (react_1.default.createElement("div", { className: "bg-white text-gray-800 min-h-screen flex flex-col items-center" },
        react_1.default.createElement(page_banner_1.default, { title: "Products" }),
        react_1.default.createElement(search_bar_1.default, { searchQuery: searchQuery, categories: categories, onSearchChange: handleSearchChange, onCategoryClick: handleCategoryClick }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 my-[5vh] p-4 justify-items-center items-center" }, productAllUser.map((product) => (react_1.default.createElement(product_card_latest_1.default, { key: product.inventory_id, inventoryId: product.inventory_id, productId: product.product_id, productImage: product.product_image, productName: product.product_name, categoryName: product.category_name, userStock: product.user_stock, price: String(product.price), discountedPrice: String(product.discounted_price), discountType: product.discount_type, discountValue: product.discount_value, onClick: () => {
                router.push(`/products-page/product-details-page/${product.inventory_id}`);
            } })))),
        react_1.default.createElement("div", { className: "mb-[10vh]" },
            react_1.default.createElement(pagination_1.default, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }))));
};
exports.default = Products;
