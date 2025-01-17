"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;
const document_1 = require("next/document");
function Document() {
    return (React.createElement(document_1.Html, { lang: "en" },
        React.createElement(document_1.Head, null,
            React.createElement("link", { rel: "preconnect", href: "https://fonts.gstatic.com" }),
            React.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Parkinsans&display=swap" }),
            React.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Parkinsans:wght@700&display=swap" }),
            React.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=login,person,shopping_cart" }),
            React.createElement("style", null, `
            .material-symbols-outlined {
              font-variation-settings: 
                'FILL' 0, 
                'wght' 400, 
                'GRAD' 0, 
                'opsz' 48;
            }
          `)),
        React.createElement("body", { className: "antialiased" },
            React.createElement(document_1.Main, null),
            React.createElement(document_1.NextScript, null))));
}
