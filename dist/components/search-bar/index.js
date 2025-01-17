"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/free-mode");
require("swiper/css/scrollbar");
const modules_1 = require("swiper/modules");
const SearchBar = ({ searchQuery, categories, onSearchChange, onCategoryClick, }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (react_1.default.createElement("div", { className: "w-full bg-white border-b border-black mx-6 overflow-hidden transition-all duration-500" },
        react_1.default.createElement("div", { className: `w-full flex flex-col items-center transition-all duration-500 overflow-hidden ${isExpanded ? "h-[34vh]" : "h-[0vh]"}` },
            react_1.default.createElement("div", { className: "w-full text-left p-4" },
                react_1.default.createElement("p", { className: "text-2xl font-semibold text-center sm:text-left" }, "Start your frugal life today.")),
            react_1.default.createElement("div", { className: `w-full px-4 flex flex-col items-center mt-4 transition-all duration-500 ${isExpanded ? "translate-y-0" : "-translate-y-20 opacity-0"}` },
                react_1.default.createElement("input", { type: "text", className: "w-full border-b text-2xl border-gray-500 py-2 text-center text-gray-700 placeholder-gray-400 outline-none sm:text-lg sm:px-4", placeholder: "What are you looking for today?", value: searchQuery, onChange: onSearchChange })),
            react_1.default.createElement("div", { className: `w-full px-4 mt-4 transition-all duration-500 ${isExpanded ? "translate-y-0" : "-translate-y-20 opacity-0"}` },
                react_1.default.createElement("div", { className: "w-full h-[10vh] flex items-center" },
                    react_1.default.createElement(react_2.Swiper, { spaceBetween: 10, slidesPerView: "auto", freeMode: true, scrollbar: {
                            draggable: true,
                            el: ".swiper-scrollbar", // Custom scrollbar container
                            hide: false, // Always show the scrollbar
                        }, keyboard: {
                            enabled: true, // Enable keyboard navigation
                            onlyInViewport: true, // Navigation only works when the Swiper is visible
                        }, modules: [modules_1.FreeMode, modules_1.Scrollbar, modules_1.Keyboard], className: "category-swiper" }, categories.map((category) => (react_1.default.createElement(react_2.SwiperSlide, { key: category.category_name, style: { width: "250px" } },
                        react_1.default.createElement("button", { className: "w-full h-[10vh] bg-white text-black text-center border border-black cursor-pointer hover:bg-black hover:text-white transition-all", onClick: () => onCategoryClick(category.category_name) }, category.category_name)))))),
                react_1.default.createElement("div", { className: "w-full h-[2vh] mt-2" },
                    react_1.default.createElement("div", { className: "swiper-scrollbar" })))),
        react_1.default.createElement("div", { className: "w-full h-[10vh] border-t border-black flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white group cursor-pointer", onClick: toggleExpand },
            react_1.default.createElement("div", { className: "flex items-center space-x-2 text-black group-hover:text-white" },
                react_1.default.createElement(fa_1.FaArrowDown, { className: `text-gray-700 text-3xl cursor-pointer transition-transform duration-500 ${isExpanded ? "rotate-180" : ""} group-hover:text-white` }),
                react_1.default.createElement("span", { className: "text-black text-2xl font-medium group-hover:text-white sm:text-xl" }, "Search for products here.")))));
};
exports.default = SearchBar;
