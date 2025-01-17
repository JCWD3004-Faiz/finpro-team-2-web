"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSidebar = UserSidebar;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const image_1 = require("next/image");
const link_1 = require("next/link");
const react_redux_1 = require("react-redux");
const userProfileSlice_1 = require("@/redux/slices/userProfileSlice.js");
const react_loading_skeleton_1 = require("react-loading-skeleton");
const utils_1 = require("@/lib/utils.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const badge_1 = require("./ui/badge.js");
const navigationItems = [
    { label: "My Profile", icon: lucide_react_1.UserCircle2, href: "/user/profile-editor" },
    { label: "Addresses", icon: lucide_react_1.MapPin, href: "/user/addresses" },
    { label: "Vouchers", icon: lucide_react_1.Ticket, href: "/user/vouchers" },
    { label: "Ongoing Orders", icon: lucide_react_1.Package, href: "/user/orders" },
    { label: "Transaction History", icon: lucide_react_1.History, href: "/user/history" },
];
function UserSidebar() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { username, is_verified, email, image, loading } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (user_id) {
            dispatch((0, userProfileSlice_1.fetchProfile)(user_id));
        }
    }, [user_id, dispatch]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("aside", { className: "hidden md:flex flex-col w-64 bg-white rounded-lg p-4", style: {
                boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
            } },
            react_1.default.createElement("div", { className: "flex flex-col items-center pb-6 border-b" },
                react_1.default.createElement("div", { className: "relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-muted" }, loading ? (react_1.default.createElement(react_loading_skeleton_1.default, { circle: true, height: 96, width: 96 })) : image ? (react_1.default.createElement(image_1.default, { src: image, alt: username, fill: true, className: "object-cover" })) : (react_1.default.createElement("div", { className: "w-full h-full flex items-center justify-center bg-primary/10" },
                    react_1.default.createElement(lucide_react_1.User, { className: "w-12 h-12 text-primary/40" })))),
                react_1.default.createElement("p", { className: "text-lg font-semibold text-gray-900" }, loading ? react_1.default.createElement(react_loading_skeleton_1.default, { width: 120 }) : username),
                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, loading ? react_1.default.createElement(react_loading_skeleton_1.default, { width: 150 }) : email),
                !loading &&
                    (is_verified ? (react_1.default.createElement(badge_1.Badge, { variant: "secondary", className: "text-white flex items-center gap-1 mt-2" },
                        react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-3 h-3" }),
                        "Verified")) : (react_1.default.createElement(badge_1.Badge, { variant: "destructive", className: "text-white flex items-center gap-1 mt-2" },
                        react_1.default.createElement(lucide_react_1.XCircle, { className: "w-3 h-3" }),
                        "Not Verified")))),
            react_1.default.createElement("nav", { className: "mt-6 space-y-1" }, navigationItems.map((item) => (react_1.default.createElement(link_1.default, { key: item.href, href: item.href, className: "text-gray-800 flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-secondary hover:text-primary transition-colors" },
                react_1.default.createElement(item.icon, { className: "w-4 h-4 mr-3" }),
                item.label))))),
        react_1.default.createElement("div", { className: "md:hidden" },
            react_1.default.createElement("button", { onClick: () => setIsOpen(!isOpen), className: "fixed bottom-4 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors", "aria-label": "Toggle profile menu" },
                react_1.default.createElement(lucide_react_1.Menu, { className: "w-6 h-6" })),
            isOpen && (react_1.default.createElement("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: () => setIsOpen(false) })),
            react_1.default.createElement("aside", { className: (0, utils_1.cn)("fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-xl p-4 transition-transform duration-300 ease-in-out transform", isOpen ? "translate-y-0" : "translate-y-full") },
                react_1.default.createElement("div", { className: "flex flex-col items-center pb-6 border-b" },
                    react_1.default.createElement("div", { className: "relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-muted" }, loading ? (react_1.default.createElement(react_loading_skeleton_1.default, { circle: true, height: 96, width: 96 })) : image ? (react_1.default.createElement(image_1.default, { src: image, alt: username, fill: true, className: "object-cover" })) : (react_1.default.createElement("div", { className: "w-full h-full flex items-center justify-center bg-primary/10" },
                        react_1.default.createElement(lucide_react_1.User, { className: "w-12 h-12 text-primary/40" })))),
                    react_1.default.createElement("p", { className: "text-lg font-semibold text-gray-900" }, loading ? react_1.default.createElement(react_loading_skeleton_1.default, { width: 120 }) : username),
                    react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, loading ? react_1.default.createElement(react_loading_skeleton_1.default, { width: 150 }) : email),
                    !loading &&
                        (is_verified ? (react_1.default.createElement(badge_1.Badge, { variant: "secondary", className: "text-white flex items-center gap-1 mt-2" },
                            react_1.default.createElement(lucide_react_1.CheckCircle2, { className: "w-3 h-3" }),
                            "Verified")) : (react_1.default.createElement(badge_1.Badge, { variant: "destructive", className: "text-white flex items-center gap-1 mt-2" },
                            react_1.default.createElement(lucide_react_1.XCircle, { className: "w-3 h-3" }),
                            "Not Verified")))),
                react_1.default.createElement("nav", { className: "mt-6 space-y-1 pb-16" }, navigationItems.map((item) => (react_1.default.createElement(link_1.default, { key: item.href, href: item.href, className: "text-gray-800 flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-secondary hover:text-primary transition-colors" },
                    react_1.default.createElement(item.icon, { className: "w-4 h-4 mr-3" }),
                    item.label))))))));
}
