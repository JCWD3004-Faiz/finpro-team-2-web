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
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const getProductsSlice_1 = require("@/redux/slices/getProductsSlice.js");
const cartSlice_1 = require("@/redux/slices/cartSlice.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const react_toastify_1 = require("react-toastify");
const js_cookie_1 = require("js-cookie");
const cartSlice_2 = require("@/redux/slices/cartSlice.js");
const formatCurrency_1 = require("@/utils/formatCurrency.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
function SingleProductPage() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { loading, error, productDetailUser } = (0, react_redux_1.useSelector)((state) => state.getProducts);
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const isVerified = user === null || user === void 0 ? void 0 : user.is_verified;
    const { addresses } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const current_store_id = Number(js_cookie_1.default.get("current_store_id"));
    const { cartItems } = (0, react_redux_1.useSelector)((state) => state.cart);
    const params = (0, navigation_1.useParams)();
    const productId = params === null || params === void 0 ? void 0 : params.product_id; // Get the productId from URL
    const [selectedImage, setSelectedImage] = (0, react_1.useState)(productDetailUser.product_images[0].product_image || ""); // Default to main image
    const [quantity, setQuantity] = (0, react_1.useState)(1);
    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    (0, react_1.useEffect)(() => {
        if (productId) {
            const inventoryId = Number(productId); // Replace with the inventory ID you want to fetch
            dispatch((0, getProductsSlice_1.fetchProductDetailsByInventoryId)(inventoryId))
                .unwrap()
                .then((data) => { })
                .catch((err) => {
                console.error("Error fetching product details:", err);
            });
        }
    }, [dispatch, productId]);
    (0, react_1.useEffect)(() => {
        var _a;
        // Update selectedImage only when productDetailUser is updated and valid
        if (((_a = productDetailUser === null || productDetailUser === void 0 ? void 0 : productDetailUser.product_images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSelectedImage(productDetailUser.product_images[0].product_image);
        }
    }, [productDetailUser]);
    const handleAddToCart = () => __awaiter(this, void 0, void 0, function* () {
        if (user_id) {
            if (addresses.length === 0) {
                react_toastify_1.toast.info("You must set an address before shopping.");
                return;
            }
            if (current_store_id === 28) {
                react_toastify_1.toast.error("Invalid store. Please change your address.");
                return;
            }
            if (cartItems.length > 0 && cartItems[0].store_id !== current_store_id) {
                react_toastify_1.toast.error("You cannot purchase from a different store");
                return;
            }
            if (isVerified === false) {
                react_toastify_1.toast.error("Please verify your email");
                return;
            }
            try {
                const resultAction = yield dispatch((0, cartSlice_1.addToCart)({ user_id, inventory_id: Number(productId) }));
                if (cartSlice_1.addToCart.rejected.match(resultAction)) {
                    react_toastify_1.toast.error(String(resultAction.payload));
                    return;
                }
                react_toastify_1.toast.success("Item added to cart!");
                dispatch((0, cartSlice_2.fetchCartItems)(user_id));
            }
            catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
        else {
            react_toastify_1.toast.info("Sign in to start shopping!");
        }
    });
    return (react_1.default.createElement("div", { className: "bg-white min-h-screen flex justify-center p-8 text-gray-900", style: { marginTop: "11vh" } },
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: "flex flex-col lg:flex-row w-full max-w-6xl gap-10" },
            react_1.default.createElement("div", { className: "flex flex-col items-center w-full lg:w-1/2" },
                react_1.default.createElement("img", { src: selectedImage || productDetailUser.product_images[0].product_image, alt: productDetailUser.product_name, className: "w-full h-[60vh] object-cover" }),
                react_1.default.createElement("div", { className: "flex sm:gap-4 mt-4" }, productDetailUser.product_images.map((image, index) => (react_1.default.createElement("img", { key: index, src: image.product_image, alt: `Thumbnail ${index}`, className: "w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-cover cursor-pointer border", onClick: () => handleImageSelect(image.product_image) }))))),
            react_1.default.createElement("div", { className: "w-full lg:w-1/2" },
                react_1.default.createElement("h1", { className: "text-6xl font-bold" }, productDetailUser.product_name),
                productDetailUser.discount_type &&
                    productDetailUser.discount_value ? (react_1.default.createElement("div", { className: "mt-4" },
                    react_1.default.createElement("p", { className: "text-xl text-gray-500 line-through" }, (0, formatCurrency_1.formatCurrency)(productDetailUser.price)),
                    react_1.default.createElement("p", { className: "text-2xl font-bold text-red-600" }, (0, formatCurrency_1.formatCurrency)(productDetailUser.discounted_price)),
                    react_1.default.createElement("p", { className: "text-sm text-green-500 mt-2" },
                        "Save",
                        " ",
                        productDetailUser.discount_type === "NOMINAL"
                            ? `${(0, formatCurrency_1.formatCurrency)(productDetailUser.discount_value)}`
                            : `${productDetailUser.discount_value}%`,
                        " ",
                        "OFF!"))) : (react_1.default.createElement("div", { className: "mt-4" },
                    react_1.default.createElement("p", { className: "text-xl font-bold text-gray-800" }, (0, formatCurrency_1.formatCurrency)(productDetailUser.price)))),
                react_1.default.createElement("div", { className: "border-b border-gray-300 my-4" },
                    react_1.default.createElement("p", { className: "text-gray-700 font-medium" },
                        "Stock:",
                        " ",
                        productDetailUser.user_stock > 0
                            ? productDetailUser.user_stock
                            : "Out of Stock")),
                react_1.default.createElement("p", { className: "text-sm text-gray-600" }, productDetailUser.description),
                react_1.default.createElement("button", { onClick: (e) => {
                        e.stopPropagation();
                        handleAddToCart();
                    }, className: `w-full py-3 mt-6 transition-colors duration-200 text-xl ${productDetailUser.user_stock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black text-white font-bold hover:bg-neutral-600"}`, disabled: productDetailUser.user_stock === 0 }, productDetailUser.user_stock === 0
                    ? "Out of Stock"
                    : "Add to Cart")))));
}
exports.default = SingleProductPage;
