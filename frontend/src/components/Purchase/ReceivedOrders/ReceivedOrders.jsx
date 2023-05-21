import React, { useEffect, useState } from 'react'
import PurchaseOrdersListTable from '../PurchaseOrders/PurchaseOrdersListTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import ReceivedOrdersIconsLabelLink from './ReceivedOrdersIconsLabelLink';
import ReceivedOrdersModal from './ReceivedOrdersModal';
import ReceivedOrdersListTable from './ReceivedOrdersListTable';

const ReceivedOrders = ({ receivedOrdersPage }) => {

    const [purchaseOrdersData, setPurchaseOrdersData] = useState([]);
    const [receivedOrdersData, setReceivedOrdersData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const received_id = String(randomNum).padStart(10, '0');

    // fetch purchase orders and set to setPurchaseOrdersData
    const getPurchaseOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchase/orders');
            if (response && response.data.success) {
                setPurchaseOrdersData(response.data.success.filter(items => items.purchase_status === "Confirmed"));
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // mark the purchased items as received and add the quantity to inventory
    const markAsReceived = async (e, value) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/purchase/received', {
            purchased_id: await value._id,
            received_date: new Date(),
            received_id,
            received_status: 'Received',
            quantity: await value.quantity,
            item_id: await value.item_id._id
        });
        if (response && response.data.success) {
            toast.success('Marked as Received !!!');
            await getPurchaseOrders();
        }
    };

    // fetch received items and set to receivedOrdersData
    const getReceivedOrders = async () => {
        const response = await axios.get('http://localhost:5000/purchase/received');
        if (response && response.data.success) {
            setReceivedOrdersData(response.data.success.filter(items => items.purchased_id.purchase_status === "Received"));
        }
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getPurchaseOrders();
        getReceivedOrders();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* received order icon with label link component */}
                <ReceivedOrdersIconsLabelLink
                    receivedOrdersData={receivedOrdersData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* purchase orders list table component */}
                <PurchaseOrdersListTable
                    purchaseOrdersData={purchaseOrdersData}
                    receivedOrdersPage={receivedOrdersPage}
                    markAsReceived={markAsReceived}
                />
            </div>

            {/* received orders modal component */}
            <ReceivedOrdersModal
                receivedOrdersListTable={
                    <ReceivedOrdersListTable
                        receivedOrdersPage={receivedOrdersPage}
                        receivedOrdersData={receivedOrdersData}
                    />
                }
            />
        </>
    )
}

export default ReceivedOrders