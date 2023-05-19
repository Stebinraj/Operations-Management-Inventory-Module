import moment from 'moment'
import React from 'react'

const CreditNotesListTable = ({ creditNotesData, creditNotesPage }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Credited Date</th>
                            <th scope="col" className='text-nowrap'>Credited Id</th>
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
                            {creditNotesPage && (
                                <th scope="col" className='text-nowrap'>Status</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {creditNotesData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.credit_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`CR - ${value.credit_id}`}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.name}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.email}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.phone_number}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id.billing_address}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.quantity}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.ordered_price_per_item}</td>
                                    <td className='text-nowrap'>{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.total}</td>
                                    <td className='text-nowrap'>
                                        {value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Credited" && (
                                            creditNotesPage && (
                                                <span className="badge rounded-pill text-bg-success text-white w-100 p-2">{value.returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.order_status}</span>
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

export default CreditNotesListTable