import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'

const OrdersListTable = ({ orderItemsData, salesOrderPage, packagesPage, markAsPacked, dashboardPage }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Order Date</th>
                            <th scope="col" className='text-nowrap'>Order Id</th>
                            <th scope="col" className='text-nowrap'>Customer Name</th>
                            <th scope="col" className='text-nowrap'>Email</th>

                            {salesOrderPage || packagesPage ? (
                                <>
                                    <th scope="col" className='text-nowrap'>Phone Number</th>
                                    <th scope="col" className='text-nowrap'>Address</th>
                                    <th scope="col" className='text-nowrap'>Item Group</th>
                                </>
                            ) : null}

                            <th scope="col" className='text-nowrap'>Item Name</th>
                            {salesOrderPage || packagesPage ? (
                                <th scope="col" className='text-nowrap'>Image</th>
                            ) : null}
                            <th scope="col" className='text-nowrap'>Quantity</th>

                            {salesOrderPage || packagesPage ? (
                                <>
                                    <th scope="col" className='text-nowrap'>Price Per Item</th>
                                    <th scope="col" className='text-nowrap'>Total Price</th>
                                </>
                            ) : null}

                            {salesOrderPage || dashboardPage ? (
                                <th scope="col" className='text-nowrap'>Order Status</th>
                            ) : null}

                            {packagesPage && (
                                <th scope="col" className='text-nowrap'>Manage</th>
                            )}

                        </tr>
                    </thead>
                    <tbody>
                        {orderItemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{moment(value.order_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap align-middle'>{`SO - ${value.ordered_id}`}</td>
                                    <td className='text-nowrap align-middle'>{value.customer_id.name}</td>
                                    <td className='text-nowrap align-middle'>{value.customer_id.email}</td>

                                    {salesOrderPage || packagesPage ? (
                                        <>
                                            <td className='text-nowrap align-middle'>{value.customer_id.phone_number}</td>
                                            <td className='text-nowrap align-middle'>{value.customer_id.billing_address}</td>
                                            <td className='text-nowrap align-middle'>{value.item_id.item_group_id.item_group_label}</td>
                                        </>
                                    ) : null}

                                    <td className='text-nowrap align-middle'>{value.item_id.item_name}</td>
                                    {salesOrderPage || packagesPage ? (
                                        <td className='text-nowrap align-middle'>
                                            <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                                <img src={(axios.defaults.baseURL ? axios.defaults.baseURL : "") + value.item_id.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage' />
                                            </div>
                                        </td>
                                    ) : null}
                                    <td className='text-nowrap align-middle'>{value.quantity}</td>

                                    {salesOrderPage || packagesPage ? (
                                        <>
                                            <td className='text-nowrap align-middle'>{`₹ ${numeral(value.ordered_price_per_item).format('0,0')}`}</td>
                                            <td className='text-nowrap align-middle'>{`₹ ${numeral(value.quantity * value.ordered_price_per_item).format('0,0')}`}</td>
                                        </>
                                    ) : null}

                                    <td className='text-nowrap align-middle'>
                                        {value.order_status === "Confirmed" && (
                                            salesOrderPage || dashboardPage ? (
                                                <span className="badge rounded-pill text-bg-primary w-100 p-2">{value.order_status}</span>
                                            ) : packagesPage && (
                                                <button className="btn btn-primary w-100" onClick={(e) => { markAsPacked(e, value) }}>Mark as Packed</button>
                                            )
                                        )}

                                        {value.order_status === "Packed" ? (
                                            <span className="badge rounded-pill text-bg-warning text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Challans Generated" ? (
                                            <span className="badge rounded-pill text-bg-info text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Shipped" ? (
                                            <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Delivered" ? (
                                            <span className="badge rounded-pill text-bg-success text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Invoiced" ? (
                                            <span className="badge rounded-pill text-bg-secondary text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Paid" ? (
                                            <span className="badge rounded-pill text-bg-dark text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Returns Processed" ? (
                                            <span className="badge rounded-pill text-bg-warning text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Returned" ? (
                                            <span className="badge rounded-pill text-bg-danger text-white w-100 p-2">{value.order_status}</span>
                                        ) : value.order_status === "Credited" && (
                                            <span className="badge rounded-pill text-bg-success text-white w-100 p-2">{value.order_status}</span>
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

export default OrdersListTable