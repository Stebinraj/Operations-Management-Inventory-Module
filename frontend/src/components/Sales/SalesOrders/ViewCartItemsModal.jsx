import React from 'react'

const ViewCartItemsModal = ({ cartItemsData, deleteCartItems, handleCartClose, orderItems }) => {
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
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered">
                                        <thead className='text-bg-primary'>
                                            <tr>
                                                <th scope="col" className='text-nowrap'>Email</th>
                                                <th scope="col" className='text-nowrap'>Item Group</th>
                                                <th scope="col" className='text-nowrap'>Item Name</th>
                                                <th scope="col" className='text-nowrap'>Image</th>
                                                <th scope="col" className='text-nowrap'>Quantity</th>
                                                <th scope="col" className='text-nowrap'>Total Price</th>
                                                <th scope="col" className='text-nowrap'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItemsData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='text-nowrap'>{value.customer_id.email}</td>
                                                        <td className='text-nowrap'>{value.item_id.item_group_id.item_group_label}</td>
                                                        <td className='text-nowrap'>{value.item_id.item_name}</td>
                                                        <td className='text-nowrap'>{value.item_id.image_of_item}</td>
                                                        <td className='text-nowrap'>{value.quantity}</td>
                                                        <td className='text-nowrap'>{value.quantity * value.item_id.selling_price}</td>
                                                        <td className='text-nowrap'>
                                                            <button className='btn btn-primary' onClick={(e) => { deleteCartItems(e, value) }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
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