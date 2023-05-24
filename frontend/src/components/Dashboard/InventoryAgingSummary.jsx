import React from 'react'

const InventoryAgingSummary = ({ inventoryAgingSummaryListTable }) => {
    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h5 className="m-0">Inventory Aging Summary</h5>
                    </div>
                    <div className="card-body">
                        {/* inventory aging summary Table List component */}
                        {inventoryAgingSummaryListTable}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventoryAgingSummary