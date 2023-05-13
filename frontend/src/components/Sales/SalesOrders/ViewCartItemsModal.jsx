import React from 'react'

const ViewCartItemsModal = ({ cartItemsData, cartListTable, handleCartClose, orderItems }) => {
    return (
        <>
            {/* view cart items modal */}
            <div className="modal fade" id="cartItems" tabIndex={-1} aria-labelledby="cartItemsLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cart Items</h1>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* Cart list table Component */}
                                {cartListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCartClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { orderItems(e, cartItemsData) }}>Order</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* view cart items modal */}
        </>
    )
}

export default ViewCartItemsModal