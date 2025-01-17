"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const fa6_1 = require("react-icons/fa6");
const md_1 = require("react-icons/md");
const ri_1 = require("react-icons/ri");
const shopping_cart_1 = require("../shopping-cart.js");
const extra_box_1 = require("../extra-box.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const js_cookie_1 = require("js-cookie");
const Navbar = () => {
    const user = (0, useAuth_1.default)();
    const [isCartOpen, setCartOpen] = (0, react_1.useState)(false);
    const [isMenuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const [accessToken, setAccessToken] = (0, react_1.useState)(undefined);
    const router = (0, router_1.useRouter)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    (0, react_1.useEffect)(() => {
        const token = js_cookie_1.default.get("access_token");
        setAccessToken(token);
    }, []);
    const handleLoginClick = () => {
        router.push("/auth/login-page");
    };
    const handleProfileClick = () => {
        router.push("/user/profile-editor");
    };
    const handleLogoutClick = () => {
        js_cookie_1.default.remove("access_token");
        setAccessToken(undefined);
        window.location.href = "/";
    };
    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const navigateTo = (path) => {
        router.push(path);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("nav", { className: "fixed top-0 left-0 w-full bg-white shadow-lg z-50 h-[8vh] mt-[3vh] border-b border-black" },
            react_1.default.createElement("div", { className: "flex items-center justify-between h-full px-4 w-full" },
                react_1.default.createElement("div", { className: "flex items-center justify-between sm:w-auto w-full" },
                    react_1.default.createElement("div", { className: "sm:hidden" },
                        react_1.default.createElement(fa6_1.FaBars, { className: "text-black text-3xl cursor-pointer", onClick: toggleMenu })),
                    react_1.default.createElement("div", { className: "hidden sm:flex font-bold text-2xl text-black hover:cursor-pointer hover:text-muted-foreground", onClick: () => navigateTo("/") }, "FRUGMART"),
                    react_1.default.createElement("div", { className: "sm:hidden flex w-full justify-center items-center hover:cursor-pointer" },
                        react_1.default.createElement("div", { className: "text-black font-bold text-2xl hover:text-muted-foreground", onClick: () => navigateTo("/") }, "FRUGMART"))),
                react_1.default.createElement("div", { className: "sm:flex flex-grow justify-center sm:order-2 hidden" },
                    react_1.default.createElement("ul", { className: "flex space-x-8 list-none items-center" },
                        react_1.default.createElement("li", { className: "text-black cursor-pointer hover:underline", onClick: () => navigateTo("/") }, "Home"),
                        react_1.default.createElement("li", { className: "text-black cursor-pointer hover:underline", onClick: () => navigateTo("/products-page") }, "Products"),
                        react_1.default.createElement("li", { className: "text-black cursor-pointer hover:underline", onClick: () => navigateTo("/about-page") }, "About"))),
                react_1.default.createElement("div", { className: "flex items-center space-x-4 sm:order-3" }, accessToken ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(fa6_1.FaCartShopping, { className: "text-black text-3xl cursor-pointer hover:text-muted-foreground", onClick: toggleCart, title: "Cart" }),
                    react_1.default.createElement(md_1.MdAccountBox, { className: "text-black text-3xl cursor-pointer hover:text-muted-foreground", onClick: handleProfileClick, title: "Profile" }),
                    react_1.default.createElement(ri_1.RiLogoutBoxFill, { className: "text-black text-3xl cursor-pointer hover:text-muted-foreground", onClick: handleLogoutClick, title: "Logout" }))) : (react_1.default.createElement(ri_1.RiLoginBoxFill, { className: "text-black text-3xl cursor-pointer hover:text-muted-foreground", onClick: handleLoginClick, title: "Login" }))))),
        react_1.default.createElement(extra_box_1.default, { isVisible: isMenuOpen, onClose: toggleMenu }),
        react_1.default.createElement(shopping_cart_1.default, { isOpen: isCartOpen, onClose: () => setCartOpen(false), user_id: user_id })));
};
exports.default = Navbar;
