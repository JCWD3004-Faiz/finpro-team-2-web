"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dynamic_1 = require("next/dynamic");
const react_redux_1 = require("react-redux");
const getProductsSlice_1 = require("@/redux/slices/getProductsSlice.js");
const userDiscountSlice_1 = require("@/redux/slices/userDiscountSlice.js");
const product_card_latest_1 = require("../components/product-card-latest.js");
const frugger_marquee_1 = require("../components/frugger-marquee.js"); // Import FruggerMarquee component
const react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/free-mode");
require("swiper/css/scrollbar");
const modules_1 = require("swiper/modules");
const js_cookie_1 = require("js-cookie");
const HeroBanner = (0, dynamic_1.default)(() => Promise.resolve().then(() => require("../components/hero-banner.js")), { ssr: false });
const Home = () => {
    const current_store_id = Number(js_cookie_1.default.get("current_store_id"));
    const dispatch = (0, react_redux_1.useDispatch)();
    const { loading, productAllUser } = (0, react_redux_1.useSelector)((state) => state.getProducts);
    const { allUserDiscounts } = (0, react_redux_1.useSelector)((state) => state.userDiscounts);
    (0, react_1.useEffect)(() => {
        // Fetch all products
        const pageSize = 10000; // Use a sufficiently large number to fetch all products
        const sortField = "product_name";
        const sortOrder = "asc";
        dispatch((0, userDiscountSlice_1.fetchDiscountsByStoreId)(current_store_id));
        dispatch((0, getProductsSlice_1.fetchInventoriesUser)({
            page: 1, // Fetching all data doesn't need pagination, but provide the first page
            pageSize,
            sortField,
            sortOrder,
            store_id: current_store_id
        }));
    }, [dispatch, current_store_id]);
    // Group products by category
    const groupedProducts = productAllUser.reduce((groups, product) => {
        const { category_name } = product;
        if (!groups[category_name]) {
            groups[category_name] = [];
        }
        groups[category_name].push(product);
        return groups;
    }, {});
    // Get the first four categories
    const limitedCategories = Object.keys(groupedProducts).slice(0, 4);
    return (react_1.default.createElement("div", { className: "flex flex-col mt-[11vh]" },
        react_1.default.createElement("div", { className: "w-full" },
            react_1.default.createElement(HeroBanner, null)),
        react_1.default.createElement(frugger_marquee_1.default, null),
        react_1.default.createElement("div", { className: "w-full mt-[3vh] mb-[3vh] p-4 bg-white text-gray-900" }, loading ? (react_1.default.createElement("div", null, "Loading...") // You can replace this with a loading component if needed
        ) : (limitedCategories.map((category) => (react_1.default.createElement("div", { key: category, className: "mb-12" },
            react_1.default.createElement("div", { className: "flex items-center justify-between mb-6" },
                react_1.default.createElement("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold" }, category),
                react_1.default.createElement("a", { href: "/products-page", className: "text-black text-lg sm:text-2xl" }, "More")),
            react_1.default.createElement(react_2.Swiper, { spaceBetween: 20, slidesPerView: "auto", freeMode: true, scrollbar: {
                    draggable: true,
                    el: `.swiper-scrollbar-${category}`,
                    hide: false,
                }, keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                }, modules: [modules_1.FreeMode, modules_1.Scrollbar, modules_1.Keyboard], className: "category-swiper" }, groupedProducts[category].map((product) => (react_1.default.createElement(react_2.SwiperSlide, { key: product.inventory_id, className: "m-1", style: { width: "280px" } },
                react_1.default.createElement(product_card_latest_1.default, { inventoryId: product.inventory_id, productId: product.product_id, productImage: product.product_image, productName: product.product_name, categoryName: product.category_name, userStock: product.user_stock, price: String(product.price), discountedPrice: String(product.discounted_price), discountType: product.discount_type, discountValue: product.discount_value, onClick: () => {
                        // Navigate to the product details page when clicked
                        window.location.href = `/products-page/product-details-page/${product.inventory_id}`;
                    } }))))),
            react_1.default.createElement("div", { className: `w-full h-[1vh] mt-2 swiper-scrollbar-${category}` }))))))));
};
exports.default = Home;
