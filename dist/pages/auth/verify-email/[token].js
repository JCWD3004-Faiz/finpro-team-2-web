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
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
function VerifyEmail() {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isVerified, setIsVerified] = (0, react_1.useState)(false);
    const params = (0, navigation_1.useParams)();
    const verifyEmail = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            const response = yield axios_1.default.post("/api/auth/verify-confirm", {}, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });
            setIsVerified(true);
        }
        catch (error) {
            console.error("Verification failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    });
    return (react_1.default.createElement("main", { className: "min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 bg-gradient-to-b from-background to-muted/20 p-4" },
        react_1.default.createElement("div", { className: "text-center mb-8 max-w-md" },
            react_1.default.createElement("h1", { className: "text-2xl font-bold mb-3" }, "Email Verification"),
            react_1.default.createElement("p", { className: "text-muted-foreground mb-2" }, "Thank you for registering! Please click the button below to verify your email address."),
            react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "This helps us ensure the security of your account and keep you updated with important notifications.")),
        react_1.default.createElement(button_1.Button, { size: "lg", onClick: verifyEmail, disabled: isLoading || isVerified, className: "min-w-[200px]" }, isLoading ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Verifying")) : isVerified ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(lucide_react_1.MailCheck, { className: "mr-2 h-4 w-4" }),
            "Verified")) : ("Verify Email")),
        isVerified && (react_1.default.createElement("p", { className: "text-green-600 dark:text-green-400 mt-4 text-center" }, "Your email has been successfully verified! You can now close this page."))));
}
exports.default = VerifyEmail;
