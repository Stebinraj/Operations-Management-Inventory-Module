import React from 'react'

const InventorySummary = ({ inventorySummaryData }) => {
    return (
        <>
            <div className="col-md-6 col-xl-3">
                <div className="card text-bg-primary mb-3 border border-white">
                    <div className="card-body d-flex align-items-center">
                        <div className="position-absolute end-0 me-3">
                            <i className="bi bi-bag-plus-fill text-white" style={{ fontSize: '40px' }}></i>
                        </div>
                        <div>
                            <h4>Inventory</h4>
                            {inventorySummaryData.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <h6>{`Stock : ${value.inventoryTotalStock}`}</h6>
                                        <h6>{`Price : ₹ ${value.inventoryTotalPrice}`}</h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventorySummary