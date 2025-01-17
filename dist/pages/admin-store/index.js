"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = require("next/link");
const router_1 = require("next/router");
const react_redux_1 = require("react-redux");
const cg_1 = require("react-icons/cg");
const storeAdminSlice_1 = require("@/redux/slices/storeAdminSlice.js");
const js_cookie_1 = require("js-cookie");
const useAuth_1 = require("@/hooks/useAuth.js");
function StoreDashboardGate() {
    const user = (0, useAuth_1.default)();
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { storeName, adminName, loading, error } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    (0, react_1.useEffect)(() => {
        if (user === null || user === void 0 ? void 0 : user.id) {
            dispatch((0, storeAdminSlice_1.fetchStoreByUserId)(user.id));
            dispatch((0, storeAdminSlice_1.fetchAdminById)(user.id));
        }
    }, [user, dispatch]);
    const handleLogout = () => {
        js_cookie_1.default.remove('access_token');
        router.push('/');
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen h-screen text-gray-800 flex items-center justify-center" }, loading ? (react_1.default.createElement("div", { className: "flex flex-col items-center justify-center space-y-4" },
        react_1.default.createElement(cg_1.CgSpinner, { className: "animate-spin text-6xl  text-teal-500" }))) : (react_1.default.createElement("div", { className: "md:min-w-[700px] bg-white p-8 shadow-xl rounded-lg flex flex-col items-center justify-between" }, error ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
            react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" },
                "Welcome, ",
                adminName)),
        react_1.default.createElement("h2", { className: "text-xl font-semibold text-rose-600" }, "You are currently not assigned to a store."),
        react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Please logout and contact the super admin."),
        react_1.default.createElement("button", { onClick: handleLogout, className: "mt-3 bg-white text-teal-600 font-semibold border-2 border-teal-600 py-3 px-8 rounded-full hover:bg-teal-600 hover:text-white transition-colors transform" }, "Logout"))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
            react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" },
                "Welcome, ",
                adminName)),
        react_1.default.createElement("p", { className: "text-gray-700 my-3 text-center" }, "Your assigned store is:"),
        react_1.default.createElement("div", { className: "flex items-center mb-4 space-x-3" },
            react_1.default.createElement("h2", { className: "text-2xl font-semibold text-teal-600" }, storeName)),
        react_1.default.createElement(link_1.default, { href: "/admin-store/dashboard" },
            react_1.default.createElement("button", { className: "mt-3 bg-white text-teal-600 font-semibold border-2 border-teal-600 py-3 px-8 rounded-full hover:bg-teal-600 hover:text-white transition-colors transform" }, "Continue to Dashboard"))))))));
}
exports.default = StoreDashboardGate;
