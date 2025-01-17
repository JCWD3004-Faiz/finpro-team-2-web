"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = OrderStatus;
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils.js");
const steps = [
    { key: 'PENDING_PAYMENT', icon: lucide_react_1.CircleEllipsis, label: 'Pending Payment' },
    { key: 'AWAITING_CONFIRMATION', icon: lucide_react_1.Clock, label: 'Awaiting Confirmation' },
    { key: 'PROCESSING', icon: lucide_react_1.Package, label: 'Processing' },
    { key: 'SENT', icon: lucide_react_1.Truck, label: 'Sent' }
];
function OrderStatus({ status }) {
    const currentIdx = steps.findIndex(step => step.key === status);
    return (React.createElement("div", { className: "w-full pt-2" },
        React.createElement("div", { className: "relative mb-8" },
            React.createElement("div", { className: "h-1 bg-muted absolute top-4 left-[15%] right-[15%] md:left-0 md:right-0" },
                React.createElement("div", { className: "h-full bg-primary transition-all duration-300", style: {
                        width: `${(currentIdx / (steps.length - 1)) * 100}%`
                    } })),
            React.createElement("div", { className: "flex justify-between relative px-0 md:px-4" }, steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                return (React.createElement("div", { key: step.key, className: (0, utils_1.cn)("flex flex-col items-center w-1/4 px-1 md:px-0", (isCompleted || isCurrent) ? "text-primary" : "text-muted-foreground") },
                    React.createElement("div", { className: (0, utils_1.cn)("w-8 h-8 rounded-full flex items-center justify-center mb-2 relative z-10", "transition-colors duration-200", {
                            "bg-primary text-primary-foreground": isCompleted || isCurrent,
                            "bg-muted text-muted-foreground": !isCompleted && !isCurrent
                        }) },
                        React.createElement(Icon, { className: "w-4 h-4" })),
                    React.createElement("span", { className: "text-[10px] md:text-xs font-medium text-center leading-tight" }, step.label)));
            })))));
}
