import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'

const BillsListTable = ({ billsPage, billsData, billPaymentsPage, markAsBillPaid }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Billed Date</th>
                            <th scope="col" className='text-nowrap'>Billed Id</th>
                            <th scope="col" className='text-nowrap'>Vendor</th>
                            <th scope="col" className='text-nowrap'>Item Group</th>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>Image</th>
                            <th scope="col" className='text-nowrap'>Quantity</th>
                            <th scope="col" className='text-nowrap'>Price Per Item</th>
                            <th scope="col" className='text-nowrap'>Total Price</th>
                            {billsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {billPaymentsPage && (
                                <th scope="col" className='text-nowrap'>Manage Payments</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.bill_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`BL - ${value.bill_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.received_order_id.purchased_id.item_id.preferred_vendor.name}</td>
                                    <td className='text-nowrap align-middle'>{value.received_order_id.purchased_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.received_order_id.purchased_id.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={(axios.defaults.baseURL ? axios.defaults.baseURL : "") + value.received_order_id.purchased_id.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{value.received_order_id.purchased_id.quantity}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.received_order_id.purchased_id.purchased_price_per_item).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>{`₹ ${numeral(value.received_order_id.purchased_id.total).format('0,0')}`}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.received_order_id.purchased_id.purchase_status === "Billed" && (
                                            billsPage ? (
                                                <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.received_order_id.purchased_id.purchase_status}</span>
                                            ) : billPaymentsPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { markAsBillPaid(e, value) }}>Mark as Paid</button>
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

export default BillsListTable