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
exports.EmailVerificationCard = EmailVerificationCard;
const js_cookie_1 = require("js-cookie");
const react_1 = require("react");
const button_1 = require("@/components/ui/button.js");
const card_1 = require("@/components/ui/card.js");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
const react_redux_1 = require("react-redux");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const access_token = js_cookie_1.default.get("access_token");
function EmailVerificationCard({ email }) {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isVerified, setIsVerified] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { username } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const handleVerification = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            setIsLoading(true);
            const response = yield axios_1.default.post(`/api/auth/verify-email`, {
                username: username,
                email: email,
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            dispatch((0, successSlice_1.showSuccess)("An email has been sent for verification"));
            setIsVerified(true);
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                const errorMessage = typeof ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.detail) === "string"
                    ? error.response.data.detail
                    : "An error occurred.";
                dispatch((0, errorSlice_1.showError)(errorMessage));
            }
            else {
                dispatch((0, errorSlice_1.showError)("Failed send email. Please try again."));
            }
        }
        finally {
            setIsLoading(false);
        }
    });
    return (React.createElement(card_1.Card, { className: "w-full" },
        React.createElement(card_1.CardHeader, null,
            React.createElement("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4" },
                React.createElement(lucide_react_1.MailCheck, { className: "w-6 h-6 text-primary" })),
            React.createElement("h2", { className: "text-2xl font-semibold text-center" }, "Verify Your Email")),
        React.createElement(card_1.CardContent, null,
            React.createElement("p", { className: "text-center text-muted-foreground mb-4" },
                "Please verify your email address:",
                React.createElement("span", { className: "block font-medium text-foreground mt-1" }, email))),
        React.createElement(card_1.CardFooter, { className: "flex justify-center" },
            React.createElement(button_1.Button, { className: "w-full", onClick: handleVerification, disabled: isLoading || isVerified }, isLoading ? (React.createElement(React.Fragment, null,
                React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Verifying...")) : isVerified ? (React.createElement(React.Fragment, null,
                React.createElement(lucide_react_1.MailCheck, { className: "mr-2 h-4 w-4" }),
                "Verified")) : ("Verify Email")))));
}
