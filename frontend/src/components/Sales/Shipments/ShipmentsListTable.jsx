import moment from 'moment'
import numeral from 'numeral'
import React from 'react'

const ShipmentsListTable = ({ shipmentsData, shipmentsPage, deliveredItemsPage, markAsDelivered }) => {
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
                            <th scope="col" className='text-nowrap'>Total Price</th>
                            {shipmentsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {deliveredItemsPage && (
                                <th scope="col" className='text-nowrap'>Manage</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.shipment_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`SH - ${value.shipped_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.delivery_challans_id.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.delivery_challans_id.package_id.order_id.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{numeral(value.delivery_challans_id.package_id.order_id.quantity).format('0,0')}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.delivery_challans_id.package_id.order_id.ordered_price_per_item).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.delivery_challans_id.package_id.order_id.total).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.delivery_challans_id.package_id.order_id.order_status === "Shipped" && (
                                            shipmentsPage ? (
                                                <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.delivery_challans_id.package_id.order_id.order_status}</span>
                                            ) : deliveredItemsPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { markAsDelivered(e, value) }}>Mark as Delivered</button>
                                            )
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

export default ShipmentsListTable