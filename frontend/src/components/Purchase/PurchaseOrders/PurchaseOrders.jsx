import React, { useEffect, useState } from 'react'
import ItemsList from '../../Inventory/Items/ItemsList';
import ItemsListTable from '../../Inventory/Items/ItemsListTable';
import axios from 'axios';

const PurchaseOrders = ({ purchaseOrdersPage }) => {

    // State variables to view items
    const [itemsData, setItemsData] = useState([]);

    // fetch items and set to setItemsData
    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // purchase the items
    const handlePurchase = async (e, value) => {
        e.preventDefault();
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getItems();
    }, []);

    return (
        <>
            {/* items list component */}
            <ItemsList
                itemsListTable={
                    <ItemsListTable
                        itemsData={itemsData}
                        purchaseOrdersPage={purchaseOrdersPage}
                        handlePurchase={handlePurchase}
                    />
                }
            />
        </>
    )
}

export default PurchaseOrders