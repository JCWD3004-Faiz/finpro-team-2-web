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
exports.default = ForgotPasswordPage;
const axios_1 = require("axios");
const react_1 = require("react");
const button_1 = require("@/components/ui/button.js");
const input_1 = require("@/components/ui/input.js");
const card_1 = require("@/components/ui/card.js");
const lucide_react_1 = require("lucide-react");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_error_1 = require("@/components/modal-error.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const react_redux_1 = require("react-redux");
function ForgotPasswordPage() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        setIsLoading(true);
        setIsSubmitting(true);
        try {
            const response = yield axios_1.default.post("/api/auth/reset-password", {
                email: email,
            });
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
            setSubmitted(true);
            setIsSubmitting(false);
        }
    });
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4" },
        isLoading && React.createElement(LoadingVignette_1.default, null),
        React.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => {
                dispatch((0, errorSlice_1.hideError)());
            }, errorMessage: errorMessage }),
        React.createElement(card_1.Card, { className: "w-full max-w-md" },
            React.createElement(card_1.CardHeader, { className: "space-y-2" },
                React.createElement(card_1.CardTitle, { className: "text-2xl font-bold text-center" }, "Forgot Password"),
                React.createElement(card_1.CardDescription, { className: "text-center" }, "Enter your email address and we'll send you a link to reset your password.")),
            React.createElement(card_1.CardContent, null, !submitted ? (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("div", { className: "relative" },
                        React.createElement(input_1.Input, { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), className: "pl-10", required: true }),
                        React.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }))),
                React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isSubmitting }, isSubmitting ? "Sending..." : "Reset Password"))) : (React.createElement("div", { className: "text-center text-sm text-gray-600" },
                "If an account exists for ",
                email,
                ", you will receive a password reset email shortly."))))));
}
function dispatch(arg0) {
    throw new Error("Function not implemented.");
}
