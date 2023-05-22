import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BillsListTable from '../Bills/BillsListTable';
import { toast } from 'react-toastify';
import BillPaymentsIconLabelLink from './BillPaymentsIconLabelLink';
import BillsPaymentModal from './BillsPaymentModal';
import BillPaymentsListTable from './BillPaymentsListTable';

const BillPayments = ({ billPaymentsPage }) => {

    const [billsData, setBillsData] = useState([]);
    const [billsPaymentsData, setBillsPaymentsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const paid_id = String(randomNum).padStart(10, '0');

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
    };

    // mark the billed items as paid
    const markAsBillPaid = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/payments/bills', {
                billed_id: await value._id,
                purchased_id: await value.received_order_id.purchased_id._id,
                paid_date: new Date(),
                paid_id,
                paid_status: 'Paid'
            });
            if (response && response.data.success) {
                toast.success('Paid Successfully !!!');
                await getBill();
                await getBillPayments();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // fetch payments lists and set to billsPaymentsData
    const getBillPayments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/payments/bills');
            if (response && response.data.success) {
                setBillsPaymentsData(response.data.success.filter(items => items.billed_id.received_order_id.purchased_id.purchase_status === "Paid"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle side-effects while fetching items
    useEffect(() => {
        getBill();
        getBillPayments();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* bills payments icon with label link component */}
                <BillPaymentsIconLabelLink
                    billsPaymentsData={billsPaymentsData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* bill list table component */}
                <BillsListTable
                    billsData={billsData}
                    billPaymentsPage={billPaymentsPage}
                    markAsBillPaid={markAsBillPaid}
                />
            </div>

            {/* bill payments modal component */}
            <BillsPaymentModal
                billPaymentsListTable={
                    <BillPaymentsListTable
                        billsPaymentsData={billsPaymentsData}
                        billPaymentsPage={billPaymentsPage}
                    />
                }
            />
        </>
    )
}

export default BillPayments