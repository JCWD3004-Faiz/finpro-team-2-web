"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAddressForm = NewAddressForm;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button.js");
const input_1 = require("@/components/ui/input.js");
const card_1 = require("@/components/ui/card.js");
const globalSlice_1 = require("@/redux/slices/globalSlice.js");
const userProfileSlice_1 = require("@/redux/slices/userProfileSlice.js");
function NewAddressForm({ onAdd }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [address, setAddress] = (0, react_1.useState)("");
    const [city_name, setCity_name] = (0, react_1.useState)("");
    const [city_id, setCity_id] = (0, react_1.useState)(null);
    const { cities } = (0, react_redux_1.useSelector)((state) => state.global);
    const { locationSuggestions, suggestionsPosition } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const handleSubmit = () => {
        if (!isValidLocation(city_name)) {
            alert('Please select a valid location.');
            return;
        }
        else if (address && city_name && city_id) {
            onAdd(address, city_name, Number(city_id));
            setAddress("");
            setCity_name("");
            setCity_id(null);
            setIsEditing(false);
        }
    };
    react_1.default.useEffect(() => {
        if (cities.length === 0) {
            dispatch((0, globalSlice_1.fetchCities)());
        }
    }, [dispatch, cities.length]);
    const isValidLocation = (location) => {
        return cities.some((city) => city.city_name.toLowerCase() === location.toLowerCase());
    };
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setCity_name(value);
        const filteredSuggestions = getLocationSuggestions(value);
        dispatch((0, userProfileSlice_1.setLocationSuggestions)(filteredSuggestions));
        const rect = e.target.getBoundingClientRect();
        dispatch((0, userProfileSlice_1.setSuggestionsPosition)({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
        }));
    };
    const getLocationSuggestions = (input) => {
        return cities.filter((city) => city.city_name.toLowerCase().includes(input.toLowerCase()));
    };
    const handleSuggestionClick = (suggestion) => {
        setCity_name(suggestion.city_name);
        setCity_id(suggestion.city_id);
        dispatch((0, userProfileSlice_1.setLocationSuggestions)([]));
    };
    if (!isEditing) {
        return (react_1.default.createElement(button_1.Button, { variant: "outline", className: "w-full flex items-center justify-center gap-2 h-24 border-2 border-dashed hover:border-primary hover:text-primary transition-colors", onClick: () => setIsEditing(true) },
            react_1.default.createElement(lucide_react_1.PlusCircle, { className: "h-5 w-5" }),
            react_1.default.createElement("span", null, "Add New Address")));
    }
    return (react_1.default.createElement(card_1.Card, { className: "border-2 border-primary animate-in fade-in slide-in-from-bottom-4" },
        react_1.default.createElement(card_1.CardContent, { className: "p-6 space-y-4" },
            react_1.default.createElement("div", { className: "space-y-2" },
                react_1.default.createElement(input_1.Input, { placeholder: "Address", value: address, onChange: (e) => setAddress(e.target.value), className: "transition-all duration-200 focus:ring-2 focus:ring-primary/20" }),
                react_1.default.createElement(input_1.Input, { placeholder: "City", value: city_name, onChange: handleLocationChange, className: "transition-all duration-200 focus:ring-2 focus:ring-primary/20" })),
            react_1.default.createElement("div", { className: "flex justify-end gap-2 pt-2" },
                react_1.default.createElement(button_1.Button, { variant: "ghost", onClick: () => setIsEditing(false), className: "hover:bg-destructive/10 hover:text-destructive" }, "Cancel"),
                react_1.default.createElement(button_1.Button, { onClick: handleSubmit }, "Save Address")),
            locationSuggestions.length > 0 && (react_1.default.createElement("div", { className: "absolute z-50 bg-white border border-gray-300 shadow-md rounded-lg max-h-40 overflow-auto", style: {
                    top: `${suggestionsPosition.top}px`,
                    left: `${suggestionsPosition.left}px`,
                    width: `${suggestionsPosition.width}px`,
                } }, locationSuggestions.map((suggestion, index) => (react_1.default.createElement("div", { key: index, onClick: () => handleSuggestionClick(suggestion), className: "px-4 py-2 hover:bg-indigo-100 cursor-pointer" }, suggestion.city_name))))))));
}
