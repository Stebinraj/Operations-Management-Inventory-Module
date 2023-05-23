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

const Dashboard = () => {

    const [inventorySummaryData, setInventorySummaryData] = useState([]);
    const [ordersSummaryData, setOrdersSummaryData] = useState([]);
    const [productSalesSummaryData, setProductSalesSummaryData] = useState([]);
    const [customerCountData, setCustomerCountData] = useState([]);
    const [vendorCountData, setVendorCountData] = useState([]);
    const [packedItemsData, setPackedItemsData] = useState([]);

    // fetch inventory summary and set to inventorySummaryData
    const getInventorySummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/inventory/summary');
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
            const response = await axios.get('http://localhost:5000/order/summary');
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
            const response = await axios.get('http://localhost:5000/product-sales/summary');
            if (response && response.data.success) {
                setProductSalesSummaryData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch customer count and set to customerCountData 
    const getCustomerCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customer/count');
            if (response && response.data.success) {
                setCustomerCountData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch customer count and set to vendorCountData 
    const getVendorCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/vendor/count');
            if (response && response.data.success) {
                setVendorCountData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch packed items and set to packedItemsData
    const getPackedItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/packed-items/summary');
            if (response && response.data.success) {
                setPackedItemsData(response.data.success);
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
        getCustomerCount();
        getVendorCount();
        getPackedItems();
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
        </>
    )
}

export default Dashboard