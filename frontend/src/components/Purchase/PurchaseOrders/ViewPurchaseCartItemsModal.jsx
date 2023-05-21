import React from 'react'

const ViewPurchaseCartItemsModal = ({ purchaseCartListTable, purchaseCartData, orderPurchaseItems }) => {
    return (
        <>
            {/* view purchase cart items modal */}
            <div className="modal fade" id="purchaseCartItems" tabIndex={-1} aria-labelledby="purchaseCartItemsLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cart Items</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* purchase Cart list table Component */}
                                {purchaseCartListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { orderPurchaseItems(e, purchaseCartData) }}>Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* view purchase cart items modal */}
        </>
    )
}

export default ViewPurchaseCartItemsModal