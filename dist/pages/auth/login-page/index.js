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
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const jwt_decode_1 = require("jwt-decode");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const react_redux_1 = require("react-redux");
const fa_1 = require("react-icons/fa");
const Login = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [formData, setFormData] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const [isRegisterClicked, setIsRegisterClicked] = (0, react_1.useState)(false); // State to trigger register click
    const [isLoginFaded, setIsLoginFaded] = (0, react_1.useState)(false); // State for fading effect
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        setLoading(true);
        try {
            const response = yield axios_1.default.post("/api/auth/login", {
                email: formData.username,
                password: formData.password,
            });
            const { access_token, refreshToken } = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
            const decodedToken = (0, jwt_decode_1.jwtDecode)(access_token);
            const { role } = decodedToken;
            if (access_token) {
                js_cookie_1.default.set("access_token", access_token, { expires: 1 }); // expires in 1 day
                js_cookie_1.default.set("refreshToken", refreshToken, { expires: 7 }); // expires in 7 days
            }
            let redirectUrl = "/";
            if (role === "SUPER_ADMIN") {
                redirectUrl = "/admin-super";
            }
            else if (role === "STORE_ADMIN") {
                redirectUrl = "/admin-store";
            }
            dispatch((0, successSlice_1.showSuccess)("Welcome to FrugMart!"));
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                const errorMessage = typeof ((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.detail) === "string"
                    ? error.response.data.detail
                    : "An error occurred.";
                dispatch((0, errorSlice_1.showError)(errorMessage));
            }
            else {
                dispatch((0, errorSlice_1.showError)("An unexpected error occurred."));
            }
        }
        finally {
            setLoading(false);
        }
    });
    const handleRegisterClick = () => {
        window.location.href = "/auth/register";
    };
    const handleForgotPassClick = () => {
        window.location.href = "/auth/passwordReset";
    };
    const handleGoogleClick = () => {
        const googleLoginUrl = `${axios_1.default.defaults.baseURL}/auth/google`;
        window.location.href = googleLoginUrl;
    };
    return (react_1.default.createElement("div", { className: "min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-end text-gray-800 bg-black md:pl-4" },
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => {
                dispatch((0, errorSlice_1.hideError)());
            }, errorMessage: errorMessage }),
        react_1.default.createElement("div", { className: "hidden md:flex flex-col justify-center items-center h-screen gap-6 px-5" },
            react_1.default.createElement("h1", { className: "text-white text-4xl lg:text-5xl font-bold text-end" }, "Welcome to FRUGMART"),
            react_1.default.createElement("h2", { className: "text-white text-3xl text-end w-full font-semibold" },
                "Smart Choices ",
                react_1.default.createElement("br", null),
                " Bigger Savings!")),
        react_1.default.createElement("div", { className: "bg-white p-8 w-screen md:w-3/6 h-screen shadow-md flex flex-col justify-center" },
            react_1.default.createElement("h1", { className: "text-5xl font-bold mb-6" }, "LOGIN"),
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col" },
                react_1.default.createElement("div", { className: "mb-4 w-full md:max-w-96" },
                    react_1.default.createElement("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700" }, "Email"),
                    react_1.default.createElement("input", { id: "username", name: "username", type: "email", value: formData.username, onChange: handleChange, placeholder: "Enter your email", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "mb-6 w-full md:max-w-96" },
                    react_1.default.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                    react_1.default.createElement("input", { id: "password", name: "password", type: "password", value: formData.password, onChange: handleChange, placeholder: "Enter your password", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "flex flex-col w-full md:max-w-96" },
                    react_1.default.createElement("button", { type: "submit", className: "bg-black text-white px-4 py-2 w-full rounded shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-300" }, "Login"),
                    react_1.default.createElement("button", { type: "button", className: "my-4 px-4 py-2 w-full rounded shadow border border-gray-300 hover:bg-gray-100", onClick: handleRegisterClick }, "Register"),
                    react_1.default.createElement("button", { type: "button", className: "my-4 px-4 py-2 w-full rounded shadow border border-gray-300 hover:bg-gray-100", onClick: handleGoogleClick },
                        react_1.default.createElement("div", { className: "flex justify-center items-center gap-2" },
                            react_1.default.createElement("div", null, "Login with Google"),
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(fa_1.FaGoogle, null)))),
                    react_1.default.createElement("p", { className: "mt-4 text-sm text-gray-500 cursor-pointer hover:underline", onClick: () => (window.location.href = "/auth/passwordReset") }, "Forgot password?"))))));
};
exports.default = Login;
