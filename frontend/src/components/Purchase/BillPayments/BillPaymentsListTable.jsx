import moment from 'moment'
import React from 'react'

const BillPaymentsListTable = ({ billsPaymentsData, billPaymentsPage, vendorCreditPage, issueVendorCredits }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Paid Date</th>
                            <th scope="col" className='text-nowrap'>Paid Id</th>
                            <th scope="col" className='text-nowrap'>Vendor</th>
                            <th scope="col" className='text-nowrap'>Item Group</th>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>Image</th>
                            <th scope="col" className='text-nowrap'>Quantity</th>
                            <th scope="col" className='text-nowrap'>Price Per Item</th>
                            <th scope="col" className='text-nowrap'>Total</th>
                            {billPaymentsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {vendorCreditPage && (
                                <th scope="col" className='text-nowrap'>Manage Credits</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {billsPaymentsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.paid_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`PI - ${value.paid_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.item_id.preferred_vendor.name}</td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.billed_id.received_order_id.purchased_id.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.quantity}</td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.purchased_price_per_item}</td>
                                    <td className='text-nowrap align-middle'>{value.billed_id.received_order_id.purchased_id.total}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.billed_id.received_order_id.purchased_id.purchase_status === "Paid" && (
                                            billPaymentsPage ? (
                                                <span className="badge rounded-pill text-bg-info text-white w-100 p-2">{value.billed_id.received_order_id.purchased_id.purchase_status}</span>
                                            ) : vendorCreditPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { issueVendorCredits(e, value) }}>Issue Credits</button>
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

export default BillPaymentsListTable