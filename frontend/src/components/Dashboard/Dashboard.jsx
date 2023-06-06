import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewOrdersSummary from './NewOrdersSummary';
import NewOrdersTotalValueSummary from './NewOrdersTotalValueSummary';
import ProductSalesSummary from './ProductSalesSummary';
import ProductSalesTotalValueSummary from './ProductSalesTotalValueSummary';
import InventoryStockSummary from './InventoryStockSummary';
import InventoryStockTotalPriceSummary from './InventoryStockTotalPriceSummary';
import RegisteredCustomersSummary from './RegisteredCustomersSummary';
import './dashboard.css';
import RegisteredVendorsSummary from './RegisteredVendorsSummary';
import PackedItemsSummary from './PackedItemsSummary';
import PackedItemsTotalValueSummary from './PackedItemsTotalValueSummary';
import ShippedItemsSummary from './ShippedItemsSummary';
import ShippedItemsTotalValueSummary from './ShippedItemsTotalValueSummary';
import DeliveredItemsSummary from './DeliveredItemsSummary';
import DeliveredItemsTotalValueSummary from './DeliveredItemsTotalValueSummary';
import ReturnedItemsSummary from './ReturnedItemsSummary';
import ReturnedItemsTotalValueSummary from './ReturnedItemsTotalValueSummary';
import SalesByItemsOrCustomersSummary from './SalesByItemsOrCustomersSummary';
import OrdersListTable from '../Sales/SalesOrders/OrdersListTable';
import InventoryAgingSummary from './InventoryAgingSummary';
import InventoryAgingSummaryListTable from './InventoryAgingSummaryListTable';
import { toast } from 'react-toastify';

