import React, { useEffect, useState } from 'react'
import ReceivedOrdersListTable from '../ReceivedOrders/ReceivedOrdersListTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import BillsIconLabelLink from './BillsIconLabelLink';
import BillsModal from './BillsModal';
import BillsListTable from './BillsListTable';

const Bills = ({ billsPage }) => {

    const [receivedOrdersData, setReceivedOrdersData] = useState([]);
    const [billsData, setBillsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const bill_id = String(randomNum).padStart(10, '0');

    // fetch received items and set to receivedOrdersData
    const getReceivedOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchase/received');
            if (response && response.data.success) {
                setReceivedOrdersData(response.data.success.filter(items => items.purchased_id.purchase_status === "Received"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // generate bill for received items
    const generateBill = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/purchase/bills', {
                received_order_id: await value._id,
                bill_id,
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
            console.log(error);
        }
    }

    // fetch bill and set to setBillsData
    const getBill = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchase/bills');
            if (response && response.data.success) {
                setBillsData(response.data.success.filter(items => items.received_order_id.purchased_id.purchase_status === "Billed"));
            }
        } catch (error) {
            console.log(error);
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