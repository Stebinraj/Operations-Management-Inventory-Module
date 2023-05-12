import moment from 'moment'
import React from 'react'

const OrdersListTable = ({ orderItemsData }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Order Id</th>
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
                            <th scope="col" className='text-nowrap'>Order Date</th>
                            <th scope="col" className='text-nowrap'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{value.ordered_id}</td>
                                    <td className='text-nowrap'>{value.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.customer_id.billing_address}</td>
                                    <td className='text-nowrap'>{value.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.quantity}</td>
                                    <td className='text-nowrap'>{value.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.quantity * value.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{moment(value.order_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>
                                        {value.order_status === "Confirmed" && (
                                            <span className="badge rounded-pill text-bg-primary">{value.order_status}</span>
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

export default OrdersListTable