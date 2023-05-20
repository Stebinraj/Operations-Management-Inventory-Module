import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import PurchaseOrders from '../components/Purchase/PurchaseOrders/PurchaseOrders';

const PurchaseOrdersPage = () => {

    const purchaseOrders = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        purchaseOrders={
                            purchaseOrders &&
                            <PurchaseOrders
                                purchaseOrdersPage={purchaseOrders}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default PurchaseOrdersPage