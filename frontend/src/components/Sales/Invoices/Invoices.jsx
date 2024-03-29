import React, { useEffect, useState } from 'react'
import DeliveredItemsListTable from '../DeliveredItems/DeliveredItemsListTable'
import axios from 'axios';
import InvoicesIconLabelLink from './InvoicesIconLabelLink';
import InvoicedItemsModal from './InvoicedItemsModal';
import InvoicedItemsListTable from './InvoicedItemsListTable';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Invoices = ({ invoicesPage }) => {

    const [deliveredItemsData, setDeliveredItemsData] = useState([]);
    const [invoicedItemsData, setInvoicedItemsData] = useState([]);

    // fetch delivered items data and set to deliveredItemsData
    const getDeliveredItemsData = async () => {
        try {
            const response = await axios.get(`/delivered/items`);
            if (response && response.data.success) {
                setDeliveredItemsData(response.data.success.filter(items => items.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Delivered"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // to generate invoice for delivered items
    const generateInvoice = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/invoices`, {
                delivery_id: await value._id,
                invoiced_id:uuidv4().replace(/-/g, ''),
                invoiced_date: new Date(),
                invoice_status: 'Invoiced',
                order_id: await value.shipments_id.delivery_challans_id.package_id.order_id._id
            });
            if (response && response.data.success) {
                toast.success('Invoice Generated !!!');
                await getDeliveredItemsData();
                await getInvoicedItems();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch invoiced items and set to invoicedItemsData
    const getInvoicedItems = async () => {
        try {
            const response = await axios.get(`/invoices`);
            if (response && response.data.success) {
                setInvoicedItemsData(response.data.success.filter(items => items.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Invoiced"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getDeliveredItemsData();
        getInvoicedItems();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* invoiced icon label component */}
                <InvoicesIconLabelLink
                    invoicedItemsData={invoicedItemsData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* delivered items list table component */}
                <DeliveredItemsListTable
                    deliveredItemsData={deliveredItemsData}
                    invoicesPage={invoicesPage}
                    generateInvoice={generateInvoice}
                />
            </div>

            {/* Invoiced items modal component */}
            <InvoicedItemsModal
                invoicedItemsListTable={
                    <InvoicedItemsListTable
                        invoicedItemsData={invoicedItemsData}
                        invoicesPage={invoicesPage}
                    />
                }
            />
        </>
    )
}

export default Invoices