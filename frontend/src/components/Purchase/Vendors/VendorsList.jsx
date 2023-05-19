import React from 'react'

const VendorsList = ({ vendorsListTable }) => {
    return (
        <>
            <div className="col-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        {/* vendors list table component */}
                        {vendorsListTable}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorsList