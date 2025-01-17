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
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const https_1 = require("https");
/* const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
}); */
const axiosInstance = axios_1.default.create({
    baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false,
    }),
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => __awaiter(void 0, void 0, void 0, function* () {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = js_cookie_1.default.get("refreshToken");
        if (refreshToken) {
            try {
                const refreshResponse = yield axiosInstance.post("/api/auth/refresh-token", {
                    refreshToken: refreshToken,
                });
                const { accessToken } = refreshResponse.data.data.refreshToken;
                if (!accessToken) {
                    throw new Error("No access token returned from refresh endpoint");
                }
                js_cookie_1.default.set("access_token", accessToken, { expires: 1 });
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            }
            catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                alert("Session expired. Please log in again.");
                js_cookie_1.default.remove("access_token");
                js_cookie_1.default.remove("refreshToken");
                window.location.href = "/auth/login-page";
                return Promise.reject(refreshError);
            }
        }
        else {
            console.error("No refresh token available");
            alert("No session found. Please log in again.");
            js_cookie_1.default.remove("access_token");
            js_cookie_1.default.remove("refreshToken");
            window.location.href = "/auth/login-page";
            return Promise.reject(error);
        }
    }
    console.error("Response error:", error);
    return Promise.reject(error);
}));
exports.default = axiosInstance;
