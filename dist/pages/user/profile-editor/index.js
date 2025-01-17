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
const useAuth_1 = require("@/hooks/useAuth.js");
const axios_1 = require("axios");
const UserSideBar_1 = require("@/components/UserSideBar.js");
const email_verification_card_1 = require("@/components/email-verification-card.js");
const button_1 = require("@/components/ui/button.js");
const input_1 = require("@/components/ui/input.js");
const label_1 = require("@/components/ui/label.js");
const card_1 = require("@/components/ui/card.js");
const avatar_1 = require("@/components/ui/avatar.js");
const lucide_react_1 = require("lucide-react");
const react_redux_1 = require("react-redux");
const modal_success_1 = require("@/components/modal-success.js");
const modal_error_1 = require("@/components/modal-error.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
const modal_confirm_1 = require("@/components/modal-confirm.js");
const confirmSlice_1 = require("@/redux/slices/confirmSlice.js");
const updateProfileSlice_1 = require("@/redux/slices/updateProfileSlice.js");
const js_cookie_1 = require("js-cookie");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const access_token = js_cookie_1.default.get("access_token");
const ProfileEditor = () => {
    const user = (0, useAuth_1.default)();
    const user_id = user === null || user === void 0 ? void 0 : user.id;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { username, is_verified, email, image, loading } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const { updateUsername, updateEmail, updateImage } = (0, react_redux_1.useSelector)((state) => state.updateProfile);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const { isConfirmationOpen, confirmationMessage, onConfirm } = (0, react_redux_1.useSelector)((state) => state.confirm);
    const [isEditingUsername, setIsEditingUsername] = (0, react_1.useState)(false);
    const [isEditingEmail, setIsEditingEmail] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleFileChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const validImageTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];
        if (!validImageTypes.includes(file.type)) {
            dispatch((0, errorSlice_1.showError)("Invalid file type. Only JPEG, PNG, GIV and WebP are allowed."));
            return;
        }
        const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSizeInBytes) {
            dispatch((0, errorSlice_1.showError)("File size exceeds 1MB. Please upload a smaller image."));
            return;
        }
        dispatch((0, updateProfileSlice_1.setUpdateImage)(file));
        const formData = new FormData();
        formData.append("image", file);
        setIsLoading(true);
        try {
            const response = yield axios_1.default.post(`/api/profile/upload-pic`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Replace `access_token` with your actual access token variable
                    "Content-Type": "multipart/form-data",
                },
            });
            const updatedImageUrl = response.data.imageUrl;
            dispatch((0, updateProfileSlice_1.setUpdateImage)(updatedImageUrl));
            dispatch((0, successSlice_1.showSuccess)("Profile picture updated successfully!"));
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                const errorMessage = typeof ((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.detail) === "string"
                    ? error.response.data.detail
                    : "An error occurred.";
                dispatch((0, errorSlice_1.showError)(errorMessage));
            }
            else {
                dispatch((0, errorSlice_1.showError)("Failed to update profile picture. Please try again."));
            }
        }
        finally {
            setIsLoading(false);
        }
    });
    const handleUsernameUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (updateUsername.trim()) {
            if (updateUsername.length > 50) {
                dispatch((0, errorSlice_1.showError)("Username cannot be more than 50 characters!"));
                return;
            }
            setIsLoading(true);
            try {
                const response = yield axios_1.default.patch(`/api/profile/username/${user_id}`, {
                    username: updateUsername,
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                dispatch((0, updateProfileSlice_1.setUpdateUsername)(updateUsername));
                dispatch((0, successSlice_1.showSuccess)("Username updated successfully!"));
                setIsEditingUsername(false);
            }
            catch (error) {
                if (error instanceof axios_1.AxiosError && error.response) {
                    const errorMessage = typeof ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.detail) === "string"
                        ? error.response.data.detail
                        : "An error occurred.";
                    dispatch((0, errorSlice_1.showError)(errorMessage));
                }
                else {
                    dispatch((0, errorSlice_1.showError)("Failed to update username. Please try again."));
                }
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            dispatch((0, errorSlice_1.showError)("Username cannot be empty!"));
        }
    });
    const handleEmailUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
        if (updateEmail.trim()) {
            dispatch((0, confirmSlice_1.showConfirmation)({
                message: "Are you sure you want to update your email?",
                onConfirm: () => __awaiter(void 0, void 0, void 0, function* () {
                    var _a;
                    setIsLoading(true);
                    try {
                        const response = yield axios_1.default.patch(`/api/profile/email/${user_id}`, {
                            email: updateEmail,
                        }, {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        });
                        dispatch((0, updateProfileSlice_1.setUpdateEmail)(updateEmail));
                        dispatch((0, successSlice_1.showSuccess)("Email updated successfully!"));
                        setIsEditingEmail(false);
                    }
                    catch (error) {
                        if (error instanceof axios_1.AxiosError && error.response) {
                            const errorMessage = typeof ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.detail) === "string"
                                ? error.response.data.detail
                                : "An error occurred.";
                            dispatch((0, errorSlice_1.showError)(errorMessage));
                        }
                        else {
                            dispatch((0, errorSlice_1.showError)("Failed to update email. Please try again."));
                        }
                    }
                    finally {
                        setIsLoading(false);
                    }
                }),
            }));
        }
        else {
            dispatch((0, errorSlice_1.showError)("Email cannot be empty!"));
        }
    });
    (0, react_1.useEffect)(() => {
        if (username) {
            dispatch((0, updateProfileSlice_1.setUpdateUsername)(username));
        }
        if (email) {
            dispatch((0, updateProfileSlice_1.setUpdateEmail)(email));
        }
    }, [dispatch, username, email]);
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white mt-[11vh] p-8" },
        isLoading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = "/";
            }, successMessage: successMessage }),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => {
                dispatch((0, errorSlice_1.hideError)());
            }, errorMessage: errorMessage }),
        react_1.default.createElement(modal_confirm_1.default, { isOpen: isConfirmationOpen, message: confirmationMessage || "Are you sure you want to proceed?", onConfirm: () => {
                if (onConfirm) {
                    onConfirm();
                }
                dispatch((0, confirmSlice_1.hideConfirmation)());
            }, onClose: () => dispatch((0, confirmSlice_1.hideConfirmation)()) }),
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                react_1.default.createElement(UserSideBar_1.UserSidebar, null),
                react_1.default.createElement("div", { className: "min-h-screen bg-white rounded-lg" },
                    react_1.default.createElement("div", { className: "max-w-4xl space-y-6 sm:space-y-8 md:w-screen bg-white" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("h1", { className: "text-2xl text-gray-800 font-semibold" }, "My Profile"),
                            react_1.default.createElement("p", { className: "text-muted-foreground" }, "Manage your Profile here")),
                        react_1.default.createElement("div", { className: "space-y-6" },
                            react_1.default.createElement(card_1.Card, { style: {
                                    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
                                } },
                                react_1.default.createElement(card_1.CardHeader, null,
                                    react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2 text-lg sm:text-xl" },
                                        react_1.default.createElement(lucide_react_1.Camera, { className: "w-5 h-5" }),
                                        "Profile Picture")),
                                react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                    react_1.default.createElement("div", { className: "flex flex-col items-center gap-4" },
                                        react_1.default.createElement(avatar_1.Avatar, { className: "w-24 h-24 sm:w-32 sm:h-32" },
                                            react_1.default.createElement(avatar_1.AvatarImage, { src: updateImage
                                                    ? URL.createObjectURL(updateImage) // Use the selected image
                                                    : image || undefined // Fallback to the original image
                                                , alt: "Profile picture", className: "w-full h-full object-cover" }),
                                            react_1.default.createElement(avatar_1.AvatarFallback, null,
                                                react_1.default.createElement(lucide_react_1.User, { className: "w-8 h-8 sm:w-12 sm:h-12" }))),
                                        react_1.default.createElement("div", { className: "flex flex-col sm:flex-row w-full items-center justify-center gap-4" },
                                            react_1.default.createElement(input_1.Input, { type: "file", accept: "image/*", onChange: handleFileChange, className: "w-full max-w-xs text-sm sm:text-base", id: "picture-upload" }),
                                            react_1.default.createElement(button_1.Button, { onClick: () => { var _a; return (_a = document.getElementById("picture-upload")) === null || _a === void 0 ? void 0 : _a.click(); }, className: "w-full sm:w-auto" }, "Update Picture"))))),
                            react_1.default.createElement(card_1.Card, { style: {
                                    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
                                } },
                                react_1.default.createElement(card_1.CardHeader, null,
                                    react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2 text-lg sm:text-xl" },
                                        react_1.default.createElement(lucide_react_1.User, { className: "w-5 h-5" }),
                                        "Username")),
                                react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                    react_1.default.createElement("div", { className: "flex flex-col gap-4" },
                                        react_1.default.createElement("div", { className: "grid w-full items-center gap-1.5" },
                                            react_1.default.createElement(label_1.Label, { htmlFor: "username" }, "Current Username"),
                                            isEditingUsername ? (react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-2" },
                                                react_1.default.createElement(input_1.Input, { type: "text", id: "username", value: updateUsername, onChange: (e) => dispatch((0, updateProfileSlice_1.setUpdateUsername)(e.target.value)), className: "w-full sm:max-w-md" }),
                                                react_1.default.createElement("div", { className: "flex gap-2 mt-2 sm:mt-0" },
                                                    react_1.default.createElement(button_1.Button, { onClick: handleUsernameUpdate, className: "flex-1 sm:flex-none" }, "Save"),
                                                    react_1.default.createElement(button_1.Button, { variant: "outline", onClick: () => setIsEditingUsername(false), className: "flex-1 sm:flex-none" }, "Cancel")))) : (react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-2 items-start sm:items-center" },
                                                react_1.default.createElement("span", { className: "text-lg" }, username),
                                                react_1.default.createElement(button_1.Button, { onClick: () => setIsEditingUsername(true), className: "w-full sm:w-auto" }, "Edit"))))))),
                            react_1.default.createElement(card_1.Card, { style: {
                                    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
                                } },
                                react_1.default.createElement(card_1.CardHeader, null,
                                    react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2 text-lg sm:text-xl" },
                                        react_1.default.createElement(lucide_react_1.Mail, { className: "w-5 h-5" }),
                                        "Email Address")),
                                react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                    react_1.default.createElement("div", { className: "flex flex-col gap-4" },
                                        react_1.default.createElement("div", { className: "grid w-full items-center gap-1.5" },
                                            react_1.default.createElement(label_1.Label, { htmlFor: "email" }, "Current Email"),
                                            isEditingEmail ? (react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-2" },
                                                react_1.default.createElement(input_1.Input, { type: "email", id: "email", value: updateEmail !== null && updateEmail !== void 0 ? updateEmail : "", onChange: (e) => dispatch((0, updateProfileSlice_1.setUpdateEmail)(e.target.value)), className: "w-full sm:max-w-md" }),
                                                react_1.default.createElement("div", { className: "flex gap-2 mt-2 sm:mt-0" },
                                                    react_1.default.createElement(button_1.Button, { onClick: handleEmailUpdate, className: "flex-1 sm:flex-none" }, "Save"),
                                                    react_1.default.createElement(button_1.Button, { variant: "outline", onClick: () => setIsEditingEmail(false), className: "flex-1 sm:flex-none" }, "Cancel")))) : (react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-2 items-start sm:items-center" },
                                                react_1.default.createElement("span", { className: "text-lg break-all sm:break-normal" }, email),
                                                react_1.default.createElement(button_1.Button, { onClick: () => setIsEditingEmail(true), className: "w-full sm:w-auto" }, "Edit"))))))),
                            react_1.default.createElement(card_1.Card, { style: {
                                    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
                                } },
                                react_1.default.createElement(card_1.CardHeader, null,
                                    react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2 text-lg sm:text-xl" },
                                        react_1.default.createElement(lucide_react_1.Mail, { className: "w-5 h-5" }),
                                        "Reset Password")),
                                react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                    react_1.default.createElement(button_1.Button, { onClick: () => (window.location.href = "/auth/passwordReset"), className: "w-full sm:w-auto" }, "Reset"))),
                            !is_verified && (react_1.default.createElement("div", { className: "flex items-center justify-center bg-gradient-to-b from-background to-muted", style: {
                                    boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.1), 0 4px 3px rgba(0, 0, 0, 0.08)",
                                } },
                                react_1.default.createElement(email_verification_card_1.EmailVerificationCard, { email: email || "" }))))))))));
};
exports.default = ProfileEditor;
