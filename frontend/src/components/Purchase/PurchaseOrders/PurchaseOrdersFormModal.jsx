import numeral from 'numeral'
import React from 'react'

const PurchaseOrdersFormModal = ({ purchase_quantity, total_price, vendor, setPurchaseQuantity, handlePurchaseCartClose, addItemsToPurchaseCart }) => {
    return (
        <>
            {/* add to purchase cart form modal */}
            <div className="modal fade" id="addToPurchaseCart" tabIndex={-1} aria-labelledby="addToPurchaseCartLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ minWidth: '10%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add to Cart</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handlePurchaseCartClose}></button>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-12">
                                    <span>Vendor</span>
                                    <input className='form-control' disabled={true} defaultValue={vendor} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Quantity</span>
                                    <input className='form-control' type='number' onChange={(e) => { setPurchaseQuantity(e.target.value) }} value={purchase_quantity} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Total Price</span>
                                    <input className='form-control' disabled={true} value={`₹ ${numeral(total_price).format('0,0')}`} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handlePurchaseCartClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItemsToPurchaseCart}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* add to purchase cart form modal */}
        </>
    )
}

export default PurchaseOrdersFormModal