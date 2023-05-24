import React from 'react'

const RegisteredVendorsSummary = ({ vendorCountData }) => {

    const minProgressValue = 0;
    const maxProgressValue = vendorCountData > 0 ? vendorCountData + 100 : 100;
    const progressValue = vendorCountData > 0 ? (vendorCountData / maxProgressValue) * 100 : minProgressValue;

    return (
        <>
            <div className="col-xl-3 col-md-6">
                <div className="stats card l-bg-cherry">
                    <div className="card-statistic-3 p-4">
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Registered Vendors</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                {vendorCountData.length === 0 ? (
                                    <h2 className="d-flex align-items-center mb-0">0</h2>
                                ) : (
                                    <h2 className="d-flex align-items-center mb-0">{vendorCountData}</h2>
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

export default RegisteredVendorsSummary