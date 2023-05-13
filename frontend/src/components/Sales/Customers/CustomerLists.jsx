import React from 'react'

const CustomerLists = ({ customerListTable }) => {

    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        {/* customer list table component */}
                        {customerListTable}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerLists