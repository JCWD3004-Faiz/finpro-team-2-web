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
const router_1 = require("next/router");
const js_cookie_1 = require("js-cookie");
const react_redux_1 = require("react-redux");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const GoogleCallback = () => {
    const router = (0, router_1.useRouter)();
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        const handleGoogleCallback = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { accessToken, refreshToken } = router.query;
                // Validate if tokens exist in the query
                if (accessToken && refreshToken) {
                    // Set tokens in cookies
                    js_cookie_1.default.set("access_token", accessToken, { expires: 1 }); // expires in 1 day
                    js_cookie_1.default.set("refreshToken", refreshToken, { expires: 7 }); // expires in 7 days
                    // Show success message
                    dispatch((0, successSlice_1.showSuccess)("Google login successful!"));
                    // Redirect to the home page
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                }
                else {
                    // Handle missing tokens
                    dispatch((0, errorSlice_1.showError)("Google login failed. Missing tokens."));
                }
            }
            catch (error) {
                dispatch((0, errorSlice_1.showError)("An error occurred while handling Google login."));
            }
        });
        handleGoogleCallback();
    }, [router.query, dispatch]);
    return (React.createElement("div", { className: "w-screen h-screen bg-white" },
        React.createElement("div", { className: "container mx-auto text-center pt-10" },
            React.createElement("h1", { className: "text-2xl font-bold text-gray-800" }, "Processing Google Login..."),
            React.createElement("p", { className: "text-gray-500" }, "Please wait while we log you in..."))));
};
exports.default = GoogleCallback;
