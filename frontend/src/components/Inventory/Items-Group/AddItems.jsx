import React from 'react'

const AddItems = ({ itemGroupData, item_group_id, setItemGroupId, addItems, setImageOfItem, setPreferredVendor, setReorderPoint, setOpeningStock, setDescription, setDimensions, setBrand, setCostPrice, setSellingPrice, setManufacturer, setItemName, setUnit, setWeight, dimensions, item_name, unit, weight, manufacturer, brand, selling_price, cost_price, description, opening_stock, reorder_point, preferred_vendor, vendorsData }) => {
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
                            <select className={item_group_id.class ? (`form-control ${item_group_id.class}`) : ('form-control')} onChange={(e) => { setItemGroupId({ ...item_group_id, item_group_id: e.target.value }) }} value={item_group_id.item_group_id}>
                                <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                {itemGroupData.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.item_group_label}</option>
                                    )
                                })}
                            </select>
                            {item_group_id.feedback && (
                                <>
                                    <small className="valid-feedback">{item_group_id.feedback}</small>
                                    <small className="invalid-feedback">{item_group_id.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Item Name</span>
                            <input type="text" className={item_name.class ? (`form-control ${item_name.class}`) : ('form-control')} placeholder='Enter Item Name' onChange={(e) => { setItemName({ ...item_name, item_name: e.target.value }) }} value={item_name.item_name} />
                            {item_name.feedback && (
                                <>
                                    <small className="valid-feedback">{item_name.feedback}</small>
                                    <small className="invalid-feedback">{item_name.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Unit</span>
                            <input type="text" className={unit.class ? (`form-control ${unit.class}`) : ('form-control')} placeholder='Enter Unit' onChange={(e) => { setUnit({ ...unit, unit: e.target.value }) }} value={unit.unit} />
                            {unit.feedback && (
                                <>
                                    <small className="valid-feedback">{unit.feedback}</small>
                                    <small className="invalid-feedback">{unit.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Weight</span>
                            <input type="text" className={weight.class ? (`form-control ${weight.class}`) : ('form-control')} placeholder='Enter Weight' onChange={(e) => { setWeight({ ...weight, weight: e.target.value }) }} value={weight.weight} />
                            {weight.feedback && (
                                <>
                                    <small className="valid-feedback">{weight.feedback}</small>
                                    <small className="invalid-feedback">{weight.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="form-group mb-3 col-12">
                            <span className="card-text">Dimensions</span>
                            <div className='d-flex'>
                                <input className="form-control text-right " type="number" placeholder='Length' onChange={(e) => { setDimensions({ ...dimensions, length: e.target.value }) }} value={dimensions.length || ""} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Width' onChange={(e) => { setDimensions({ ...dimensions, width: e.target.value }) }} value={dimensions.width || ""} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Height' onChange={(e) => { setDimensions({ ...dimensions, height: e.target.value }) }} value={dimensions.height || ""} />
                            </div>
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Manufacturer</span>
                            <input type="text" className={manufacturer.class ? (`form-control ${manufacturer.class}`) : ('form-control')} placeholder='Enter Manufacturer' onChange={(e) => { setManufacturer({ ...manufacturer, manufacturer: e.target.value }) }} value={manufacturer.manufacturer} />
                            {manufacturer.feedback && (
                                <>
                                    <small className="valid-feedback">{manufacturer.feedback}</small>
                                    <small className="invalid-feedback">{manufacturer.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Brand</span>
                            <input type="text" className={brand.class ? (`form-control ${brand.class}`) : ('form-control')} placeholder='Enter Brand' onChange={(e) => { setBrand({ ...brand, brand: e.target.value }) }} value={brand.brand} />
                            {brand.feedback && (
                                <>
                                    <small className="valid-feedback">{brand.feedback}</small>
                                    <small className="invalid-feedback">{brand.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Selling Price</span>
                            <input type="text" className={selling_price.class ? (`form-control ${selling_price.class}`) : ('form-control')} placeholder='Enter Selling Price' onChange={(e) => { setSellingPrice({ ...selling_price, selling_price: e.target.value }) }} value={selling_price.selling_price} />
                            {selling_price.feedback && (
                                <>
                                    <small className="valid-feedback">{selling_price.feedback}</small>
                                    <small className="invalid-feedback">{selling_price.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Cost Price</span>
                            <input type="text" className={cost_price.class ? (`form-control ${cost_price.class}`) : ('form-control')} placeholder='Enter Cost Price' onChange={(e) => { setCostPrice({ ...cost_price, cost_price: e.target.value }) }} value={cost_price.cost_price} />
                            {cost_price.feedback && (
                                <>
                                    <small className="valid-feedback">{cost_price.feedback}</small>
                                    <small className="invalid-feedback">{cost_price.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Description</span>
                            <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Opening Stock</span>
                            <input type="text" className={opening_stock.class ? (`form-control ${opening_stock.class}`) : ('form-control')} placeholder='Enter Opening Stock' onChange={(e) => { setOpeningStock({ ...opening_stock, opening_stock: e.target.value }) }} value={opening_stock.opening_stock} />
                            {opening_stock.feedback && (
                                <>
                                    <small className="valid-feedback">{opening_stock.feedback}</small>
                                    <small className="invalid-feedback">{opening_stock.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Reorder Point</span>
                            <input type="text" className={reorder_point.class ? (`form-control ${reorder_point.class}`) : ('form-control')} placeholder='Enter Reorder Point' onChange={(e) => { setReorderPoint({ ...reorder_point, reorder_point: e.target.value }) }} value={reorder_point.reorder_point} />
                            {reorder_point.feedback && (
                                <>
                                    <small className="valid-feedback">{reorder_point.feedback}</small>
                                    <small className="invalid-feedback">{reorder_point.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Preferred Vendor</span>
                            <select className={preferred_vendor.class ? (`form-control ${preferred_vendor.class}`) : ('form-control')} onChange={(e) => { setPreferredVendor({ ...preferred_vendor, preferred_vendor: e.target.value }) }} value={preferred_vendor.preferred_vendor}>
                                <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                {vendorsData.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            {preferred_vendor.feedback && (
                                <>
                                    <small className="valid-feedback">{preferred_vendor.feedback}</small>
                                    <small className="invalid-feedback">{preferred_vendor.feedback}</small>
                                </>
                            )}
                        </div>
                        <div className="mb-3 form-group col-12">
                            <span className="card-text">Image of Item</span>
                            <input type="file" name='photo' className="form-control" onChange={(e) => { setImageOfItem(e.target.files[0]) }} />
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