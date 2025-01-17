"use client";
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
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card.js");
const input_1 = require("@/components/ui/input.js");
const button_1 = require("@/components/ui/button.js");
const label_1 = require("@/components/ui/label.js");
const lucide_react_1 = require("lucide-react");
function verifyPassword() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [password, setPassword] = (0, react_1.useState)("");
    const [referralCode, setReferralCode] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const params = (0, navigation_1.useParams)();
    const validatePassword = () => {
        if (password.length < 6) {
            dispatch((0, errorSlice_1.showError)("Password must be at least 6 characters long."));
            return false;
        }
        if (password.length > 20) {
            dispatch((0, errorSlice_1.showError)("Password must not exceed 20 characters."));
            return false;
        }
        return true;
    };
    const handleVerification = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!validatePassword()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = yield axios_1.default.post("/api/auth/register", {
                password_hash: password,
                register_code: referralCode,
            }, {
                headers: {
                    Authorization: `Bearer ${params.token}`,
                },
            });
            dispatch((0, successSlice_1.showSuccess)("Successfully registered"));
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                const errorMessage = typeof ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.detail) === "string"
                    ? error.response.data.detail
                    : "An error occurred.";
                dispatch((0, errorSlice_1.showError)(errorMessage));
            }
            else {
                dispatch((0, errorSlice_1.showError)("An unexpected error occurred."));
            }
        }
        finally {
            setIsLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (params === null || params === void 0 ? void 0 : params.token) {
        }
    }, [params]);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-white bg-gradient-to-b from-background to-muted flex items-center justify-center p-4" },
        isLoading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = "/auth/login-page";
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => {
                dispatch((0, errorSlice_1.hideError)());
            }, errorMessage: errorMessage }),
        react_1.default.createElement(card_1.Card, { className: "w-full max-w-md" },
            react_1.default.createElement(card_1.CardHeader, { className: "space-y-2 text-center" },
                react_1.default.createElement(card_1.CardTitle, { className: "text-3xl font-bold tracking-tight" }, "Frugger"),
                react_1.default.createElement(card_1.CardDescription, { className: "text-muted-foreground" }, "Complete your registration by setting up your password and entering your referral code")),
            react_1.default.createElement(card_1.CardContent, { className: "space-y-6" },
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement(label_1.Label, { htmlFor: "password" }, "Set Password"),
                    react_1.default.createElement("div", { className: "relative" },
                        react_1.default.createElement(input_1.Input, { id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), className: "pl-10" }),
                        react_1.default.createElement(lucide_react_1.LockKeyhole, { className: "absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" }))),
                react_1.default.createElement("div", { className: "space-y-2" },
                    react_1.default.createElement(label_1.Label, { htmlFor: "referralCode" }, "Referral Code"),
                    react_1.default.createElement("div", { className: "relative" },
                        react_1.default.createElement(input_1.Input, { id: "referralCode", type: "text", placeholder: "Enter referral code", value: referralCode, onChange: (e) => setReferralCode(e.target.value), className: "pl-10" }),
                        react_1.default.createElement(lucide_react_1.Ticket, { className: "absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" }))),
                react_1.default.createElement(button_1.Button, { className: "w-full", onClick: handleVerification, disabled: !password || isLoading }, isLoading ? "Verifying..." : "Complete Registration")))));
}
exports.default = verifyPassword;
