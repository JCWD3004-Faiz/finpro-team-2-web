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
const input_1 = require("@/components/ui/input.js");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("zod");
const zod_2 = require("@hookform/resolvers/zod");
const form_1 = require("@/components/ui/form.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const react_redux_1 = require("react-redux");
const axios_1 = require("axios");
const passwordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters"),
});
function ResetPassword() {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const params = (0, navigation_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(passwordSchema),
        defaultValues: {
            password: "",
        },
    });
    const onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        setIsLoading(true);
        try {
            const response = yield axios_1.default.post("/api/auth/reset-confirm", // Endpoint URL
            { password: values.password }, // Pass the password as the payload
            {
                headers: {
                    Authorization: `Bearer ${params.token}`
                },
            });
            dispatch((0, successSlice_1.showSuccess)("Password reset successfull"));
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
    return (react_1.default.createElement("div", { className: "min-h-screen bg-white text-gray-800 bg-background flex items-center justify-center p-4" },
        isLoading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = "/auth/login-page";
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => {
                dispatch((0, errorSlice_1.hideError)());
            }, errorMessage: errorMessage }),
        react_1.default.createElement("div", { className: "w-full max-w-md space-y-8" },
            react_1.default.createElement("div", { className: "text-center space-y-2" },
                react_1.default.createElement("div", { className: "flex justify-center" },
                    react_1.default.createElement("div", { className: "rounded-full bg-primary/10 p-4" },
                        react_1.default.createElement(lucide_react_1.KeyIcon, { className: "h-8 w-8 text-primary" }))),
                react_1.default.createElement("h1", { className: "text-2xl font-semibold tracking-tight" }, "Reset Password"),
                react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Please enter your new password below")),
            react_1.default.createElement(form_1.Form, Object.assign({}, form),
                react_1.default.createElement("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6" },
                    react_1.default.createElement(form_1.FormField, { control: form.control, name: "password", render: ({ field }) => (react_1.default.createElement(form_1.FormItem, null,
                            react_1.default.createElement("div", { className: "relative" },
                                react_1.default.createElement(form_1.FormControl, null,
                                    react_1.default.createElement(input_1.Input, Object.assign({}, field, { type: showPassword ? "text" : "password", placeholder: "Enter new password", className: "pr-10" }))),
                                react_1.default.createElement("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-2.5 text-muted-foreground hover:text-foreground" }, showPassword ? (react_1.default.createElement(lucide_react_1.EyeOffIcon, { className: "h-5 w-5" })) : (react_1.default.createElement(lucide_react_1.EyeIcon, { className: "h-5 w-5" })))),
                            react_1.default.createElement(form_1.FormMessage, null))) }),
                    react_1.default.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? "Resetting..." : "Reset Password"))))));
}
exports.default = ResetPassword;
