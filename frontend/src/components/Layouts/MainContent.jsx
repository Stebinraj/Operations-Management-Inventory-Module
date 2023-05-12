import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ItemsGroup from '../Inventory/Items-Group/ItemsGroup'
import ViewItems from '../Inventory/Items/ViewItems'
import InventoryAdjustments from '../Inventory/Adjustments/InventoryAdjustments'
import Customers from '../Sales/Customers/Customers'
import SalesOrders from '../Sales/SalesOrders/SalesOrders'
import Packages from '../Sales/Packages/Packages'

const MainContent = (props) => {
    return (
        <>
            {/* main content */}
            <div className="container-fluid">
                <div className="row">
                    {props.dashboard && (<Dashboard />)}
                    {props.itemGroup && (<ItemsGroup />)}
                    {props.items && (<ViewItems itemsPage={props.items} />)}
                    {props.inventoryAdjustment && (<InventoryAdjustments />)}
                    {props.customers && (<Customers />)}
                    {props.salesOrder && (<SalesOrders salesOrderPage={props.salesOrder} />)}
                    {props.packages && (<Packages />)}
                </div>
            </div>
        </>
    )
}

export default MainContent