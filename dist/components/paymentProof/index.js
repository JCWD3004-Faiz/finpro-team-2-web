"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProofSection = PaymentProofSection;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const button_1 = require("../ui/button.js");
function PaymentProofSection({ proof }) {
    if (!(proof === null || proof === void 0 ? void 0 : proof.pop_image)) {
        return (react_1.default.createElement("div", { className: "rounded-lg border border-dashed p-4 text-center text-muted-foreground" }, "No proof of payment uploaded"));
    }
    return (react_1.default.createElement("div", { className: "space-y-3" },
        react_1.default.createElement("div", { className: "relative overflow-hidden rounded-lg border bg-muted" },
            react_1.default.createElement("img", { src: proof.pop_image, alt: "Payment proof", className: "object-cover" })),
        react_1.default.createElement("div", { className: "flex items-center justify-between text-sm" },
            react_1.default.createElement("div", { className: "flex items-center gap-2 text-muted-foreground" },
                react_1.default.createElement(lucide_react_1.FileCheck, { className: "h-4 w-4" }),
                react_1.default.createElement("span", null,
                    "Uploaded on ",
                    new Date(proof === null || proof === void 0 ? void 0 : proof.created_at).toLocaleDateString())),
            react_1.default.createElement("a", { href: proof.pop_image, target: "_blank", rel: "noopener noreferrer" },
                react_1.default.createElement(button_1.Button, { variant: "outline", size: "sm", className: "gap-2" },
                    react_1.default.createElement(lucide_react_1.ExternalLink, { className: "h-4 w-4" }),
                    "View Full Image")))));
}
