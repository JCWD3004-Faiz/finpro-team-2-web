"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const getProductsSlice_1 = require("@/redux/slices/getProductsSlice.js");
function TestingProductDetail() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { loading, error, productDetailUser, productAllUser } = (0, react_redux_1.useSelector)((state) => state.getProducts);
    (0, react_1.useEffect)(() => {
        const inventoryId = 200; // Replace with the inventory ID you want to fetch
        dispatch((0, getProductsSlice_1.fetchProductDetailsByInventoryId)(inventoryId))
            .unwrap()
            .then((data) => {
        })
            .catch((err) => {
            console.error("Error fetching product details:", err);
        });
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        const page = 1; // You can modify pagination values
        const pageSize = 10;
        const search = ""; // Add a search term if needed
        const category = ""; // Add a category if needed
        const sortField = "product_name";
        const sortOrder = "asc";
        dispatch((0, getProductsSlice_1.fetchInventoriesUser)({
            page,
            pageSize,
            search,
            category,
            sortField,
            sortOrder,
        }))
            .unwrap()
            .then((data) => {
        })
            .catch((err) => {
            console.error("Error fetching inventories:", err); // Log any errors
        });
    }, [dispatch]);
    return react_1.default.createElement("div", null, "TestingProductDetail");
}
exports.default = TestingProductDetail;
