"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = require("react");
require("@/styles/globals.css");
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const store_1 = require("@/redux/store.js");
const navbar_1 = require("../components/navbar.js");
const footer_1 = require("../components/footer.js");
const useCheckAccess_1 = require("../hooks/useCheckAccess.js");
const AccessDenied_1 = require("../components/AccessDenied.js");
const location_header_1 = require("../components/location-header.js");
const axios_1 = require("axios");
const react_toastify_1 = require("react-toastify");
const Header_1 = require("@/components/Header.js");
axios_1.default.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;
function App({ Component, pageProps }) {
    const router = (0, router_1.useRouter)();
    const accessDenied = (0, useCheckAccess_1.useCheckAccess)();
    const hideNavAdmin = router.pathname.startsWith("/admin");
    const hideNavAuth = router.pathname.startsWith("/auth");
    const hideNavPayment = router.pathname.startsWith("/checkout/payment");
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
            !hideNavAdmin && !hideNavAuth && !hideNavPayment && react_1.default.createElement(location_header_1.default, null),
            !hideNavAdmin && !hideNavAuth && !hideNavPayment && react_1.default.createElement(navbar_1.default, null),
            react_1.default.createElement(Header_1.default, null,
                react_1.default.createElement("link", { rel: "icon", href: "/icons8-f-50.png" }),
                react_1.default.createElement("title", null, "FRUGMART")),
            accessDenied ? react_1.default.createElement(AccessDenied_1.default, null) : react_1.default.createElement(Component, Object.assign({}, pageProps)),
            !hideNavAdmin && !hideNavAuth && !hideNavPayment && react_1.default.createElement(footer_1.default, null),
            react_1.default.createElement(react_toastify_1.ToastContainer, { position: "bottom-right", autoClose: 3000 }))));
}
