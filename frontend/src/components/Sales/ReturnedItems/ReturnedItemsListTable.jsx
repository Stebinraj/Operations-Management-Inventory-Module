import moment from 'moment'
import React from 'react'

const ReturnedItemsListTable = ({ returnedItemsData, returnedItemsPage, creditNotesPage, issueCredits }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Returned Date</th>
                            <th scope="col" className='text-nowrap'>Returned Id</th>
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
                            {returnedItemsPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                            {creditNotesPage && (
                                <th scope="col" className='text-nowrap'>Manage</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {returnedItemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.returned_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`RI - ${value.returned_id}`}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.quantity}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.total}</td>
                                    <td className='text-nowrap'>
                                        {value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Returned" && (
                                            returnedItemsPage ? (
                                                <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status}</span>
                                            ) : creditNotesPage && (
                                                <button className='btn btn-primary w-100' onClick={(e) => { issueCredits(e, value) }}>Issue Credits</button>
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

export default ReturnedItemsListTable