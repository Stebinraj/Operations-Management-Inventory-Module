import React from 'react'

const SalesByItemsOrCustomersSummary = ({ ordersListTable }) => {
    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-header row">
                        <h5 className="m-0 col-2">Sales</h5>
                        <div className="d-lg-flex col-10">
                            <form className='row w-100'>
                                <div className="mb-0 form-group col-md-6 col-lg-4 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Filter By</span>
                                    <input type="text" className="form-control" placeholder='Enter Item Name' />
                                </div>
                                <div className="mb-0 form-group col-md-6 col-lg-5 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Items / Customer</span>
                                    <input type="text" className="form-control" placeholder='Enter Item Name' />
                                </div>
                                <div className="form-group col-lg-2 mb-0">
                                    <button className='btn btn-primary w-100'>Filter</button>
                                </div>
                            </form>
                            <div className="form-group col-lg-2 mt-auto row d-lg-flex mb-0">
                                <button className='btn btn-primary w-100' >Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {/* orders Table List component */}
                        {ordersListTable}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesByItemsOrCustomersSummary