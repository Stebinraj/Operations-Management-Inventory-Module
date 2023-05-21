import React from 'react'

const ReceivedOrdersModal = ({ receivedOrdersListTable }) => {
    return (
        <>
            {/* received orders modal */}
            <div className="modal fade" id="receivedOrders" tabIndex={-1} aria-labelledby="purchaseOrderItemsLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Received Orders Items</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* received orders list table components */}
                                {receivedOrdersListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* received orders modal */}
        </>
    )
}

export default ReceivedOrdersModal