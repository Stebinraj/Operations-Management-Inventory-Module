import React from 'react'

const SalesByItemsOrCustomersSummary = ({ ordersListTable, filterId, setFilterId, filterBy, handleFilterBy, filterSalesOrders, customerOrFilterItemsData, resetSalesOrder }) => {
    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-header row">
                        <h5 className="m-0 col-2">Sales</h5>
                        <div className="col-10">
                            <form className='row col-12 d-flex'>
                                <div className="mb-2 form-group col-sm-6 col-lg-3 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Filter By</span>
                                    <select aria-label="Select-filter-by" id='filter-by' className={filterBy.class ? (`form-control ${filterBy.class}`) : ('form-control')} value={filterBy.filterBy} onChange={handleFilterBy}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Items">Items</option>
                                    </select>
                                    {filterBy.feedback && (
                                        <>
                                            <small className="valid-feedback">{filterBy.feedback}</small>
                                            <small className="invalid-feedback">{filterBy.feedback}</small>
                                        </>
                                    )}
                                </div>
                                <div className="mb-2 form-group col-sm-6 col-lg-5 d-lg-flex">
                                    <span className="card-text text-nowrap my-auto me-2">Items / Customers</span>
                                    <select aria-label="Select-filter-by-items-or-customers" id='filter-by-customer-items' className={filterId.class ? (`form-control ${filterId.class}`) : ('form-control')} value={filterId.filterId} onChange={(e) => { setFilterId({ ...filterId, filterId: e.target.value }) }}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        {customerOrFilterItemsData.map((value, index) => {
                                            return filterBy.filterBy === "Customer" ? (
                                                <option key={index} value={value.name}>{value.name}</option>
                                            ) : filterBy.filterBy === "Items" ? (
                                                <option key={index} value={value.item_name}>{value.item_name}</option>
                                            ) : null;
                                        })}
                                    </select>
                                    {filterId.feedback && (
                                        <>
                                            <small className="valid-feedback">{filterId.feedback}</small>
                                            <small className="invalid-feedback">{filterId.feedback}</small>
                                        </>
                                    )}
                                </div>
                                <div className="form-group col-sm-6 col-lg-2 mb-2">
                                    <button type='submit' className='btn btn-primary w-100' onClick={filterSalesOrders}>Filter</button>
                                </div>
                                <div className="form-group col-sm-6 col-lg-2 mt-auto d-lg-flex mb-2">
                                    <button type='button' className='btn btn-primary w-100' onClick={resetSalesOrder}>Reset</button>
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