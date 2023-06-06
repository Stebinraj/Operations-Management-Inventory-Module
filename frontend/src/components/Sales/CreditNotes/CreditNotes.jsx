import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReturnedItemsListTable from '../ReturnedItems/ReturnedItemsListTable';
import CreditNotesIconLabelLink from './CreditNotesIconLabelLink';
import { toast } from 'react-toastify';
import CreditNotesModal from './CreditNotesModal';
import CreditNotesListTable from './CreditNotesListTable';
import { v4 as uuidv4 } from 'uuid';

const CreditNotes = ({ creditNotesPage }) => {

    const [returnedItemsData, setReturnedItemsData] = useState([]);
    const [creditNotesData, setCreditNotesData] = useState([]);

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

    // issue credit notes for returned items
    const issueCredits = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/credit-notes`, {
                returned_id: await value._id,
                credit_id: uuidv4().replace(/-/g, ''),
                credit_date: new Date(),
                credit_status: 'Credited',
                order_id: await value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id._id
            });
            if (response && response.data.success) {
                toast.success('Credits Issued !!!');
                await getReturnedItems();
                await getCreditNotes();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch credit notes and set to crediNotesData
    const getCreditNotes = async () => {
        try {
            const response = await axios.get(`/credit-notes`);
            if (response && response.data.success) {
                setCreditNotesData(response.data.success.filter(items => items.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Credited"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getReturnedItems();
        getCreditNotes();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* issued credits notes icon label component */}
                <CreditNotesIconLabelLink
                    creditNotesData={creditNotesData}
                />
            </div>


            <div className="card card-primary card-outline">
                {/* returned items list table component */}
                <ReturnedItemsListTable
                    returnedItemsData={returnedItemsData}
                    creditNotesPage={creditNotesPage}
                    issueCredits={issueCredits}
                />
            </div>

            <CreditNotesModal
                creditNotesListTable={
                    <CreditNotesListTable
                        creditNotesData={creditNotesData}
                        creditNotesPage={creditNotesPage}
                    />
                }
            />
        </>
    )
}

export default CreditNotes