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
const react_redux_1 = require("react-redux");
const SuperSidebar_1 = require("@/components/SuperSidebar.js");
const superAdminSlice_1 = require("@/redux/slices/superAdminSlice.js");
const globalSlice_1 = require("@/redux/slices/globalSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const modal_success_1 = require("@/components/modal-success.js");
const successSlice_1 = require("@/redux/slices/successSlice.js");
const modal_error_1 = require("@/components/modal-error.js");
const errorSlice_1 = require("@/redux/slices/errorSlice.js");
function CreateStore() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isSidebarOpen, loading } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { cities } = (0, react_redux_1.useSelector)((state) => state.global);
    const { locationSuggestions, suggestionsPosition } = (0, react_redux_1.useSelector)((state) => state.superAdmin);
    const { isSuccessOpen, successMessage } = (0, react_redux_1.useSelector)((state) => state.success);
    const { isErrorOpen, errorMessage } = (0, react_redux_1.useSelector)((state) => state.error);
    const [storeName, setStoreName] = (0, react_1.useState)('');
    const [storeLocation, setStoreLocation] = (0, react_1.useState)('');
    const [cityId, setCityId] = (0, react_1.useState)(null);
    react_1.default.useEffect(() => {
        if (cities.length === 0) {
            dispatch((0, globalSlice_1.fetchCities)());
        }
    }, [dispatch, cities.length]);
    const isValidLocation = (location) => {
        return cities.some((city) => city.city_name.toLowerCase() === location.toLowerCase());
    };
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                if (!isValidLocation(storeLocation)) {
                    alert('Please select a valid location.');
                    return;
                }
                const storeData = {
                    store_name: storeName,
                    store_location: storeLocation,
                    city_id: Number(cityId),
                };
                yield dispatch((0, superAdminSlice_1.createStore)(storeData)).unwrap();
                dispatch((0, successSlice_1.showSuccess)("Store successfully created"));
            }
            catch (error) {
                dispatch((0, errorSlice_1.showError)("Failed to create store"));
            }
        });
    }
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setStoreLocation(value);
        const filteredSuggestions = getLocationSuggestions(value);
        dispatch((0, superAdminSlice_1.setLocationSuggestions)(filteredSuggestions));
        const rect = e.target.getBoundingClientRect();
        dispatch((0, superAdminSlice_1.setSuggestionsPosition)({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        }));
    };
    const getLocationSuggestions = (input) => {
        return cities.filter((city) => city.city_name.toLowerCase().includes(input.toLowerCase()));
    };
    const handleSuggestionClick = (suggestion) => {
        setStoreLocation(suggestion.city_name);
        setCityId(suggestion.city_id);
        dispatch((0, superAdminSlice_1.setLocationSuggestions)([]));
    };
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen h-screen text-gray-800" },
        react_1.default.createElement(SuperSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: () => dispatch({ type: 'superAdmin/toggleSidebar' }) }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement(modal_error_1.default, { isOpen: isErrorOpen, onClose: () => dispatch((0, errorSlice_1.hideError)()), errorMessage: errorMessage }),
        react_1.default.createElement(modal_success_1.default, { isOpen: isSuccessOpen, onClose: () => {
                dispatch((0, successSlice_1.hideSuccess)());
                window.location.href = '/admin-super/stores';
            }, successMessage: successMessage }),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? 'md:ml-64' : ''} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-center text-gray-900 mb-10 tracking-wide" }, "Create Store"),
            react_1.default.createElement("form", { onSubmit: handleSubmit, className: "max-w-lg mx-auto bg-white p-6 rounded-md shadow-xl" },
                react_1.default.createElement("div", { className: "mb-4" },
                    react_1.default.createElement("label", { htmlFor: "store_name", className: "block text-gray-700 font-semibold mb-2" }, "Store Name"),
                    react_1.default.createElement("input", { id: "store_name", type: "text", value: storeName, onChange: (e) => setStoreName(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500", placeholder: "Enter store name", required: true })),
                react_1.default.createElement("div", { className: "mb-4 relative" },
                    react_1.default.createElement("label", { htmlFor: "store_location", className: "block text-gray-700 font-semibold mb-2" }, "Store Location"),
                    react_1.default.createElement("input", { id: "store_location", type: "text", value: storeLocation, onChange: handleLocationChange, className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500", placeholder: "Enter store location", required: true })),
                react_1.default.createElement("div", { className: "flex justify-center" },
                    react_1.default.createElement("button", { type: "submit", className: "bg-white text-indigo-600 font-semibold border-2 border-indigo-600 py-3 px-20 rounded-full hover:bg-indigo-600 hover:text-white transition-colors transform" }, "Submit")),
                locationSuggestions.length > 0 && (react_1.default.createElement("div", { className: "absolute z-50 bg-white border border-gray-300 shadow-md rounded-lg max-h-40 overflow-auto", style: {
                        top: `${suggestionsPosition.top}px`,
                        left: `${suggestionsPosition.left}px`,
                        width: `${suggestionsPosition.width}px`,
                    } }, locationSuggestions.map((suggestion, index) => (react_1.default.createElement("div", { key: index, onClick: () => handleSuggestionClick(suggestion), className: "px-4 py-2 hover:bg-indigo-100 cursor-pointer" }, suggestion.city_name)))))))));
}
exports.default = CreateStore;
