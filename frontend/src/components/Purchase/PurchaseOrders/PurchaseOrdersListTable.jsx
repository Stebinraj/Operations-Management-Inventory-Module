import moment from 'moment'
import numeral from 'numeral'
import React from 'react'

const PurchaseOrdersListTable = ({ purchaseOrdersData, purchaseOrdersPage, receivedOrdersPage, markAsReceived }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Purchase Date</th>
                            <th scope="col" className='text-nowrap'>Purchase Id</th>
                            <th scope="col" className='text-nowrap'>Vendor</th>
                            <th scope="col" className='text-nowrap'>Item Group</th>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>Image</th>
                            <th scope="col" className='text-nowrap'>Quantity</th>
                            <th scope="col" className='text-nowrap'>Price Per Item</th>
                            <th scope="col" className='text-nowrap'>Total Price</th>
                            {purchaseOrdersPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {receivedOrdersPage && (
                                <th scope="col" className='text-nowrap'>Manage Received</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrdersData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.purchase_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`PI - ${value.purchase_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.item_id.preferred_vendor.name}</td>
                                    <td className='text-nowrap align-middle'>{value.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{value.quantity}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.purchased_price_per_item).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.total).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.purchase_status === "Confirmed" && (
                                            purchaseOrdersPage ? (
                                                <span className="badge rounded-pill text-bg-primary text-white w-100 p-2">{value.purchase_status}</span>
                                            ) : receivedOrdersPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { markAsReceived(e, value) }}>Mark as Received</button>
                                            )
                                        )}
                                        {value.purchase_status === "Received" ? (
                                            <span className="badge rounded-pill text-bg-warning w-100 text-white p-2">{value.purchase_status}</span>
                                        ) : value.purchase_status === "Billed" ? (
                                            <span className="badge rounded-pill text-bg-danger w-100 text-white p-2">{value.purchase_status}</span>
                                        ) : value.purchase_status === "Paid" ? (
                                            <span className="badge rounded-pill text-bg-info w-100 text-white p-2">{value.purchase_status}</span>
                                        ) : value.purchase_status === "Credited" && (
                                            <span className="badge rounded-pill text-bg-success w-100 text-white p-2">{value.purchase_status}</span>
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

export default PurchaseOrdersListTable