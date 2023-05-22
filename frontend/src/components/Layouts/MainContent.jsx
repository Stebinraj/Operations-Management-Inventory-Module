import React from 'react'

const MainContent = ({ dashboard, itemGroup, customers, items, inventoryAdjustment, salesOrder, packages, deliveryChallans, shipments, deliveredItems, invoices, paymentsReceived, salesReturns, returns, creditNotes, vendors, purchaseOrders, receivedOrders, bills, billPayments, vendorCredit }) => {
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
                    {invoices}
                    {paymentsReceived}
                    {salesReturns}
                    {returns}
                    {creditNotes}
                    {vendors}
                    {purchaseOrders}
                    {receivedOrders}
                    {bills}
                    {billPayments}
                    {vendorCredit}
                </div>
            </div>
        </>
    )
}

export default MainContent