import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import BillPayments from '../components/Purchase/BillPayments/BillPayments';

const BillPaymentsPage = () => {

    const billPayments = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        billPayments={
                            billPayments &&
                            <BillPayments
                                billPaymentsPage={billPayments}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default BillPaymentsPage