import React from 'react'

const ProductSalesTotalValueSummary = ({ productSalesSummaryData }) => {
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
                                {productSalesSummaryData.length === 0 ? (
                                    <h3 className="text-secondary">₹ 0</h3>
                                ) : (
                                    productSalesSummaryData.map((value, index) => {
                                        return (
                                            <h3 className="text-secondary" key={index}>{`₹ ${value.salesTotalPrice}`}</h3>
                                        )
                                    })
                                )}
                                <span className="text-secondary">Product Sales Value</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSalesTotalValueSummary