import moment from 'moment'
import React from 'react'

const PaymentsReceivedListTable = ({ paymentsReceivedPage, paymentsReceivedData, salesReturnsPage, processReturns }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Payment Date</th>
                            <th scope="col" className='text-nowrap'>Payment Id</th>
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
                            {paymentsReceivedPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {salesReturnsPage && (
                                <th scope="col" className='text-nowrap'>Manage</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsReceivedData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.paid_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`PMT - ${value.paid_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                        </div>
                                    </td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.quantity}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap align-middle'>{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.total}</td>
                                    <td className='text-nowrap align-middle'>
                                        {value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Paid" && (
                                            paymentsReceivedPage ? (
                                                <span className="badge rounded-pill text-bg-dark text-white w-100 p-2">{value.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status}</span>
                                            ) : salesReturnsPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { processReturns(e, value) }}>Process Returns</button>
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

export default PaymentsReceivedListTable