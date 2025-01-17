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
const interceptor_1 = require("@/utils/interceptor.js");
const js_cookie_1 = require("js-cookie");
const jwt_decode_1 = require("jwt-decode");
const Login = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        username: '',
        password: '',
    });
    const [isRegisterClicked, setIsRegisterClicked] = (0, react_1.useState)(false); // State to trigger register click
    const [isContentShifted, setIsContentShifted] = (0, react_1.useState)(false); // State to shift content alignment
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield interceptor_1.default.post('/api/auth/login', {
                email: formData.username,
                password: formData.password,
            });
            const { access_token, refreshToken } = response.data.data;
            const decodedToken = (0, jwt_decode_1.jwtDecode)(access_token);
            const { role } = decodedToken;
            if (access_token) {
                js_cookie_1.default.set('access_token', access_token, { expires: 1 }); // expires in 1 day
                js_cookie_1.default.set('refreshToken', refreshToken, { expires: 7 }); // expires in 7 days
            }
            let redirectUrl = '/';
            if (role === 'SUPER_ADMIN') {
                redirectUrl = '/admin-super';
            }
            else if (role === 'STORE_ADMIN') {
                redirectUrl = '/admin-store';
            }
            alert('Successfully logged in');
            window.location.href = redirectUrl;
        }
        catch (error) {
            alert('Failed to log in. Please check your email and password');
        }
    });
    const handleRegisterClick = () => {
        // Trigger the sliding effect
        setIsRegisterClicked(true);
        // Delay the shifting of content to align with the slide animation
        setTimeout(() => {
            setIsContentShifted(true);
        }, 500); // Matches the transition duration of the slide animation
    };
    return (react_1.default.createElement("div", { className: "min-h-screen flex items-center justify-end bg-black" },
        react_1.default.createElement("div", { className: `bg-white p-8 w-3/6 h-screen shadow-md flex flex-col justify-center transform transition-transform duration-500 ${isRegisterClicked ? 'translate-x-negative' : ''}` },
            react_1.default.createElement("h1", { className: `text-5xl font-bold mb-6 transition-all duration-500 ${isContentShifted ? 'text-right' : 'text-left'}` }, "FRUGGER"),
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: `flex flex-col transition-all duration-500 ${isContentShifted ? 'items-end' : 'items-start'}` },
                react_1.default.createElement("div", { className: "mb-4 w-96" },
                    react_1.default.createElement("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700" }, "Username"),
                    react_1.default.createElement("input", { id: "username", name: "username", type: "text", value: formData.username, onChange: handleChange, placeholder: "Enter your username", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "mb-6 w-96" },
                    react_1.default.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                    react_1.default.createElement("input", { id: "password", name: "password", type: "password", value: formData.password, onChange: handleChange, placeholder: "Enter your password", className: "mt-1 block w-full px-4 py-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300", required: true })),
                react_1.default.createElement("div", { className: "flex flex-col w-96" },
                    react_1.default.createElement("button", { type: "submit", className: "bg-black text-white px-4 py-2 w-full rounded shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-300" }, "Login"),
                    react_1.default.createElement("button", { type: "button", className: "my-4 px-4 py-2 w-full rounded shadow border border-gray-300 hover:bg-gray-100", onClick: handleRegisterClick }, "Register"))))));
};
exports.default = Login;
