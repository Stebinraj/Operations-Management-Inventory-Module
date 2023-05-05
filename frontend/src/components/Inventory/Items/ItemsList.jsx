import React from 'react'

const ItemsList = ({ handleAdjust, itemsData }) => {

    const table = [
        { headings: 'Item Group' },
        { headings: 'Item Name' },
        { headings: 'Unit' },
        { headings: 'Dimensions' },
        { headings: 'Weight' },
        { headings: 'Manufacturer' },
        { headings: 'Brand' },
        { headings: 'Selling Price' },
        { headings: 'Cost Price' },
        { headings: 'Description' },
        { headings: 'Opening Stock' },
        { headings: 'Reorder Point' },
        { headings: 'Preferred Vendor' },
        { headings: 'Image' },
        { headings: 'Adjustments' }
    ];

    return (
        <>
            <div className="col-sm-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered">
                            <thead className='text-bg-primary'>
                                <tr>
                                    {table.map((value, index) => {
                                        return (
                                            <th scope="col" className='text-nowrap' key={index}>{value.headings}</th>
                                        )
                                    })}
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