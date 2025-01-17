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
const react_redux_1 = require("react-redux");
const router_1 = require("next/router");
const superAdminSlice_1 = require("@/redux/slices/superAdminSlice.js");
const registerAdminSchema_1 = require("@/utils/registerAdminSchema.js");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const modal_error_1 = require("@/components/modal-error.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function RegisterAdmin() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, router_1.useRouter)();
    const { isSidebarOpen, loading } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [credentials, setCredentials] = (0, react_1.useState)({
        username: '',
        email: '',
        password_hash: '',
    });
    const toggleSidebar = () => {
        dispatch({ type: 'superAdmin/toggleSidebar' });
    };
    function submitRegister(e) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            e.preventDefault();
            setErrors({});
            try {
                registerAdminSchema_1.registerAdminSchema.parse(credentials);
                yield dispatch((0, superAdminSlice_1.registerStoreAdmin)(credentials)).unwrap();
                dispatch((0, successSlice_1.showSuccess)('Register success'));
                router.push('/admin-super/admins');
            }
            catch (error) {
                const newErrors = ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {})) || {};
                setErrors(newErrors);
                if (!Object.keys(newErrors).length)
                    dispatch((0, errorSlice_1.showError)('Failed to register'));
            }
        });
    }
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = '/admin-super/admins';
            }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-center text-gray-900 mb-10 tracking-wide" }, "Register Store Admin"),
            react_1.default.createElement("div", { className: "flex flex-col justify-center items-center md:px-0 px-4" },
                react_1.default.createElement("form", { onSubmit: submitRegister, className: "md:w-1/2 w-full h-auto rounded-md bg-white shadow-xl text-slate-700" },
                    react_1.default.createElement("div", { className: "w-full h-full flex flex-col p-5 justify-center items-center space-y-5" },
                        react_1.default.createElement("div", { className: "flex flex-col space-y-3" },
                            react_1.default.createElement("label", { className: "font-semibold" }, "Username"),
                            react_1.default.createElement("input", { className: "w-full h-10 p-3 text-slate-700 border", onChange: (e) => setCredentials({
                                    username: e.target.value,
                                    email: credentials.email,
                                    password_hash: credentials.password_hash,
                                }) }),
                            react_1.default.createElement("div", { className: `min-h-[20px] text-red-600 text-xs ${errors.username ? "opacity-100" : "opacity-0"}` }, errors.username)),
                        react_1.default.createElement("div", { className: "flex flex-col space-y-3" },
                            react_1.default.createElement("label", { className: "font-semibold" }, "Email"),
                            react_1.default.createElement("input", { className: "w-full h-10 p-3 text-slate-700 border", onChange: (e) => setCredentials({
                                    username: credentials.username,
                                    email: e.target.value,
                                    password_hash: credentials.password_hash,
                                }) }),
                            react_1.default.createElement("div", { className: `min-h-[20px] text-red-600 text-xs ${errors.email ? "opacity-100" : "opacity-0"}` }, errors.email)),
                        react_1.default.createElement("div", { className: "flex flex-col space-y-3" },
                            react_1.default.createElement("label", { className: "font-semibold" }, "Password"),
                            react_1.default.createElement("input", { type: "password", className: "w-full h-10 p-3 text-slate-700 border", onChange: (e) => setCredentials({
                                    username: credentials.username,
                                    email: credentials.email,
                                    password_hash: e.target.value,
                                }) }),
                            react_1.default.createElement("div", { className: `min-h-[20px] text-red-600 text-xs ${errors.password_hash ? "opacity-100" : "opacity-0"}` }, errors.password_hash)),
                        react_1.default.createElement("button", { type: "submit", className: "bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-20 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Submit")))))));
}
exports.default = RegisterAdmin;
