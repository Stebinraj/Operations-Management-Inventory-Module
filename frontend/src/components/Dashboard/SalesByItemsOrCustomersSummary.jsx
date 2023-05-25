import React from 'react'

const SalesByItemsOrCustomersSummary = ({ ordersListTable }) => {
    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-header row">
                        <h5 className="m-0 col-2">Sales</h5>
                        <div className="col-10">
                            <form className='row col-12'>
                                <div className="mb-2 form-group col-sm-6 col-lg-3 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Filter By</span>
                                    <select className="form-control">
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        <option>hello</option>
                                    </select>
                                </div>
                                <div className="mb-2 form-group col-sm-6 col-lg-5 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Items / Customers</span>
                                    <select className="form-control">
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        <option>hello</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-6 col-lg-2 mb-2">
                                    <button type='submit' className='btn btn-primary w-100'>Filter</button>
                                </div>
                                <div className="form-group col-sm-6 col-lg-2 mt-auto d-lg-flex mb-2">
                                    <button type='button' className='btn btn-primary w-100' >Reset</button>
                                </div>
                            </form>
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