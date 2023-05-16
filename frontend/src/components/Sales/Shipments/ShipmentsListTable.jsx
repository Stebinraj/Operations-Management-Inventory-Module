import moment from 'moment'
import React from 'react'

const ShipmentsListTable = ({ shipmentsData, shipmentsPage }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Shipped Date</th>
                            <th scope="col" className='text-nowrap'>Shipped Id</th>
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
                            {shipmentsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.shipment_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`SH - ${value.shipped_id}`}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.quantity}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.delivery_challans_id.package_id.order_id.total}</td>
                                    <td className='text-nowrap'>
                                        {value.delivery_challans_id.package_id.order_id.order_status === "Shipped" && (
                                            shipmentsPage ? (
                                                <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.delivery_challans_id.package_id.order_id.order_status}</span>
                                            ) : null
                                        )}
                                    </td>
                                    {/* <td className='text-nowrap'>{value.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.quantity}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.package_id.order_id.total}</td> */}
                                    {/* <td className='text-nowrap'>
                                        {value.package_id.order_id.order_status === "Challans Generated" && (
                                            deliveryChallansPage ? (
                                                <span className="badge rounded-pill text-bg-info text-white w-100 p-2">{value.package_id.order_id.order_status}</span>
                                            ) : shipmentsPage && (
                                                <button className="btn btn-primary w-100" onClick={(e) => { markAsShipped(e, value) }}>Mark as Shipped</button>
                                            )
                                        )}
                                    </td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShipmentsListTable