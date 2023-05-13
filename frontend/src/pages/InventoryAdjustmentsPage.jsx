import React from 'react'
import InventoryAdjustments from '../components/Inventory/Adjustments/InventoryAdjustments';
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';

const InventoryAdjustmentsPage = () => {

    // pages to render
    const inventoryAdjustment = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        inventoryAdjustment={
                            inventoryAdjustment && <InventoryAdjustments />
                        }
                    />
                }
            />
        </>
    )
}

export default InventoryAdjustmentsPage