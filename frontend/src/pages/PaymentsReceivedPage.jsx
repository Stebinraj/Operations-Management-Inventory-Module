import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import MainContent from '../components/Layouts/MainContent'
import PaymentsReceived from '../components/Sales/PaymentsReceived/PaymentsReceived';

const PaymentsReceivedPage = () => {

    const paymentsReceived = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        paymentsReceived={
                            paymentsReceived && <PaymentsReceived
                                paymentsReceivedPage={paymentsReceived}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default PaymentsReceivedPage