import React from 'react'

const ItemsListTable = ({ handleAdjust, itemsData, itemsPage, salesOrderPage, handleCart, purchaseOrdersPage, handlePurchaseCart }) => {
    return (
        <>
            <div className="card-body table-responsive">
                <table className="table table-bordered">
                    <thead className='text-bg-primary'>
                        <tr>
                            <th scope="col" className='text-nowrap'>Item Group</th>
                            <th scope="col" className='text-nowrap'>Item Name</th>
                            <th scope="col" className='text-nowrap'>Unit</th>
                            <th scope="col" className='text-nowrap'>Dimensions</th>
                            <th scope="col" className='text-nowrap'>Weight</th>
                            <th scope="col" className='text-nowrap'>Manufacturer</th>
                            <th scope="col" className='text-nowrap'>Brand</th>
                            <th scope="col" className='text-nowrap'>Selling Price</th>
                            {itemsPage && (
                                <th scope="col" className='text-nowrap'>Cost Price</th>
                            )}
                            <th scope="col" className='text-nowrap'>Description</th>
                            <th scope="col" className='text-nowrap'>Opening Stock</th>
                            {itemsPage && (
                                <th scope="col" className='text-nowrap'>Reorder Point</th>
                            )}
                            <th scope="col" className='text-nowrap'>Preferred Vendor</th>
                            <th scope="col" className='text-nowrap'>Image</th>
                            {itemsPage && (
                                <th scope="col" className='text-nowrap'>Adjustments</th>
                            )}
                            {salesOrderPage && (
                                <th scope="col" className='text-nowrap'>Cart</th>
                            )}
                            {purchaseOrdersPage && (
                                <th scope="col" className='text-nowrap'>Manage</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-nowrap align-middle'>{value.item_group_id.item_group_label}</td>
                                    <td className='text-nowrap align-middle'>{value.item_name}</td>
                                    <td className='text-nowrap align-middle'>{value.unit}</td>
                                    <td className='text-nowrap align-middle'>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</td>
                                    <td className='text-nowrap align-middle'>{value.weight}</td>
                                    <td className='text-nowrap align-middle'>{value.manufacturer}</td>
                                    <td className='text-nowrap align-middle'>{value.brand}</td>
                                    <td className='text-nowrap align-middle'>{value.selling_price}</td>
                                    {itemsPage && (
                                        <td className='text-nowrap align-middle'>{value.cost_price}</td>
                                    )}
                                    <td className='text-nowrap align-middle'>{value.description}</td>
                                    <td className='text-nowrap align-middle'>{value.opening_stock}</td>
                                    {itemsPage && (
                                        <td className='text-nowrap align-middle'>{value.reorder_point}</td>
                                    )}
                                    <td className='text-nowrap align-middle'>{value.preferred_vendor.name}</td>
                                    <td className='text-nowrap align-middle'>
                                        <div className="card" style={{ width: '100px', height: '100px', backgroundSize: 'cover' }}>
                                            <img src={value.image_of_item} style={{ width: '100%', height: '100%' }} alt='itemImage'/>
                                        </div>
                                    </td>

                                    <td className='text-nowrap align-middle'>
                                        {itemsPage && (
                                            <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#inventoryAdjustModal" onClick={(e) => { handleAdjust(e, value) }}>Adjust</button>
                                        )}
                                        {salesOrderPage && (
                                            <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addToCart" onClick={(e) => { handleCart(e, value) }}>Add to Cart</button>
                                        )}
                                        {purchaseOrdersPage && (
                                            <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#addToPurchaseCart" onClick={(e) => { handlePurchaseCart(e, value) }}>Add to Cart</button>
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

export default ItemsListTable