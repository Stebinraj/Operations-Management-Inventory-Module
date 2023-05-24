import React from 'react'

const NewOrdersTotalValueSummary = ({ ordersSummaryData }) => {

    const minProgressValue = 0;
    const maxProgressValue = ordersSummaryData.length > 0 ? ordersSummaryData[0].orderTotalPrice + 10000 : 100;
    const progressValue = ordersSummaryData.length > 0 ? (ordersSummaryData[0].orderTotalPrice / maxProgressValue) * 100 : minProgressValue;

    return (
        <>
            <div className="col-xl-3 col-md-6">
                <div className="stats card l-bg-blue-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="mb-4">
                            <h5 className="card-title mb-0">New Orders Value</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                {ordersSummaryData.length === 0 ? (
                                    <h2 className="d-flex align-items-center mb-0">₹ 0</h2>
                                ) : (
                                    ordersSummaryData.map((value, index) => (
                                        <h2 className="d-flex align-items-center mb-0" key={index}>{`₹ ${value.orderTotalPrice}`}</h2>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="progress mt-1" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-green" role="progressbar" aria-valuenow={progressValue} aria-valuemin={minProgressValue} aria-valuemax={maxProgressValue} style={{ width: `${progressValue}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewOrdersTotalValueSummary