"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// components/HeroBanner.tsx
const react_1 = require("react");
const react_2 = require("swiper/react");
const modules_1 = require("swiper/modules");
require("swiper/css");
require("swiper/css/autoplay");
require("swiper/css/keyboard");
require("swiper/css/pagination");
const hero_banner_card_1 = require("../hero-banner-card.js"); // Import the card component
const react_redux_1 = require("react-redux");
const userDiscountSlice_1 = require("@/redux/slices/userDiscountSlice.js");
const js_cookie_1 = require("js-cookie");
const HeroBanner = () => {
    const current_store_id = Number(js_cookie_1.default.get("current_store_id"));
    const access_token = js_cookie_1.default.get("access_token");
    const dispatch = (0, react_redux_1.useDispatch)();
    const { allUserDiscounts } = (0, react_redux_1.useSelector)((state) => state.userDiscounts);
    const { closestStore } = (0, react_redux_1.useSelector)((state) => state.landing);
    (0, react_1.useEffect)(() => {
        dispatch((0, userDiscountSlice_1.fetchDiscountsByStoreId)(current_store_id));
    }, [dispatch, current_store_id]);
    return (react_1.default.createElement("div", { className: "hero-banner w-full h-[70vh] overflow-hidden relative" }, Array.isArray(allUserDiscounts) && allUserDiscounts.length > 0 ? (react_1.default.createElement(react_2.Swiper, { modules: [modules_1.Keyboard, modules_1.Autoplay, modules_1.Pagination], spaceBetween: 0, slidesPerView: 1, loop: true, autoplay: { delay: 5000 }, keyboard: { enabled: true, onlyInViewport: true }, pagination: { clickable: true, dynamicBullets: true } }, allUserDiscounts
        .filter((slide) => slide.image) // Only include slides with a valid image
        .map((slide, index) => (react_1.default.createElement(react_2.SwiperSlide, { key: index },
        react_1.default.createElement(hero_banner_card_1.default, { title: slide.description || "Default Title", description: "", imagePath: slide.image ||
                "https://res.cloudinary.com/dmratku6l/image/upload/v1736608302/discountImages/gyziasbykkgylettwqkm.webp" })))))) : (
    // Render default image when there is no data
    react_1.default.createElement("div", { className: "w-full h-full" },
        react_1.default.createElement("img", { src: "https://res.cloudinary.com/dmratku6l/image/upload/v1736778543/background_sjg8xa.jpg", alt: "Default Banner", className: "w-full h-full object-cover" })))));
};
exports.default = HeroBanner;
