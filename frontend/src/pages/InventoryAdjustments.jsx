import React from 'react'
import Layouts from '../components/Layouts/Layouts';

const InventoryAdjustments = () => {

    // pages to render
    const inventoryAdjustment = true;

    return (
        <>
            {/* layouts components */}
            <Layouts inventoryAdjustment={inventoryAdjustment} />
        </>
    )
}

export default InventoryAdjustments