import moment from 'moment'
import React from 'react'

const PurchaseOrdersListTable = ({ purchaseOrdersData }) => {
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
                            <th scope="col" className='text-nowrap'>Total</th>
                            <th scope="col" className='text-nowrap'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrdersData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap'>{moment(value.purchase_date).format('DD-MM-YYYY')}</td>
                                    <td className='text-nowrap'>{`PI - ${value.purchase_id}`}</td>
                                    <td className='text-nowrap'>{value.item_id.preferred_vendor.name}</td>
                                    <td className='text-nowrap'>{value.item_id.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap'>{value.item_id.item_name}</td>
                                    <td className='text-nowrap'>{value.item_id.image_of_item}</td>
                                    <td className='text-nowrap'>{value.quantity}</td>
                                    <td className='text-nowrap'>{value.purchased_price_per_item}</td>
                                    <td className='text-nowrap'>{value.total}</td>
                                    <td className='text-nowrap'>
                                        {value.purchase_status === "Confirmed" && (
                                            <span className="badge rounded-pill text-bg-primary w-100 p-2">{value.purchase_status}</span>
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