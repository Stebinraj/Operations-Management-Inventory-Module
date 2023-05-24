import React from 'react'

const ReturnedItemsTotalValueSummary = ({ returnedItemsData }) => {

    const minProgressValue = 0;
    const maxProgressValue = returnedItemsData.length > 0 ? returnedItemsData[0].returnedItemsPrice + 10000 : 100;
    const progressValue = returnedItemsData.length > 0 ? (returnedItemsData[0].returnedItemsPrice / maxProgressValue) * 100 : minProgressValue;


    return (
        <>
            <div className="col-xl-3 col-lg-6">
                <div className="stats card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Returned Items Value</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                {returnedItemsData.length === 0 ? (
                                    <h2 className="d-flex align-items-center mb-0">₹ 0</h2>
                                ) : (
                                    returnedItemsData.map((value, index) => (
                                        <h2 className="d-flex align-items-center mb-0" key={index}>{`₹ ${value.returnedItemsPrice}`}</h2>
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

export default ReturnedItemsTotalValueSummary