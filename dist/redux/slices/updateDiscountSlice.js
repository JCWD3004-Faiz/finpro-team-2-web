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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDiscountImage = exports.setDiscountImage = exports.setDiscountEndDate = exports.setDiscountStartDate = exports.setDiscountValue = exports.fetchDiscountDetails = exports.saveUpdatedImage = exports.saveUpdatedStartDate = exports.saveUpdatedValue = exports.toggleIsActive = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const access_token = js_cookie_1.default.get("access_token");
const initialDiscountDetail = {
    discount_id: 0,
    inventory_id: 0,
    inventory_name: "",
    type: "",
    value: 0,
    min_purchase: 0,
    max_discount: 0,
    bogo_product_id: 0,
    bogo_product_name: "",
    description: "",
    is_active: false,
    image: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false,
};
const initialState = {
    discountDetail: initialDiscountDetail,
    loading: false,
    error: null,
    selectedImage: null
};
exports.toggleIsActive = (0, toolkit_1.createAsyncThunk)("updateDiscount/toggleIsActive", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ discount_id, currentStatus }, { rejectWithValue }) {
    var _c, _d;
    try {
        const updatedStatus = !currentStatus;
        const response = yield axios_1.default.patch(`/api/store-admin/discounts/value/${discount_id}`, { is_active: updatedStatus }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data; // Assuming API returns the updated object
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) || "Failed to toggle active status.");
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.saveUpdatedValue = (0, toolkit_1.createAsyncThunk)("updateDiscount/saveUpdatedValue", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ discount_id, value, type, }, { rejectWithValue }) {
    var _c, _d;
    try {
        if (value === null || value <= 0) {
            throw new Error("Value must be a positive number.");
        }
        if ((type === "PERCENTAGE" &&
            (value === null || value < 1 || value > 100)) ||
            (type === "NOMINAL" && (value === null || value <= 0))) {
            return rejectWithValue(type === "PERCENTAGE"
                ? "For percentage discounts, the value must be between 1 and 100."
                : "For nominal discounts, the value must be greater than 0.");
        }
        const response = yield axios_1.default.patch(`/api/store-admin/discounts/value/${discount_id}`, { value }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) || "Failed to update discount value.");
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.saveUpdatedStartDate = (0, toolkit_1.createAsyncThunk)("updateDiscount/saveUpdatedStartDate", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ discount_id, date, field, }, { rejectWithValue }) {
    var _c, _d;
    try {
        const response = yield axios_1.default.patch(`/api/store-admin/discounts/start/${discount_id}`, { [field]: date }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) ||
                "Failed to update discount start date.");
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.saveUpdatedImage = (0, toolkit_1.createAsyncThunk)("updateDiscount/saveUpdatedImage", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ discount_id, image }, { rejectWithValue }) {
    var _c, _d;
    try {
        const formData = new FormData();
        formData.append("image", image);
        const response = yield axios_1.default.patch(`/api/store-admin/discounts/image/${discount_id}`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) || "Failed to update discount image.");
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.fetchDiscountDetails = (0, toolkit_1.createAsyncThunk)("discounts/fetchDiscountDetails", (discountId_1, _a) => __awaiter(void 0, [discountId_1, _a], void 0, function* (discountId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/store-admin/discounts/details/${discountId}`);
        return response.data.discount;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch discount details.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const updateDiscountSlice = (0, toolkit_1.createSlice)({
    name: "updateDiscount",
    initialState,
    reducers: {
        setDiscountValue: (state, action) => {
            state.discountDetail.value = action.payload;
        },
        setDiscountStartDate: (state, action) => {
            state.discountDetail.start_date = action.payload;
        },
        setDiscountEndDate: (state, action) => {
            state.discountDetail.end_date = action.payload;
        },
        setDiscountImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        clearDiscountImage: (state) => {
            state.selectedImage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.saveUpdatedValue.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.saveUpdatedValue.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.saveUpdatedValue.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.toggleIsActive.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.toggleIsActive.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.toggleIsActive.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.saveUpdatedStartDate.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.saveUpdatedStartDate.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.discountDetail.start_date = action.payload.start_date;
        })
            .addCase(exports.saveUpdatedStartDate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.saveUpdatedImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.saveUpdatedImage.fulfilled, (state, action) => {
            state.loading = false;
            state.discountDetail.image = action.payload.image; // Assuming API returns the updated image
        })
            .addCase(exports.saveUpdatedImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchDiscountDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchDiscountDetails.fulfilled, (state, action) => {
            state.discountDetail = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchDiscountDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = updateDiscountSlice.actions, exports.setDiscountValue = _a.setDiscountValue, exports.setDiscountStartDate = _a.setDiscountStartDate, exports.setDiscountEndDate = _a.setDiscountEndDate, exports.setDiscountImage = _a.setDiscountImage, exports.clearDiscountImage = _a.clearDiscountImage;
exports.default = updateDiscountSlice.reducer;
