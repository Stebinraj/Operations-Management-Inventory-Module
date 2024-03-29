import React, { useEffect, useState } from 'react'
import SalesReturnsProcessedItemsListTable from '../SalesReturns/SalesReturnsProcessedItemsListTable'
import axios from 'axios';
import ReturnedItemsIconLabelLink from './ReturnedItemsIconLabelLink';
import { toast } from 'react-toastify';
import ReturnedItemsModal from './ReturnedItemsModal';
import ReturnedItemsListTable from './ReturnedItemsListTable';
import { v4 as uuidv4 } from 'uuid';

const ReturnedItems = ({ returnedItemsPage }) => {

    const [processedReturnsItemsData, setProcessedReturnsItemsData] = useState([]);
    const [returnedItemsData, setReturnedItemsData] = useState([]);

    // fetch processed returns items and set to processedReturnsItemsData
    const getProcessedReturns = async () => {
        try {
            const response = await axios.get(`/process/returns`);
            if (response && response.data.success) {
                setProcessedReturnsItemsData(response.data.success.filter(items => items.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Returns Processed"));
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // mark the return processed items as returned
    const markAsReturned = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/returns/items`, {
                returns_processed_id: await value._id,
                returned_id: uuidv4().replace(/-/g, ''),
                returned_date: new Date(),
                returned_status: 'Returned',
                order_id: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id._id,
                quantity: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.quantity,
                item_id: await value.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id._id
            });
            if (response && response.data.success) {
                toast.success('Returned Successfully !!!');
                await getProcessedReturns();
                await getReturnedItems();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch returned items and set to returnedItemsData
    const getReturnedItems = async () => {
        try {
            const response = await axios.get(`/returns/items`);
            if (response && response.data.success) {
                setReturnedItemsData(response.data.success.filter(items => items.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Returned"));
            }
        } catch (error) {
            console.error(error.message);
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