import React from 'react'

const RegisteredCustomersSummary = ({ customerCountData }) => {
    return (
        <>
            <div className="col-md-6 col-xl-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center">
                                <i className="bi bi-cart fs-1 text-primary" />
                            </div>
                            <div className="text-right">
                                {customerCountData.length === 0 ? (
                                    <h3 className="text-secondary">0</h3>
                                ) : (
                                    <h3 className="text-secondary">{customerCountData.length}</h3>
                                )}
                                <span className="text-secondary">Registered Customers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisteredCustomersSummary