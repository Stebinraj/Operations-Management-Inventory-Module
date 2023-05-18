import React from 'react'

const ShipmentsModal = ({ shipmentsListTable }) => {
    return (
        <>
            {/* shipments modal */}
            <div className="modal fade" id="shipments" tabIndex={-1} aria-labelledby="shipmentsLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Shipped Items</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* shipments list table components */}
                                {shipmentsListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* shipments modal */}
        </>
    )
}

export default ShipmentsModal