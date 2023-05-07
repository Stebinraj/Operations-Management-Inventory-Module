import React from 'react'
import Layouts from '../components/Layouts/Layouts';

const SalesOrders = () => {

    // pages to render
    const salesOrder = true;

    return (
        <>
            {/* layouts components */}
            <Layouts salesOrder={salesOrder} />
        </>
    )
}

export default SalesOrders