import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import SalesOrders from '../components/Sales/SalesOrders/SalesOrders';

const SalesOrdersPage = () => {

    // pages to render
    const salesOrder = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        salesOrder={
                            salesOrder &&
                            <SalesOrders
                                salesOrderPage={salesOrder}
                            />
                        }
                    />
                }
            />
        </>
    )

}

export default SalesOrdersPage