const Dashboard = ({ dashboardPage }) => {

    const [inventorySummaryData, setInventorySummaryData] = useState([]);
    const [ordersSummaryData, setOrdersSummaryData] = useState([]);
    const [productSalesSummaryData, setProductSalesSummaryData] = useState([]);
    const [customerCountData, setCustomerCountData] = useState([]);
    const [vendorCountData, setVendorCountData] = useState([]);
    const [packedItemsData, setPackedItemsData] = useState([]);
    const [shippedItemsData, setShippedItemsData] = useState([]);
    const [deliveredItemsData, setDeliveredItemsData] = useState([]);
    const [returnedItemsData, setReturnedItemsData] = useState([]);
    const [orderItemsData, setOrderItemsData] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [filterBy, setFilterBy] = useState({ filterBy: '', class: '', feedback: '' });
    const [filterId, setFilterId] = useState({ filterId: '', class: '', feedback: '' });
    const [customerOrFilterItemsData, setCustomerOrFilterItemsData] = useState([]);
    // fetch inventory summary and set to inventorySummaryData
    const getInventorySummary = async () => {
        try {
            const response = await axios.get('/inventory/summary');
            if (response && response.data.success) {
                setInventorySummaryData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch inventory summary and set to ordersSummaryData 
    const getOrderSummary = async () => {
        try {
            const response = await axios.get('/order/summary');
            if (response && response.data.success) {
                setOrdersSummaryData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch product sales summary and set to productSalesSummaryData 
    const getProductSalesSummary = async () => {
        try {
            const response = await axios.get('/product-sales/summary');
            if (response && response.data.success) {
                setProductSalesSummaryData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch customer count and set to customerCountData 
    const getCustomerCountSummary = async () => {
        try {
            const response = await axios.get('/customer/count');
            if (response && response.data.success) {
                setCustomerCountData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch customer count and set to vendorCountData 
    const getVendorCountSummary = async () => {
        try {
            const response = await axios.get('/vendor/count');
            if (response && response.data.success) {
                setVendorCountData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch packed items and set to packedItemsData
    const getPackedItemsSummary = async () => {
        try {
            const response = await axios.get('/packed-items/summary');
            if (response && response.data.success) {
                setPackedItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch packed items and set to shippedItemsData
    const getShippedItemsSummary = async () => {
        try {
            const response = await axios.get('/shipped-items/summary');
            if (response && response.data.success) {
                setShippedItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch delivered items and set to deliveredItemsData
    const getDeliveredItemsSummary = async () => {
        try {
            const response = await axios.get('/delivered-items/summary');
            if (response && response.data.success) {
                setDeliveredItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch returned items and set to returnedItemsData
    const getreturnedItemsSummary = async () => {
        try {
            const response = await axios.get('/returned-items/summary');
            if (response && response.data.success) {
                setReturnedItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch order items and set to orderItemsData
    const getOrderItems = async () => {
        try {
            const response = await axios.get(`/salesorders`);
            if (response && response.data.success) {
                setOrderItemsData(response.data.success)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // fetch items and set to ItemsData
    const getItems = async () => {
        try {
            const response = await axios.get('/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getItemsFilter = async () => {
        try {
            const response = await axios.get('/items');
            if (response && response.data.success) {
                setCustomerOrFilterItemsData(response.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle while filtering sales orders
    const handleFilterBy = async (e) => {
        setFilterBy({ ...filterBy, filterBy: e.target.value });
        if (e.target.value === "Customer") {
            await getCustomerFilter();
        } else if (e.target.value === "Items") {
            await getItemsFilter();
        }
        setFilterId({ filterId: '', class: '', feedback: '' });
    };

    // fetch customers and set to setCustomerData
    const getCustomerFilter = async () => {
        try {
            const response = await axios.get('/customer');
            if (response && response.data.success) {
                setCustomerOrFilterItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const filterSalesOrders = async (e) => {
        try {
            e.preventDefault();
            if (await validateFilterBy() & await validateFilterId()) {
                if (orderItemsData.length === 0) {
                    toast.error('Nothing To Filter !!!');
                    return;
                } else if (filterBy.filterBy === "Customer" || filterBy.filterBy === "Items") {
                    await getSpecificSales(filterId.filterId);
                    toast.success('Filtered SuccessFully !!!');
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // validate filter by
    const validateFilterBy = async () => {
        if (filterBy.filterBy === "") {
            setFilterBy({ ...filterBy, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (filterBy.filterBy) {
            setFilterBy({ ...filterBy, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            return false;
        }
    }

    // validate filter id
    const validateFilterId = async () => {
        if (filterId.filterId === "") {
            setFilterId({ ...filterId, feedback: 'Required *', class: 'is-invalid' });
            return false;
        } else if (filterId.filterId) {
            setFilterId({ ...filterId, feedback: 'All Good', class: 'is-valid' });
            return true;
        } else {
            return false;
        }
    }

    const resetSalesOrder = async () => {
        await getOrderItems();
        setFilterBy({ filterBy: '', class: '', feedback: '' });
        setFilterId({ filterId: '', class: '', feedback: '' });
        toast.success('Resetted Successfully !!!');
    }

    const getSpecificSales = async (id) => {
        try {
            const response = await axios.get(`/filter/salesorders/${id}`);
            if (response && response.data.success) {
                setOrderItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // handle sideeffects while fetching inventory, orders , product sales, customer count, vendor count, packed items summary
    useEffect(() => {
        getInventorySummary();
        getOrderSummary();
        getProductSalesSummary();
        getCustomerCountSummary();
        getVendorCountSummary();
        getPackedItemsSummary();
        getShippedItemsSummary();
        getDeliveredItemsSummary();
        getreturnedItemsSummary();
        getOrderItems();
        getItems();
    }, [])


    return (
        <>
            {/* New orders Summary Component */}
            <NewOrdersSummary
                ordersSummaryData={ordersSummaryData}
            />

            {/* New orders total value Summary Component */}
            <NewOrdersTotalValueSummary
                ordersSummaryData={ordersSummaryData}
            />

            {/* Product Sales Summary Component */}
            <ProductSalesSummary
                productSalesSummaryData={productSalesSummaryData}
            />

            {/* product sales summary total value component */}
            <ProductSalesTotalValueSummary
                productSalesSummaryData={productSalesSummaryData}
            />

            {/* Inventory stock summary */}
            <InventoryStockSummary
                inventorySummaryData={inventorySummaryData}
            />

            {/* Inventory stock total price summary */}
            <InventoryStockTotalPriceSummary
                inventorySummaryData={inventorySummaryData}
            />

            {/* registered customers summary component */}
            <RegisteredCustomersSummary
                customerCountData={customerCountData}
            />

            {/* registered vendor summary component */}
            <RegisteredVendorsSummary
                vendorCountData={vendorCountData}
            />

            {/* packed items summary component */}
            <PackedItemsSummary
                packedItemsData={packedItemsData}
            />

            {/* packed items total value summary component */}
            <PackedItemsTotalValueSummary
                packedItemsData={packedItemsData}
            />

            {/* Shipped items summary component */}
            <ShippedItemsSummary
                shippedItemsData={shippedItemsData}
            />

            {/* Shipped items summary component */}
            <ShippedItemsTotalValueSummary
                shippedItemsData={shippedItemsData}
            />

            {/* Delivered items summary component */}
            <DeliveredItemsSummary
                deliveredItemsData={deliveredItemsData}
            />

            {/* Delivered items total value component */}
            <DeliveredItemsTotalValueSummary
                deliveredItemsData={deliveredItemsData}
            />

            {/* returned items summary component */}
            <ReturnedItemsSummary
                returnedItemsData={returnedItemsData}
            />

            {/* returned items total value summary component */}
            <ReturnedItemsTotalValueSummary
                returnedItemsData={returnedItemsData}
            />

            {/* Sales by items or customers summary component */}
            <SalesByItemsOrCustomersSummary
                customerOrFilterItemsData={customerOrFilterItemsData}
                filterBy={filterBy}
                filterId={filterId}
                handleFilterBy={handleFilterBy}
                setFilterId={setFilterId}
                filterSalesOrders={filterSalesOrders}
                resetSalesOrder={resetSalesOrder}
                ordersListTable={
                    <OrdersListTable
                        orderItemsData={orderItemsData}
                        dashboardPage={dashboardPage}
                    />
                }
            />

            {/* Inventory aging summary component */}
            <InventoryAgingSummary
                inventoryAgingSummaryListTable={
                    <InventoryAgingSummaryListTable
                        itemsData={itemsData}
                    />
                }
            />
        </>
    )
}

export default Dashboard