"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserSideBar_1 = require("@/components/UserSideBar.js");
const address_list_1 = require("@/components/address-list.js");
const react_redux_1 = require("react-redux");
const userProfileSlice_1 = require("@/redux/slices/userProfileSlice.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const useAuth_1 = require("@/hooks/useAuth.js");
function ManageAddress() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const user = (0, useAuth_1.default)();
    const user_id = Number(user === null || user === void 0 ? void 0 : user.id);
    const { addresses, loading } = (0, react_redux_1.useSelector)((state) => state.userProfile);
    const handleAddAddress = (address, city_name, city_id) => {
        if (user_id) {
            dispatch((0, userProfileSlice_1.addAddress)({ user_id, address, city_name, city_id }));
        }
    };
    const handleDeleteAddress = (address_id) => {
        if (user_id) {
            dispatch((0, userProfileSlice_1.deleteAddress)({ user_id, address_id }));
        }
    };
    const handleSetDefault = (address_id) => {
        if (user_id) {
            dispatch((0, userProfileSlice_1.setDefaultAddress)({ user_id, address_id }));
        }
    };
    return (react_1.default.createElement("div", { className: "min-h-screen w-screen bg-white mt-[11vh] p-8" },
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto" },
            react_1.default.createElement("div", { className: "flex flex-col md:flex-row gap-8" },
                react_1.default.createElement(UserSideBar_1.UserSidebar, null),
                react_1.default.createElement("main", { className: "flex-1" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h1", { className: "text-2xl text-gray-800 font-semibold" }, "Addresses"),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, "Manage your delivery addresses")),
                    react_1.default.createElement("div", { className: "mx-auto py-8 max-w-4xl" }, loading ? (react_1.default.createElement(LoadingVignette_1.default, null)) : (react_1.default.createElement(address_list_1.AddressList, { addresses: addresses, onAddAddress: handleAddAddress, onDeleteAddress: handleDeleteAddress, onSetDefault: handleSetDefault }))))))));
}
exports.default = ManageAddress;
