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
//import axios from "@/utils/interceptor";
const axios_1 = require("axios");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const react_redux_1 = require("react-redux");
const Register = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        username: "",
        email: "",
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const validateForm = () => {
        if (!formData.username) {
            dispatch((0, errorSlice_1.showError)("Username is required."));
            return false;
        }
        else if (formData.username.length > 50) {
            dispatch((0, errorSlice_1.showError)("Username must not exceed 50 characters."));
            return false;
        }
        if (!formData.email) {
            dispatch((0, errorSlice_1.showError)("Email is required."));
            return false;
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            dispatch((0, errorSlice_1.showError)("Email is not valid."));
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            const response = yield axios_1.default.post("/api/auth/pending-register", formData);
            setLoading(false);
            dispatch((0, successSlice_1.showSuccess)("An email has been sent to set your password"));
        }
        catch (err) {
            console.error("Error:", err);
            dispatch((0, errorSlice_1.showError)(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "An error occurred. Please try again."));
        }
        finally {
            setLoading(false);
        }
    });
    return (react_1.default.createElement("div", { className: "min-h-screen flex items-center justify-start bg-black text-gray-800" },
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = "/auth/login-page";
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement("div", { className: "bg-white p-8 w-screen md:w-3/6 h-screen shadow-md flex flex-col justify-center" },
            react_1.default.createElement("h1", { className: "text-5xl font-bold text-right mb-6" }, "REGISTER"),
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col items-end" // Align form elements to the right
             },
                react_1.default.createElement("div", { className: "mb-4 w-full md:max-w-96" },
                    " ",
                    react_1.default.createElement("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700" }, "Username"),
                    react_1.default.createElement("input", { id: "username", name: "username", type: "text", value: formData.username, onChange: handleChange, placeholder: "Enter your username", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "mb-6 w-full md:max-w-96" },
                    " ",
                    react_1.default.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email"),
                    react_1.default.createElement("input", { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, placeholder: "Enter your email", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "flex flex-col w-full md:max-w-96 items-end" },
                    " ",
                    react_1.default.createElement("button", { type: "submit", className: "bg-black text-white px-4 py-2 w-full rounded shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-300" }, "Register"),
                    react_1.default.createElement("p", { className: "mt-4 text-sm text-gray-500 cursor-pointer hover:underline", onClick: () => (window.location.href = "/auth/login-page") }, "Already have an account? Go to login page"))))));
};
exports.default = Register;
