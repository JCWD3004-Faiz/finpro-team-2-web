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
exports.resetFormData = exports.setFormData = exports.setCategory = exports.setSearch = exports.setSortOrder = exports.setCurrentPage = exports.setSortField = exports.deleteProduct = exports.updateProductImage = exports.updateProductField = exports.fetchProductDetails = exports.createProduct = exports.fetchAllProductsAdmin = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const reduxInterface_1 = require("@/utils/reduxInterface.js");
const interceptor_1 = require("@/utils/interceptor.js");
const axios_1 = require("axios");
const js_cookie_1 = require("js-cookie");
const initialProductDetail = {
    product_id: 0,
    product_name: "",
    description: "",
    category_name: null,
    price: 0,
    availability: false,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [],
};
const initialState = {
    products: [],
    productDetail: initialProductDetail,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    loading: false,
    error: null,
    sortField: "product_name",
    sortOrder: "asc",
    search: "",
    category: null,
    formData: {
        category_id: 0,
        product_name: "",
        description: "",
        price: 0,
        images: [],
    },
};
const access_token = js_cookie_1.default.get("access_token");
exports.fetchAllProductsAdmin = (0, toolkit_1.createAsyncThunk)("manageProduct/fetchAllProductsAdmin", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ page = 1, pageSize = 10, search = "", category = "", sortField = "product_name", sortOrder = "asc", }, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/products?page=${page}&pageSize=${pageSize}&search=${search}&category=${category}&sortField=${sortField}&sortOrder=${sortOrder}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.products;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch products.");
        }
        else {
            return rejectWithValue("An Unexpected error occured.");
        }
    }
}));
exports.createProduct = (0, toolkit_1.createAsyncThunk)("manageProduct/createProduct", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ category_id, product_name, description, price, images, }, { rejectWithValue }) {
    try {
        const formData = new FormData();
        if (category_id == null) {
            throw new Error("Category ID is required.");
        }
        if (price == null) {
            throw new Error("Price is required.");
        }
        formData.append("category_id", category_id.toString());
        formData.append("product_name", product_name);
        formData.append("description", description);
        formData.append("price", price.toString());
        images.forEach((image) => {
            formData.append("images", image);
        });
        const response = yield axios_1.default.post(`/api/products`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to create product.");
        }
        else {
            return rejectWithValue("An Unexpected error occurred.");
        }
    }
}));
exports.fetchProductDetails = (0, toolkit_1.createAsyncThunk)("manageProduct/fetchProductDetails", (productId_1, _a) => __awaiter(void 0, [productId_1, _a], void 0, function* (productId, { rejectWithValue }) {
    try {
        const response = yield interceptor_1.default.get(`/api/super-admin/products/details/${productId}`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data.product;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to fetch product details.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.updateProductField = (0, toolkit_1.createAsyncThunk)("manageProduct/updateProductField", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ productId, field, value, }, { rejectWithValue }) {
    try {
        const endpoint = reduxInterface_1.fieldEndpointMap[field];
        const response = yield axios_1.default.patch(`/api/products/${endpoint}/${productId}`, { [field]: value }, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || `Failed to update ${field}.`);
        }
        else {
            return rejectWithValue("An Unexpected error occurred.");
        }
    }
}));
exports.updateProductImage = (0, toolkit_1.createAsyncThunk)("manageProduct/updateProductImage", (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ imageId, imageFile, index, }, { rejectWithValue }) {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const response = yield axios_1.default.patch(`/api/products/images/${imageId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response) {
            return rejectWithValue(error.response.data.message || "Failed to update image.");
        }
        else {
            return rejectWithValue("An unexpected error occurred.");
        }
    }
}));
exports.deleteProduct = (0, toolkit_1.createAsyncThunk)("manageProduct/deleteProduct", (productId_1, _a) => __awaiter(void 0, [productId_1, _a], void 0, function* (productId, { rejectWithValue }) {
    var _b, _c;
    try {
        const response = yield interceptor_1.default.patch(`/api/products/remove/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return { message: response.data.message, productId };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error Object:", error.response);
            const errorMessage = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.detail) || "Failed to delete product.";
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
const manageProductSlice = (0, toolkit_1.createSlice)({
    name: "manageProduct",
    initialState,
    reducers: {
        setSortField: (state, action) => {
            state.sortField = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setFormData: (state, action) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
        },
        resetFormData: (state) => {
            state.formData = {
                category_id: 0,
                product_name: "",
                description: "",
                price: 0,
                images: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAllProductsAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllProductsAdmin.fulfilled, (state, action) => {
            state.products = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
            state.loading = false;
        })
            .addCase(exports.fetchAllProductsAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload); // Assuming `products` is an array in the state
        })
            .addCase(exports.createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.productDetail = action.payload; // Assuming `productDetail` is added to the state
        })
            .addCase(exports.fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.updateProductField.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.updateProductField.fulfilled, (state, action) => {
            state.loading = false;
            state.productDetail = action.payload;
        })
            .addCase(exports.updateProductField.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.updateProductImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.updateProductImage.fulfilled, (state, action) => {
            state.loading = false;
            const { index, updatedImage } = action.payload;
            state.productDetail.product_images =
                state.productDetail.product_images.map((image, idx) => {
                    if (idx === index) {
                        return Object.assign(Object.assign({}, image), { product_image: updatedImage });
                    }
                    return image;
                });
        })
            .addCase(exports.updateProductImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
            .addCase(exports.deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
_a = manageProductSlice.actions, exports.setSortField = _a.setSortField, exports.setCurrentPage = _a.setCurrentPage, exports.setSortOrder = _a.setSortOrder, exports.setSearch = _a.setSearch, exports.setCategory = _a.setCategory, exports.setFormData = _a.setFormData, exports.resetFormData = _a.resetFormData;
exports.default = manageProductSlice.reducer;
