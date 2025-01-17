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
exports.resetBogo = exports.resetMinMax = exports.resetForm = exports.setImage = exports.setEndDate = exports.setStartDate = exports.setDescription = exports.setBogoProductId = exports.setMaxDiscount = exports.setMinPurchase = exports.setValue = exports.setInventoryId = exports.setDiscountType = exports.createDiscount = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialState = {
    type: "",
    inventory_id: null,
    value: null,
    min_purchase: null,
    max_discount: null,
    bogo_product_id: null,
    description: "",
    start_date: null, // ISO formatted string
    end_date: null,
    image: null,
    loading: false,
    error: null,
};
const access_token = js_cookie_1.default.get("access_token");
const storeId = Number(js_cookie_1.default.get("storeId"));
exports.createDiscount = (0, toolkit_1.createAsyncThunk)("createDiscount/createDiscount", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ type, inventory_id, value, min_purchase, max_discount, bogo_product_id, description, start_date, end_date, image, }, { rejectWithValue }) {
    var _c, _d;
    try {
        const formData = new FormData();
        // Validation
        if (!type)
            return rejectWithValue("Discount type is required.");
        if (type !== "BOGO" && type !== "PERCENTAGE" && type !== "NOMINAL")
            return rejectWithValue("Invalid discount type.");
        if ((type === "PERCENTAGE" &&
            (value === null || value < 1 || value > 100)) ||
            (type === "NOMINAL" && (value === null || value <= 0))) {
            return rejectWithValue(type === "PERCENTAGE"
                ? "For percentage discounts, the value must be between 1 and 100."
                : "For nominal discounts, the value must be greater than 0.");
        }
        if (!start_date || !end_date)
            return rejectWithValue("Start date and end date are required.");
        if (type === "BOGO" && (!bogo_product_id || !inventory_id))
            return rejectWithValue("BOGO discounts require both a product and a BOGO Product.");
        if (!description)
            return rejectWithValue("Description is required");
        // Append data to FormData
        formData.append("type", type);
        if (inventory_id !== null)
            formData.append("inventory_id", inventory_id.toString());
        if (value !== null)
            formData.append("value", value.toString());
        if (min_purchase !== null)
            formData.append("min_purchase", min_purchase.toString());
        if (max_discount !== null)
            formData.append("max_discount", max_discount.toString());
        if (bogo_product_id !== null)
            formData.append("bogo_product_id", bogo_product_id.toString());
        formData.append("description", description);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);
        if (image)
            formData.append("image", image);
        const response = yield axios_1.default.post(`/api/store-admin/discounts/${Number(storeId)}`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error Object:", error.response);
            const errorMessage = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.detail) || "Failed to create discount.";
            return rejectWithValue(errorMessage);
        }
        else if (error instanceof Error) {
            return rejectWithValue(error.message || "An unexpected error occurred.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
const createDiscountSlice = (0, toolkit_1.createSlice)({
    name: "createDiscount",
    initialState,
    reducers: {
        setDiscountType: (state, action) => {
            state.type = action.payload;
        },
        setInventoryId: (state, action) => {
            state.inventory_id = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload; // Add `value` field in the state
        },
        setMinPurchase: (state, action) => {
            state.min_purchase = action.payload;
        },
        setMaxDiscount: (state, action) => {
            state.max_discount = action.payload;
        },
        setBogoProductId: (state, action) => {
            state.bogo_product_id = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setStartDate: (state, action) => {
            state.start_date = action.payload;
        },
        setEndDate: (state, action) => {
            state.end_date = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload; // Set the image file
        },
        resetMinMax: (state) => {
            state.min_purchase = null;
            state.max_discount = null;
        },
        resetBogo: (state) => {
            state.value = null;
            state.min_purchase = null;
            state.max_discount = null;
        },
        resetForm: (state) => {
            state.type = "";
            state.inventory_id = null;
            state.value = null;
            state.min_purchase = null;
            state.max_discount = null;
            state.bogo_product_id = null;
            state.description = "";
            state.start_date = null;
            state.end_date = null;
            state.image = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.createDiscount.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.createDiscount.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.createDiscount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = createDiscountSlice.actions, exports.setDiscountType = _a.setDiscountType, exports.setInventoryId = _a.setInventoryId, exports.setValue = _a.setValue, exports.setMinPurchase = _a.setMinPurchase, exports.setMaxDiscount = _a.setMaxDiscount, exports.setBogoProductId = _a.setBogoProductId, exports.setDescription = _a.setDescription, exports.setStartDate = _a.setStartDate, exports.setEndDate = _a.setEndDate, exports.setImage = _a.setImage, exports.resetForm = _a.resetForm, exports.resetMinMax = _a.resetMinMax, exports.resetBogo = _a.resetBogo;
exports.default = createDiscountSlice.reducer;
