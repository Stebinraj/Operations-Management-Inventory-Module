import React from 'react'

const NewOrdersSummary = ({ ordersSummaryData }) => {
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
                                {ordersSummaryData.map((value, index) => {
                                    return (
                                        <h3 className="text-secondary" key={index}>{value.orderQuantity}</h3>
                                    )
                                })}
                                <span className="text-secondary">New Orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewOrdersSummary