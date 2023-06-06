import React, { useEffect, useState } from 'react'
import PaymentsReceivedListTable from '../PaymentsReceived/PaymentsReceivedListTable'
import axios from 'axios';
import SalesReturnsProcessedItemsIconLabelLink from './SalesReturnsProcessedItemsIconLabelLink';
import SalesReturnsProcessedItemsModal from './SalesReturnsProcessedItemsModal';
import { toast } from 'react-toastify';
import SalesReturnsProcessedItemsListTable from './SalesReturnsProcessedItemsListTable';
import { v4 as uuidv4 } from 'uuid';

const SalesReturns = ({ salesReturnsPage }) => {

    const [paymentsReceivedData, setPaymentsReceivedData] = useState([]);
    const [processedReturnsItemsData, setProcessedReturnsItemsData] = useState([]);

    // fetch payments and set to paymentsReceivedData
    const getPayments = async () => {
        try {
            const response = await axios.get(`/payments`);
            if (response && response.data.success) {
                setPaymentsReceivedData(response.data.success.filter(items => items.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Paid"))
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // process the items to return
    const processReturns = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/process/returns`, {
                payment_id: await value._id,
                returns_process_id: uuidv4().replace(/-/g, ''),
                returns_process_date: new Date(),
                order_id: await value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id._id,
                returns_process_status: 'Returns Processed'
            });
            if (response && response.data.success) {
                toast.success('Returns Processed !!!');
                await getPayments();
                await getProcessedReturns();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

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
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getPayments();
        getProcessedReturns();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* return processed items icon label component */}
                <SalesReturnsProcessedItemsIconLabelLink
                    processedReturnsItemsData={processedReturnsItemsData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* payments received list table component */}
                <PaymentsReceivedListTable
                    paymentsReceivedData={paymentsReceivedData}
                    salesReturnsPage={salesReturnsPage}
                    processReturns={processReturns}
                />
            </div>

            <SalesReturnsProcessedItemsModal
                salesReturnsProcessedItemsListTable={
                    <SalesReturnsProcessedItemsListTable
                        processedReturnsItemsData={processedReturnsItemsData}
                        salesReturnsPage={salesReturnsPage}
                    />
                }
            />
        </>
    )
}

export default SalesReturns