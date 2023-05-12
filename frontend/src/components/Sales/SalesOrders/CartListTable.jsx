import React from 'react'

const CartListTable = ({ deleteCartItems, cartItemsData }) => {
    return (
        <>
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
        </>
    )
}

export default CartListTable