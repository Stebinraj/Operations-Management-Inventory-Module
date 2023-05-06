import React from 'react'

const ItemsList = ({ handleAdjust, itemsData }) => {

    return (
        <>
            <div className="col-sm-12">
                <div className="card card-primary card-outline">
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
                                    <th scope="col" className='text-nowrap'>Cost Price</th>
                                    <th scope="col" className='text-nowrap'>Description</th>
                                    <th scope="col" className='text-nowrap'>Opening Stock</th>
                                    <th scope="col" className='text-nowrap'>Reorder Point</th>
                                    <th scope="col" className='text-nowrap'>Preferred Vendor</th>
                                    <th scope="col" className='text-nowrap'>Image</th>
                                    <th scope="col" className='text-nowrap'>Adjustments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-nowrap'>{value.item_group_id.item_group_label}</td>
                                            <td className='text-nowrap'>{value.item_name}</td>
                                            <td className='text-nowrap'>{value.unit}</td>
                                            <td className='text-nowrap'>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</td>
                                            <td className='text-nowrap'>{value.weight}</td>
                                            <td className='text-nowrap'>{value.manufacturer}</td>
                                            <td className='text-nowrap'>{value.brand}</td>
                                            <td className='text-nowrap'>{value.selling_price}</td>
                                            <td className='text-nowrap'>{value.cost_price}</td>
                                            <td className='text-nowrap'>{value.description}</td>
                                            <td className='text-nowrap'>{value.opening_stock}</td>
                                            <td className='text-nowrap'>{value.reorder_point}</td>
                                            <td className='text-nowrap'>{value.preferred_vendor}</td>
                                            <td className='text-nowrap'>{value.image_of_item}</td>
                                            <td className='text-nowrap'>
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#inventoryAdjustModal" onClick={(e) => { handleAdjust(e, value) }}>Adjust</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemsList