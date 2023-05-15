import moment from 'moment'
import React from 'react'

const PackedItemsListTable = ({ packedItemsData, generateChallans }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Package Date</th>
                            <th scope="col" className='text-nowrap'>Package Id</th>
                            <th scope="col" className='text-nowrap'>Customer Name</th>
                            <th scope="col" className='text-nowrap'>Email</th>
                            <th scope="col" className='text-nowrap'>Phone Number</th>
                            <th scope="col" className='text-nowrap'>Address</th>
                            <th scope="col" className='text-nowrap'>Item Group</th>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>Image</th>
                            <th scope="col" className='text-nowrap'>Quantity</th>
                            <th scope="col" className='text-nowrap'>Price Per Item</th>
                            <th scope="col" className='text-nowrap'>Total</th>
                            <th scope="col" className='text-nowrap'>Challans / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packedItemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.package_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`PKG - ${value.packed_id}`}</td>
                                    <td className='text-nowrap'>{value.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.order_id.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap'>{value.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.order_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.order_id.quantity}</td>
                                    <td className='text-nowrap'>{value.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.order_id.ordered_price_per_item * value.order_id.quantity}</td>
                                    <td className='text-nowrap'>
                                        {value.order_id.order_status === "Packed" && (
                                            <button className='btn btn-primary w-100' onClick={(e) => { generateChallans(e, value) }}>Generate</button>
                                        )}
                                        {value.order_id.order_status === "Challans Generated" && (
                                            <span className="badge rounded-pill text-bg-info text-white w-100 p-2">{value.order_id.order_status}</span>
                                        )}
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

export default PackedItemsListTable