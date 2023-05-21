import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BillsListTable from '../Bills/BillsListTable';
import { toast } from 'react-toastify';

const BillPayments = ({ billPaymentsPage }) => {

    const [billsData, setBillsData] = useState([]);
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
                toast.success('Marked as Paid !!!');
                await getBill();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getBill();
    }, []);

    return (
        <>
            <div className="card card-primary card-outline">
                {/* bill payments list table component */}
                <BillsListTable
                    billsData={billsData}
                    billPaymentsPage={billPaymentsPage}
                    markAsBillPaid={markAsBillPaid}
                />
            </div>
        </>
    )
}

export default BillPayments