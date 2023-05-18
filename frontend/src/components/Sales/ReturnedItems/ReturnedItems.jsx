import React, { useEffect, useState } from 'react'
import SalesReturnsProcessedItemsListTable from '../SalesReturns/SalesReturnsProcessedItemsListTable'
import axios from 'axios';
import ReturnedItemsIconLabelLink from './ReturnedItemsIconLabelLink';
import { toast } from 'react-toastify';
import ReturnedItemsModal from './ReturnedItemsModal';
import ReturnedItemsListTable from './ReturnedItemsListTable';

const ReturnedItems = ({ returnedItemsPage }) => {

    const [processedReturnsItemsData, setProcessedReturnsItemsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const returned_id = String(randomNum).padStart(10, '0');
    const [returnedItemsData, setReturnedItemsData] = useState([]);

    // fetch processed returns items and set to processedReturnsItemsData
    const getProcessedReturns = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/process/returns`);
            if (response && response.data.success) {
                setProcessedReturnsItemsData(response.data.success.filter(items => items.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Returns Processed"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // mark the return processed items as returned
    const markAsReturned = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`http://localhost:5000/returns/items`, {
                returns_processed_id: await value._id,
                returned_id,
                returned_date: new Date(),
                returned_status: 'Returned',
                order_id: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id._id,
                quantity: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.quantity,
                item_id: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id._id
            });
            if (response && response.data.success) {
                toast.success('Returned Successfully !!!');
                await getProcessedReturns();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // fetch returned items and set to returnedItemsData
    const getReturnedItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/returns/items`);
            if (response && response.data.success) {
                setReturnedItemsData(response.data.success.filter(items => items.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Returned"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getProcessedReturns();
        getReturnedItems();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* returned items icon label component */}
                <ReturnedItemsIconLabelLink
                    returnedItemsData={returnedItemsData}
                />
            </div>


            <div className="card card-primary card-outline">
                {/* sales returns processed list table component */}
                <SalesReturnsProcessedItemsListTable
                    processedReturnsItemsData={processedReturnsItemsData}
                    returnedItemsPage={returnedItemsPage}
                    markAsReturned={markAsReturned}
                />
            </div>

            <ReturnedItemsModal
                returnedItemsListTable={
                    <ReturnedItemsListTable
                        returnedItemsData={returnedItemsData}
                        returnedItemsPage={returnedItemsPage}
                    />
                }
            />
        </>
    )
}

export default ReturnedItems