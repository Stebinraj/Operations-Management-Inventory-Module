import React from 'react'

const MainContent = ({ dashboard, itemGroup, customers, items, inventoryAdjustment, salesOrder, packages, deliveryChallans, shipments, deliveredItems }) => {
    return (
        <>
            {/* main content */}
            <div className="container-fluid">
                <div className="row">
                    {dashboard}
                    {itemGroup}
                    {items}
                    {inventoryAdjustment}
                    {customers}
                    {salesOrder}
                    {packages}
                    {deliveryChallans}
                    {shipments}
                    {deliveredItems}
                </div>
            </div>
        </>
    )
}

export default MainContent