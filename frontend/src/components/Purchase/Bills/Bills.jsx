import React, { useEffect, useState } from 'react'
import ReceivedOrdersListTable from '../ReceivedOrders/ReceivedOrdersListTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import BillsIconLabelLink from './BillsIconLabelLink';
import BillsModal from './BillsModal';
import BillsListTable from './BillsListTable';
import { v4 as uuidv4 } from 'uuid';

const Bills = ({ billsPage }) => {

    const [receivedOrdersData, setReceivedOrdersData] = useState([]);
    const [billsData, setBillsData] = useState([]);

    // fetch received items and set to receivedOrdersData
    const getReceivedOrders = async () => {
        try {
            const response = await axios.get('/purchase/received');
            if (response && response.data.success) {
                setReceivedOrdersData(response.data.success.filter(items => items.purchased_id.purchase_status === "Received"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // generate bill for received items
    const generateBill = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post('/purchase/bills', {
                received_order_id: await value._id,
                bill_id:uuidv4().replace(/-/g, ''),
                bill_date: new Date(),
                bill_status: 'Billed',
                purchased_id: await value.purchased_id._id
            });
            if (response && response.data.success) {
                toast.success('Bills Generated !!!');
                await getReceivedOrders();
                await getBill();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch bill and set to setBillsData
    const getBill = async () => {
        try {
            const response = await axios.get('/purchase/bills');
            if (response && response.data.success) {
                setBillsData(response.data.success.filter(items => items.received_order_id.purchased_id.purchase_status === "Billed"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getReceivedOrders();
        getBill();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* bills icon with label link component */}
                <BillsIconLabelLink
                    billsData={billsData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* received orders list table component */}
                <ReceivedOrdersListTable
                    receivedOrdersData={receivedOrdersData}
                    billsPage={billsPage}
                    generateBill={generateBill}
                />
            </div>

            {/* bills modal component */}
            <BillsModal
                billsListTable={
                    <BillsListTable
                        billsPage={billsPage}
                        billsData={billsData}
                    />
                }
            />
        </>
    )
}

export default Bills