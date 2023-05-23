import React from 'react'

const NewOrdersTotalValueSummary = ({ ordersSummaryData }) => {
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
                                        <h3 className="text-secondary" key={index}>{`₹ ${value.orderTotalPrice}`}</h3>
                                    )
                                })}
                                <span className="text-secondary">New Orders Value</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewOrdersTotalValueSummary