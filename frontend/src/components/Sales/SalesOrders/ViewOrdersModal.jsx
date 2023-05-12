import React from 'react'
import OrdersListTable from './OrdersListTable'

const ViewOrdersModal = ({ orderItemsData }) => {
    return (
        <>
            {/* view orders modal */}
            <div className="modal fade" id="orderItems" tabIndex={-1} aria-labelledby="orderItemsLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Order Items</h1>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* orders list table components */}
                                <OrdersListTable orderItemsData={orderItemsData} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* view orders modal */}
        </>
    )
}

export default ViewOrdersModal