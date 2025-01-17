"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const js_cookie_1 = require("js-cookie");
const jwt_decode_1 = require("jwt-decode");
const useAuth = () => {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Only run on client side
        if (typeof window !== "undefined") {
            const access_token = js_cookie_1.default.get("access_token");
            if (access_token) {
                try {
                    const decoded = (0, jwt_decode_1.jwtDecode)(access_token);
                    setUser({
                        id: decoded.id,
                        role: decoded.role,
                        is_verified: decoded.is_verified
                    });
                }
                catch (error) {
                    setUser(null); // In case of token decoding failure, reset user to null
                }
            }
            else {
                setUser(null); // If no access token, reset user to null
            }
        }
    }, []); // Empty dependency array ensures this only runs once after mount
    return user; // Return the user or null
};
exports.default = useAuth;
