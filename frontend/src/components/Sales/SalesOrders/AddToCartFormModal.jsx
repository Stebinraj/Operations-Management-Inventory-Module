import React from 'react'

const AddToCartFormModal = ({ customer_id, handleCustomerChange, customerData, customerEmail, customerPhoneNumber, customerBillingAddress, setQuantity, quantity, total_price, handleCartClose, addItemsToCart }) => {
    return (
        <>
            {/* add to cart form modal */}
            <div className="modal fade" id="addToCart" tabIndex={-1} aria-labelledby="addToCartLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ minWidth: '50%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add to Cart</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCartClose}></button>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-md-6">
                                    <span className="card-text">Select Customer</span>
                                    <select className="form-control" value={customer_id} onChange={handleCustomerChange}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        {customerData.map((value, index) => {
                                            return (
                                                <option key={index} value={value._id}>{value.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Email</span>
                                    <input className='form-control' disabled={true} defaultValue={customerEmail} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Phone Number</span>
                                    <input className='form-control' disabled={true} defaultValue={customerPhoneNumber} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Billing Address</span>
                                    <textarea className='form-control' disabled defaultValue={customerBillingAddress}></textarea>
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Quantity</span>
                                    <input className='form-control' type='number' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Total Price</span>
                                    <input className='form-control' disabled={true} value={total_price} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCartClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItemsToCart}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* add to cart form modal */}
        </>
    )
}

export default AddToCartFormModal