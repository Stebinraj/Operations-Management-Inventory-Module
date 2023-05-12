import React from 'react'
import CustomerListTable from './CustomerListTable'

const CustomerLists = ({ customerData, handleUpdateData }) => {

    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        {/* customer list table component */}
                        <CustomerListTable
                            customerData={customerData}
                            handleUpdateData={handleUpdateData}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerLists