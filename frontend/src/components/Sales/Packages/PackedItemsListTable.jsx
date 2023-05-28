import moment from 'moment'
import numeral from 'numeral'
import React from 'react'

const PackedItemsListTable = ({ packedItemsData, generateChallans, packagesPage, deliveryChallansPage }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Packed Date</th>
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
                            <th scope="col" className='text-nowrap'>Total Price</th>
                            {packagesPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {deliveryChallansPage && (
                                <th scope="col" className='text-nowrap'>Generate Challans</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {packedItemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.package_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`PKG - ${value.packed_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.customer_id.name}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.customer_id.email}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.order_id.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{numeral(value.order_id.quantity).format('0,0')}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.order_id.ordered_price_per_item).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.order_id.ordered_price_per_item * value.order_id.quantity).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.order_id.order_status === "Packed" && (
                                            packagesPage ? (
                                                <span className="badge rounded-pill text-bg-warning text-white w-100 p-2">{value.order_id.order_status}</span>
                                            ) : deliveryChallansPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { generateChallans(e, value) }}>Generate</button>
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

export default PackedItemsListTable