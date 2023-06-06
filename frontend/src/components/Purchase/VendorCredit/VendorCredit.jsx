import React, { useEffect, useState } from 'react'
import BillPaymentsListTable from '../BillPayments/BillPaymentsListTable';
import axios from 'axios';
import { toast } from 'react-toastify';
import VendorCreditIconLabelLink from './VendorCreditIconLabelLink';
import VendorCreditModal from './VendorCreditModal';
import VendorCreditsListTable from './VendorCreditsListTable';
import { v4 as uuidv4 } from 'uuid';

const VendorCredit = ({ vendorCreditPage }) => {

    const [billsPaymentsData, setBillsPaymentsData] = useState([]);
    const [vendorCreditsData, setVendorCreditsData] = useState([]);

    // fetch payments lists and set to billsPaymentsData
    const getBillPayments = async () => {
        try {
            const response = await axios.get('/payments/bills');
            if (response && response.data.success) {
                setBillsPaymentsData(response.data.success.filter(items => items.billed_id.received_order_id.purchased_id.purchase_status === "Paid"));
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // issuue vendor credits if payments of purchase orders true
    const issueVendorCredits = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post('/purchase/vendor/credits', {
                payment_id: await value._id,
                credit_id: uuidv4().replace(/-/g, ''),
                credit_date: new Date(),
                credit_status: 'Credited',
                purchased_id: await value.billed_id.received_order_id.purchased_id._id
            });
            if (response && response.data.success) {
                toast.success('Credited !!!');
                await getBillPayments();
                await getVendorCredits();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch vendor credits and set to vendorCreditsData
    const getVendorCredits = async () => {
        try {
            const response = await axios.get('/purchase/vendor/credits');
            if (response && response.data.success) {
                setVendorCreditsData(response.data.success.filter(items => items.payment_id.billed_id.received_order_id.purchased_id.purchase_status === "Credited"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getBillPayments();
        getVendorCredits();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* vendor credited icon with label link component */}
                <VendorCreditIconLabelLink
                    vendorCreditsData={vendorCreditsData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* bill payments list table component */}
                <BillPaymentsListTable
                    billsPaymentsData={billsPaymentsData}
                    vendorCreditPage={vendorCreditPage}
                    issueVendorCredits={issueVendorCredits}
                />
            </div>

            {/* vendor credit modal component */}
            <VendorCreditModal
                vendorCreditsListTable={
                    <VendorCreditsListTable
                        vendorCreditsData={vendorCreditsData}
                        vendorCreditPage={vendorCreditPage}
                    />
                }
            />
        </>
    )
}

export default VendorCredit