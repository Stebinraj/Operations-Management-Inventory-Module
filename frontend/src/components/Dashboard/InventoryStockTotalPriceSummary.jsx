import React from 'react'

const InventoryStockTotalPriceSummary = ({ inventorySummaryData }) => {

    const minProgressValue = 0;
    const maxProgressValue = inventorySummaryData.length > 0 ? inventorySummaryData[0].inventoryTotalPrice + 10000 : 100;
    const progressValue = inventorySummaryData.length > 0 ? (inventorySummaryData[0].inventoryTotalPrice / maxProgressValue) * 100 : minProgressValue;

    return (
        <>
            {/* <div className="col-md-6 col-xl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center">
                                <i className="bi bi-cart fs-1" style={{color:'indigo'}} />
                            </div>
                            <div className="text-right">
                                {inventorySummaryData.length === 0 ? (
                                    <h3 className="text-secondary">₹ 0</h3>
                                ) : (
                                    inventorySummaryData.map((value, index) => {
                                        return (
                                            <h3 className="text-secondary" key={index}>{`₹ ${value.inventoryTotalPrice}`}</h3>
                                        )
                                    })
                                )}
                                <span className="text-secondary">Inventory Stock Value</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="col-xl-3 col-lg-6">
                <div className="stats card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="card-icon card-icon-large"><i className="fas fa-users" /></div>
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Inventory Stock Value</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                {inventorySummaryData.length === 0 ? (
                                    <h2 className="d-flex align-items-center mb-0">₹ 0</h2>
                                ) : (
                                    inventorySummaryData.map((value, index) => (
                                        <h2 className="d-flex align-items-center mb-0" key={index}>{`₹ ${value.inventoryTotalPrice}`}</h2>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="progress mt-1" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-orange" role="progressbar" aria-valuenow={progressValue} aria-valuemin={minProgressValue} aria-valuemax={maxProgressValue} style={{ width: `${progressValue}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventoryStockTotalPriceSummary