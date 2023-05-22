import React from 'react'

const VendorCreditModal = ({ vendorCreditsListTable }) => {
    return (
        <>
            {/* vendor credits modal */}
            <div className="modal fade" id="vendorsCredited" tabIndex={-1} aria-labelledby="vendorsCreditedLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Vendors Credited</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* vendor credits list table components */}
                                {vendorCreditsListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* vendor credits modal */}
        </>
    )
}

export default VendorCreditModal