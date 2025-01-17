"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const StoreSidebar_1 = require("@/components/StoreSidebar.js");
const LoadingVignette_1 = require("@/components/LoadingVignette.js");
const button_1 = require("@/components/ui/button.js");
const select_1 = require("@/components/ui/select.js");
const card_1 = require("@/components/ui/card.js");
const tb_1 = require("react-icons/tb");
const storeSalesSlice_1 = require("@/redux/slices/storeSalesSlice.js");
const storeAdminSlice_1 = require("@/redux/slices/storeAdminSlice.js");
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const fa_1 = require("react-icons/fa");
const fa6_1 = require("react-icons/fa6");
const js_cookie_1 = require("js-cookie");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.BarElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.PointElement, chart_js_1.LineElement);
function StoreAllReports() {
    const storeId = js_cookie_1.default.get("storeId");
    const [year, setYear] = (0, react_1.useState)(2025);
    const dispatch = (0, react_redux_1.useDispatch)();
    const router = (0, navigation_1.useRouter)();
    const { storeName, storeLocation, adminName, isSidebarOpen } = (0, react_redux_1.useSelector)((state) => state.storeAdmin);
    const { sales, salesByCategory, salesByProductData, categories, products, stores, loading, store_id, category_id, product_id, } = (0, react_redux_1.useSelector)((state) => state.storeSales);
    const toggleSidebar = () => {
        dispatch({ type: "storeAdmin/toggleSidebar" });
    };
    const handleStoreChange = (newStoreId) => {
        dispatch((0, storeSalesSlice_1.setStoreId)(newStoreId));
    };
    const chartData = {
        labels: sales.map((sale) => sale.month),
        datasets: [
            {
                label: "Total Sales",
                data: sales.map((sale) => sale.total_sales),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.4,
            },
        ],
    };
    const categorySalesChartData = {
        labels: salesByCategory.labels,
        datasets: salesByCategory.datasets.map((dataset) => (Object.assign(Object.assign({}, dataset), { borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)", tension: 0.4 }))),
    };
    const productChartData = {
        labels: salesByProductData.map((data) => data.month),
        datasets: [
            {
                label: "Product Sales",
                data: salesByProductData.map((data) => data.total_sales),
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                tension: 0.4,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            x: {
                type: "category",
                grid: {
                    display: false,
                },
            },
            y: {
                type: "linear",
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                },
                beginAtZero: true,
            },
        },
    };
    (0, react_1.useEffect)(() => {
        const params = {
            year,
        };
        if (store_id) {
            params.store_id = store_id;
        }
        if (product_id) {
            params.product_id = product_id;
        }
        dispatch((0, storeSalesSlice_1.fetchSalesByProductData)(params));
    }, [dispatch, year, store_id, product_id]);
    (0, react_1.useEffect)(() => {
        const params = {
            year,
        };
        if (store_id) {
            params.store_id = store_id;
        }
        if (category_id) {
            params.category_id = category_id;
        }
        dispatch((0, storeSalesSlice_1.fetchSalesData)(params));
        dispatch((0, storeSalesSlice_1.fetchSalesByCategory)(params));
        dispatch((0, storeSalesSlice_1.fetchCategoriesProductStoreData)());
    }, [dispatch, store_id, year, category_id]);
    (0, react_1.useEffect)(() => {
        if (storeId) {
            dispatch((0, storeAdminSlice_1.fetchStoreByStoreId)(parseInt(storeId)));
        }
    }, [dispatch, storeId]);
    return (react_1.default.createElement("div", { className: "bg-slate-100 w-screen min-h-screen text-gray-800" },
        react_1.default.createElement(StoreSidebar_1.default, { isSidebarOpen: isSidebarOpen, toggleSidebar: toggleSidebar }),
        loading && react_1.default.createElement(LoadingVignette_1.default, null),
        react_1.default.createElement("div", { className: `ml-0 ${isSidebarOpen ? "md:ml-64" : ""} md:ml-64 p-6` },
            react_1.default.createElement("h1", { className: "text-4xl font-semibold text-gray-900 mb-5 tracking-wide" }, "Sales Report"),
            react_1.default.createElement("div", { className: "mb-5" },
                react_1.default.createElement("h2", { className: " flex items-center text-xl mb-2 text-gray-700 tracking-wide" },
                    react_1.default.createElement(fa_1.FaStore, { className: "flex items-center mr-2" }),
                    storeName),
                react_1.default.createElement("h3", { className: "text-sm text-gray-700 flex items-center mb-2 tracking-wide" },
                    react_1.default.createElement(fa6_1.FaLocationDot, { className: "flex items-center mr-2" }),
                    storeLocation)),
            react_1.default.createElement(button_1.Button, { size: "default", onClick: () => router.push("/admin-store/reports/stocksReport") },
                react_1.default.createElement(tb_1.TbReportSearch, null),
                "Stocks Report"),
            react_1.default.createElement("div", { className: "flex gap-5 mt-6 mb-4" },
                react_1.default.createElement("div", { className: "bg-white w-1/3 rounded-sm" },
                    react_1.default.createElement(select_1.Select, { onValueChange: (value) => setYear(parseInt(value)) },
                        react_1.default.createElement(select_1.SelectTrigger, null,
                            react_1.default.createElement(select_1.SelectValue, { placeholder: "Select a Year" })),
                        react_1.default.createElement(select_1.SelectContent, null, [2023, 2024, 2025, 2026].map((year) => (react_1.default.createElement(select_1.SelectItem, { key: year, value: String(year) }, year))))))),
            react_1.default.createElement("div", { className: "grid grid-cols-2 gap-5" },
                react_1.default.createElement("div", { className: "w-full mx-auto" },
                    react_1.default.createElement(card_1.Card, { className: "h-full" },
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, null, "Monthly Sales Report")),
                        react_1.default.createElement(card_1.CardContent, null,
                            react_1.default.createElement("div", { className: "w-full h-auto" },
                                react_1.default.createElement(react_chartjs_2_1.Line, { data: chartData, options: chartOptions }))))),
                react_1.default.createElement("div", { className: "w-full mx-auto" },
                    react_1.default.createElement(card_1.Card, { className: "h-full" },
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, null, "Sales By Category"),
                            react_1.default.createElement(select_1.Select, { onValueChange: (value) => dispatch((0, storeSalesSlice_1.setCategoryId)(value ? parseInt(value) : null)) },
                                react_1.default.createElement(select_1.SelectTrigger, null,
                                    react_1.default.createElement(select_1.SelectValue, { placeholder: "Select a Category" })),
                                react_1.default.createElement(select_1.SelectContent, null,
                                    react_1.default.createElement(select_1.SelectItem, { value: "-1" }, "All Categories"),
                                    categories.map((category) => (react_1.default.createElement(select_1.SelectItem, { key: category.category_id, value: String(category.category_id) }, category.category_name)))))),
                        react_1.default.createElement(card_1.CardContent, null,
                            react_1.default.createElement("div", { className: "w-full h-auto" },
                                react_1.default.createElement(react_chartjs_2_1.Line, { data: categorySalesChartData, options: chartOptions }))))),
                react_1.default.createElement("div", { className: "w-full mx-auto" },
                    react_1.default.createElement(card_1.Card, { className: "h-full" },
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, null, "Monthly Product Sales Report"),
                            react_1.default.createElement(select_1.Select, { onValueChange: (value) => dispatch((0, storeSalesSlice_1.setProductId)(value ? parseInt(value) : null)) },
                                react_1.default.createElement(select_1.SelectTrigger, null,
                                    react_1.default.createElement(select_1.SelectValue, { placeholder: "Select a Product" })),
                                react_1.default.createElement(select_1.SelectContent, null,
                                    react_1.default.createElement(select_1.SelectItem, { value: "-1" }, "First Product"),
                                    products.map((product) => (react_1.default.createElement(select_1.SelectItem, { key: product.product_id, value: String(product.product_id) }, product.product_name)))))),
                        react_1.default.createElement(card_1.CardContent, null,
                            react_1.default.createElement("div", { className: "w-full h-auto" },
                                react_1.default.createElement(react_chartjs_2_1.Line, { data: productChartData, options: chartOptions })))))))));
}
exports.default = StoreAllReports;
