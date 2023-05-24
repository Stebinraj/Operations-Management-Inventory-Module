import React from 'react'

const PackedItemsTotalValueSummary = ({ packedItemsData }) => {

    const minProgressValue = 0;
    const maxProgressValue = packedItemsData.length > 0 ? packedItemsData[0].packedItemsTotalPrice + 10000 : 100;
    const progressValue = packedItemsData.length > 0 ? (packedItemsData[0].packedItemsTotalPrice / maxProgressValue) * 100 : minProgressValue;

    return (
        <>
            <div className="col-xl-3 col-lg-6">
                <div className="stats card l-bg-orange-dark">
                    <div className="card-statistic-3 p-4">
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Packed Items Value</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                {packedItemsData.length === 0 ? (
                                    <h2 className="d-flex align-items-center mb-0">₹ 0</h2>
                                ) : (
                                    packedItemsData.map((value, index) => (
                                        <h2 className="d-flex align-items-center mb-0" key={index}>{`₹ ${value.packedItemsTotalPrice}`}</h2>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="progress mt-1" style={{ height: '8px' }}>
                            <div className="progress-bar l-bg-cyan" role="progressbar" aria-valuenow={progressValue} aria-valuemin={minProgressValue} aria-valuemax={maxProgressValue} style={{ width: `${progressValue}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackedItemsTotalValueSummary