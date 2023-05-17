import React, { useEffect, useState } from 'react'
import InvoicedItemsListTable from '../Invoices/InvoicedItemsListTable'
import axios from 'axios';

const PaymentsReceived = ({ paymentsReceivedPage }) => {

    const [invoicedItemsData, setInvoicedItemsData] = useState([]);

    // fetch invoiced items and set to invoicedItemsData
    const getInvoicedItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/invoices`);
            if (response && response.data.success) {
                setInvoicedItemsData(response.data.success.filter(items => items.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Invoiced"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getInvoicedItems();
    }, []);

    return (
        <>
            <div className="card card-primary card-outline">
                {/* invoices list table component */}
                <InvoicedItemsListTable
                    invoicedItemsData={invoicedItemsData}
                    paymentsReceivedPage={paymentsReceivedPage}
                />
            </div>
        </>
    )
}

export default PaymentsReceived