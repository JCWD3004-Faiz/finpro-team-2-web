"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const dialog_1 = require("@/components/ui/dialog.js");
const button_1 = require("@/components/ui/button.js");
const input_1 = require("@/components/ui/input.js");
const GiftVoucherModal = ({ isOpen, onClose, onGiftVoucher }) => {
    const [email, setEmail] = (0, react_1.useState)("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = () => {
        if (email) {
            onGiftVoucher(email);
            setEmail("");
            onClose();
        }
        else {
            alert("Please enter a valid email.");
        }
    };
    return (react_1.default.createElement(dialog_1.Dialog, { open: isOpen, onOpenChange: onClose },
        react_1.default.createElement(dialog_1.DialogContent, { className: "max-w-lg mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg" },
            react_1.default.createElement(dialog_1.DialogHeader, null,
                react_1.default.createElement(dialog_1.DialogTitle, null, "Gift Voucher")),
            react_1.default.createElement(input_1.Input, { type: "email", value: email, onChange: handleEmailChange, placeholder: "Enter recipient's email", className: "w-full p-2 mb-4" }),
            react_1.default.createElement(dialog_1.DialogFooter, null,
                react_1.default.createElement(button_1.Button, { onClick: handleSubmit, className: " text-white mr-2" }, "Gift Voucher")))));
};
exports.default = GiftVoucherModal;
