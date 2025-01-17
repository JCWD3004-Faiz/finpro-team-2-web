"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressList = AddressList;
const card_1 = require("@/components/ui/card.js");
const address_form_1 = require("@/components/address-form.js");
const button_1 = require("@/components/ui/button.js");
const lucide_react_1 = require("lucide-react");
function AddressList({ addresses, onAddAddress, onDeleteAddress, onSetDefault }) {
    if (addresses.length === 0) {
        return (React.createElement(card_1.Card, { className: "border-dashed" },
            React.createElement(card_1.CardContent, { className: "flex flex-col items-center justify-center py-12 text-center" },
                React.createElement("div", { className: "bg-primary/10 p-4 rounded-full mb-4" },
                    React.createElement(lucide_react_1.MapPin, { className: "h-8 w-8 text-primary" })),
                React.createElement("h2", { className: "text-xl font-semibold mb-2 text-foreground" }, "No addresses yet"),
                React.createElement("p", { className: "max-w-sm text-muted-foreground mb-6" }, "Add your first delivery address to start ordering groceries"),
                React.createElement("div", { className: "w-full max-w-md" },
                    React.createElement(address_form_1.NewAddressForm, { onAdd: onAddAddress })))));
    }
    return (React.createElement("div", { className: "grid gap-4" },
        addresses.map((address, index) => (React.createElement("div", { key: address.address_id, className: "animate-in fade-in slide-in-from-bottom-4", style: { animationDelay: `${index * 100}ms` } },
            React.createElement(card_1.Card, { className: `group transition-all duration-200 hover:shadow-md ${address.is_default ? "border-primary bg-primary/5" : ""}` },
                React.createElement(card_1.CardContent, { className: "flex items-center gap-4 p-6" },
                    React.createElement("div", { className: `p-2 rounded-lg ${address.is_default ? "bg-primary/10" : "bg-secondary"}` },
                        React.createElement(lucide_react_1.MapPin, { className: `h-5 w-5 ${address.is_default ? "text-primary" : "text-muted-foreground"}` })),
                    React.createElement("div", { className: "flex-1 min-w-0" },
                        React.createElement("div", { className: "flex items-center gap-2 mb-1" },
                            React.createElement("h3", { className: "font-semibold truncate" }, address.address),
                            address.is_default && (React.createElement("span", { className: "bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium" }, "Default"))),
                        React.createElement("p", { className: "text-muted-foreground text-sm truncate" }, address.city_name)),
                    React.createElement("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" },
                        !address.is_default && (React.createElement(button_1.Button, { variant: "outline", size: "icon", onClick: () => onSetDefault(address.address_id), title: "Set as default", className: "h-8 w-8" },
                            React.createElement(lucide_react_1.Check, { className: "h-4 w-4" }))),
                        !address.is_default && (React.createElement(button_1.Button, { variant: "destructive", size: "icon", onClick: () => onDeleteAddress(address.address_id), title: "Delete address", className: "h-8 w-8" },
                            React.createElement(lucide_react_1.Trash2, { className: "h-4 w-4" }))))))))),
        addresses.length < 4 && (React.createElement("div", { className: "animate-in fade-in slide-in-from-bottom-4", style: { animationDelay: `${addresses.length * 100}ms` } },
            React.createElement(address_form_1.NewAddressForm, { onAdd: onAddAddress })))));
}
