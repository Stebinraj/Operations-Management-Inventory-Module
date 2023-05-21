import React from 'react'

const AddItems = ({ itemGroupData, item_group_id, setItemGroupId, addItems, setImageOfItem, setPreferredVendor, setReorderPoint, setOpeningStock, setDescription, setDimensions, setBrand, setCostPrice, setSellingPrice, setManufacturer, setItemName, setUnit, setWeight, dimensions, item_name, unit, weight, manufacturer, brand, selling_price, cost_price, description, opening_stock, reorder_point, preferred_vendor, image_of_item, vendorsData }) => {
    return (
        <>
            {/* add new items to inventory */}
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5 className="m-0">Create Item</h5>
                </div>
                <div className="card-body">
                    <form className='row'>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Name of Item Group</span>
                            <select className="form-control" value={item_group_id} onChange={(e) => { setItemGroupId(e.target.value) }}>
                                <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                {itemGroupData.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.item_group_label}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Item Name</span>
                            <input type="text" className="form-control" placeholder='Enter Item Name' onChange={(e) => { setItemName(e.target.value) }} value={item_name} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Unit</span>
                            <input type="text" className="form-control" placeholder='Enter Unit' onChange={(e) => { setUnit(e.target.value) }} value={unit} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Weight</span>
                            <input type="number" className="form-control" placeholder='Enter Weight' onChange={(e) => { setWeight(e.target.value) }} value={weight} />
                        </div>
                        <div className="form-group mb-3 col-12">
                            <span className="card-text">Dimensions</span>
                            <div className='d-flex'>
                                <input className="form-control text-right " type="number" placeholder='Length' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }} value={dimensions.length || ''} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Width' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }} value={dimensions.width || ''} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Height' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }} value={dimensions.height || ''} />
                            </div>
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Manufacturer</span>
                            <input type="text" className="form-control" placeholder='Enter Manufacturer' onChange={(e) => { setManufacturer(e.target.value) }} value={manufacturer} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Brand</span>
                            <input type="text" className="form-control" placeholder='Enter Brand' onChange={(e) => { setBrand(e.target.value) }} value={brand} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Selling Price</span>
                            <input type="number" className="form-control" placeholder='Enter Selling Price' onChange={(e) => { setSellingPrice(e.target.value) }} value={selling_price} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Cost Price</span>
                            <input type="number" className="form-control" placeholder='Enter Cost Price' onChange={(e) => { setCostPrice(e.target.value) }} value={cost_price} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Description</span>
                            <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Opening Stock</span>
                            <input type="number" className="form-control" placeholder='Enter Opening Stock' onChange={(e) => { setOpeningStock(e.target.value) }} value={opening_stock} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Reorder Point</span>
                            <input type="number" className="form-control" placeholder='Enter Reorder Point' onChange={(e) => { setReorderPoint(e.target.value) }} value={reorder_point} />
                        </div>
                        {/* <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Preferred Vendor</span>
                            <input type="text" className="form-control" placeholder='Enter Preferred Vendor' onChange={(e) => { setPreferredVendor(e.target.value) }} value={preferred_vendor} />
                        </div> */}
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Preferred Vendor</span>
                            <select className="form-control" onChange={(e) => { setPreferredVendor(e.target.value) }} value={preferred_vendor}>
                                <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                {vendorsData.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3 form-group col-12">
                            <span className="card-text">Image of Item</span>
                            <input type="file" className="form-control" onChange={(e) => { setImageOfItem(e.target.value) }} value={image_of_item} />
                        </div>
                        <button className="btn btn-primary w-100" onClick={(e) => { addItems(e) }}>Submit</button>
                    </form>
                </div>
            </div>
            {/* add new items to inventory */}
        </>
    )
}

export default AddItems