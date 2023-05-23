import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewOrdersSummary from './NewOrdersSummary';
import NewOrdersTotalValueSummary from './NewOrdersTotalValueSummary';
import ProductSalesSummary from './ProductSalesSummary';
import ProductSalesTotalValueSummary from './ProductSalesTotalValueSummary';
import InventoryStockSummary from './InventoryStockSummary';
import InventoryStockTotalPriceSummary from './InventoryStockTotalPriceSummary';
import RegisteredCustomersSummary from './RegisteredCustomersSummary';

const Dashboard = () => {

    const [inventorySummaryData, setInventorySummaryData] = useState([]);
    const [ordersSummaryData, setOrdersSummaryData] = useState([]);

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

    // handle sideeffects while fetchinf inventory, orders summary
    useEffect(() => {
        getInventorySummary();
        getOrderSummary();
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
            <ProductSalesSummary />

            {/* product sales summary total value component */}
            <ProductSalesTotalValueSummary />

            {/* Inventory stock summary */}
            <InventoryStockSummary
                inventorySummaryData={inventorySummaryData}
            />

            {/* Inventory stock total price summary */}
            <InventoryStockTotalPriceSummary
                inventorySummaryData={inventorySummaryData}
            />

            {/* registered customers summary component */}
            <RegisteredCustomersSummary />
        </>
    )
}

export default Dashboard