import React from 'react'
import ReceivedOrders from '../components/Purchase/ReceivedOrders/ReceivedOrders';
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';

const ReceivedOrdersPage = () => {

    const receivedOrders = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        receivedOrders={
                            receivedOrders &&
                            <ReceivedOrders
                                receivedOrdersPage={receivedOrders}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default ReceivedOrdersPage