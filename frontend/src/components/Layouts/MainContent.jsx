import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ItemsGroup from '../Inventory/Items-Group/ItemsGroup'
import ViewItems from '../Inventory/Items/ViewItems'
import InventoryAdjustments from '../Inventory/Adjustments/InventoryAdjustments'
import Customers from '../Sales/Customers/Customers'

const MainContent = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {props.dashboard && (<Dashboard />)}
                    {props.itemGroup && (<ItemsGroup />)}
                    {props.items && (<ViewItems />)}
                    {props.inventoryAdjustment && (<InventoryAdjustments />)}
                    {props.customers && (<Customers />)}
                </div>
            </div>
        </>
    )
}

export default MainContent