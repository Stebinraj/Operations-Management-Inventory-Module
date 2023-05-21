import moment from 'moment'
import React from 'react'

const BillsListTable = ({ billsPage, billsData }) => {
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
                            <th scope="col" className='text-nowrap'>Total</th>
                            {billsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.bill_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`BL - ${value.bill_id}`}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.item_id.preferred_vendor.name}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.quantity}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.purchased_price_per_item}</td>
                                    <td className='text-nowrap'>{value.received_order_id.purchased_id.total}</td>
                                    <td className='text-nowrap'>
                                        {value.received_order_id.purchased_id.purchase_status === "Billed" && (
                                            billsPage && (
                                                <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.received_order_id.purchased_id.purchase_status}</span>
                                            )
                                            //     : billsPage && (
                                            //     <button className='btn btn-primary w-100' onClick={(e) => { generateBill(e, value) }}>Generate Bill</button>
                                            // )
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