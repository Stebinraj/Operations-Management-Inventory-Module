import React, { useEffect, useState } from 'react'
import InvoicedItemsListTable from '../Invoices/InvoicedItemsListTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import PaymentReceivedIconLabelLink from './PaymentReceivedIconLabelLink';
import PaymentsReceivedModel from './PaymentsReceivedModel';
import PaymentsReceivedListTable from './PaymentsReceivedListTable';

const PaymentsReceived = ({ paymentsReceivedPage }) => {

    const [invoicedItemsData, setInvoicedItemsData] = useState([]);
    const [paymentsReceivedData, setPaymentsReceivedData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const paid_id = String(randomNum).padStart(10, '0');

    // fetch invoiced items and set to invoicedItemsData
    const getInvoicedItems = async () => {
        try {
            const response = await axios.get(`/invoices`);
            if (response && response.data.success) {
                setInvoicedItemsData(response.data.success.filter(items => items.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Invoiced"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // mark the invoiced items as paid
    const markAsPaid = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/payments`, {
                invoice_id: await value._id,
                paid_id,
                paid_date: new Date(),
                payment_status: 'Paid',
                order_id: await value.delivery_id.shipments_id.delivery_challans_id.package_id.order_id._id
            });
            if (response && response.data.success) {
                toast.success('Payments Received !!!');
                await getInvoicedItems();
                await getPayments();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // fetch payments and set to paymentsReceivedData
    const getPayments = async () => {
        try {
            const response = await axios.get(`/payments`);
            if (response && response.data.success) {
                setPaymentsReceivedData(response.data.success.filter(items => items.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Paid"))
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getInvoicedItems();
        getPayments();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* payment received icon label component */}
                <PaymentReceivedIconLabelLink
                    paymentsReceivedData={paymentsReceivedData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* invoices list table component */}
                <InvoicedItemsListTable
                    invoicedItemsData={invoicedItemsData}
                    paymentsReceivedPage={paymentsReceivedPage}
                    markAsPaid={markAsPaid}
                />
            </div>

            {/* payment received model component */}
            <PaymentsReceivedModel
                paymentsReceivedListTable={
                    <PaymentsReceivedListTable
                        paymentsReceivedPage={paymentsReceivedPage}
                        paymentsReceivedData={paymentsReceivedData}
                    />
                }
            />
        </>
    )
}

export default PaymentsReceived