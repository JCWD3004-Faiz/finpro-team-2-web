"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const landingSlice_1 = require("@/redux/slices/landingSlice.js");
const useAuth_1 = require("@/hooks/useAuth.js");
const userProfileSlice_1 = require("@/redux/slices/userProfileSlice.js");
const js_cookie_1 = require("js-cookie");
const md_1 = require("react-icons/md");
const LocationHeader = () => {
    const access_token = js_cookie_1.default.get('access_token');
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { closestStore, error } = (0, react_redux_1.useSelector)((state) => state.landing);
    const { addresses } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const defaultStore = {
        store_id: 28,
        store_name: "Default Store",
        store_location: "Fetching location...",
    };
    const getGeolocation = () => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve({ lat, lon });
                }, () => reject());
            }
            else {
                reject();
            }
        });
    };
    (0, react_1.useEffect)(() => {
        if (user_id) {
            dispatch((0, userProfileSlice_1.fetchAddresses)(user_id));
        }
        else if (!access_token) {
            getGeolocation()
                .then(({ lat, lon }) => {
                dispatch((0, landingSlice_1.setLocation)({ lat, lon }));
                dispatch((0, landingSlice_1.fetchClosestStore)({ lat, lon }));
            })
                .catch(() => {
                setIsLoading(false);
            });
        }
    }, [dispatch, user_id, access_token]);
    (0, react_1.useEffect)(() => {
        if (addresses.length > 0) {
            setIsLoading(false);
        }
    }, [addresses]);
    (0, react_1.useEffect)(() => {
        if (isLoading)
            return;
        if (user_id) {
            if (addresses.length > 0) {
                dispatch((0, landingSlice_1.fetchClosestStoreById)(user_id));
            }
            else {
                setIsLoading(false);
            }
        }
        else {
            getGeolocation()
                .then(({ lat, lon }) => {
                dispatch((0, landingSlice_1.setLocation)({ lat, lon }));
                dispatch((0, landingSlice_1.fetchClosestStore)({ lat, lon }));
            })
                .catch(() => {
                setIsLoading(false);
            });
        }
    }, [dispatch, user_id, addresses, isLoading]);
    (0, react_1.useEffect)(() => {
        if (closestStore) {
            setIsLoading(false);
        }
    }, [closestStore]);
    const storeToDisplay = closestStore || defaultStore;
    (0, react_1.useEffect)(() => {
        js_cookie_1.default.set('current_store_id', storeToDisplay.store_id.toString());
    }, [storeToDisplay]);
    // Conditional error message
    const distanceLimitError = error === "No stores found within 50 km.";
    return (react_1.default.createElement("header", { className: "fixed top-0 left-0 border-b border-black w-full h-[3vh] bg-white text-gray-800 z-50 flex items-center" },
        react_1.default.createElement("div", { className: "w-full flex items-center absolute left-0 right-0 text-xs md:text-sm md:static" },
            react_1.default.createElement("div", { className: "flex items-center absolute left-0 md:pl-2 md:flex-row md:static" }, distanceLimitError ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(md_1.MdLocationOff, null),
                react_1.default.createElement("p", null, distanceLimitError ? "No stores found. Please adjust your location." : storeToDisplay.store_location))) : (react_1.default.createElement(react_1.default.Fragment, null, user_id && addresses.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(md_1.MdLocationOn, null),
                react_1.default.createElement("p", null, storeToDisplay.store_location))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(md_1.MdLocationOff, null),
                user_id ? (react_1.default.createElement("p", null, "Please set an address to start shopping")) : (react_1.default.createElement("p", null, "Please log in to set an address"))))))),
            react_1.default.createElement("div", { className: "flex items-center absolute right-0 md:pl-4 md:flex-row md:static" },
                react_1.default.createElement(md_1.MdStore, null),
                react_1.default.createElement("p", null, storeToDisplay.store_name)))));
};
exports.default = LocationHeader;
