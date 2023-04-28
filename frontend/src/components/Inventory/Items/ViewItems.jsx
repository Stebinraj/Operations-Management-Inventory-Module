import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewItems = () => {

    const [itemsData, setItemsData] = useState([]);

    const [item_id, setItemId] = useState('');
    const [item_name, setItemName] = useState('');
    const [mode_of_adjustment, setModeOfAdjustment] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const randomNum = Math.floor(Math.random() * 10000000000);
    const reference_number = String(randomNum).padStart(10, '0');

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/items');
            if (response && response.data.success) {
                setItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAdjust = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setItemName(value.item_name);
        setSellingPrice(value.selling_price);
        setOpeningStock(value.opening_stock);
        setDescription(value.description);
    };

    const submitAdjustment = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/adjust-items/${item_id}`, {
                item_id,
                item_name,
                mode_of_adjustment,
                reference_number,
                date: new Date(),
                reason,
                description,
                quantity,
                value,
                opening_stock: quantity === "" ? (opening_stock) : (quantity),
                selling_price: value === "" ? (selling_price) : (value)
            });
            if (response && response.data.success) {
                setItemId('');
                setItemName('');
                setModeOfAdjustment('');
                setReason('');
                setDescription('');
                setSellingPrice('');
                setOpeningStock('');
                setQuantity('');
                setValue('');
                await getItems();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleClose = async (e) => {
        e.preventDefault();
        setItemId('');
        setItemName('');
        setModeOfAdjustment('');
        setReason('');
        setDescription('');
        setSellingPrice('');
        setOpeningStock('');
        setQuantity('');
        setValue('');
    }

    useEffect(() => {
        getItems();
    }, [])

    return (
        <>
            <div className="modal fade" id="inventoryAdjustModal" tabIndex={-1} aria-labelledby="inventoryAdjustModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Inventory Adjustment</h1>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-12">
                                    <span>Mode of Adjustment</span>
                                    <select className="form-control" value={mode_of_adjustment} onChange={(e) => { setModeOfAdjustment(e.target.value) }}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        <option value={'Quantity'}>Quantity</option>
                                        <option value={'Value'}>Value</option>
                                    </select>
                                </div>
                                {mode_of_adjustment === "Quantity" && (
                                    <>
                                        <div className="mb-3 form-group col-12">
                                            <span>Opening Stock ({opening_stock})</span>
                                            <input type="number" className="form-control" placeholder='Enter Quantity' onChange={(e) => { setQuantity(e.target.value); setValue('') }} value={quantity} />
                                        </div>
                                    </>
                                )}
                                {mode_of_adjustment === "Value" && (
                                    <>
                                        <div className="mb-3 form-group col-12">
                                            <span>Selling Price ({selling_price})</span>
                                            <input type="number" className="form-control" placeholder='Enter Value' onChange={(e) => { setValue(e.target.value); setQuantity("") }} value={value} />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3 form-group col-12">
                                    <span>Reason</span>
                                    <input type="text" className="form-control" placeholder='Enter Reason' onChange={(e) => { setReason(e.target.value) }} value={reason} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Description</span>
                                    <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { submitAdjustment(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-sm-12">
                <div className="card card-primary card-outline">
                    <div className="card-body table-responsive">
                        <table className="table table-bordered">
                            <thead className='text-bg-primary'>
                                <tr>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Dimensions</th>
                                    <th scope="col">Weight</th>
                                    <th scope="col">Manufacturer</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Selling Price</th>
                                    <th scope="col">Cost price</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Opening Stock</th>
                                    <th scope="col">Reorder point</th>
                                    <th scope="col">Preferred Vendor</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Adjustments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.item_name}</td>
                                            <td>{value.unit}</td>
                                            <td>{`${value.dimensions.length} L ${value.dimensions.width} W ${value.dimensions.height} H`}</td>
                                            <td>{value.weight}</td>
                                            <td>{value.manufacturer}</td>
                                            <td>{value.brand}</td>
                                            <td>{value.selling_price}</td>
                                            <td>{value.cost_price}</td>
                                            <td>{value.description}</td>
                                            <td>{value.opening_stock}</td>
                                            <td>{value.reorder_point}</td>
                                            <td>{value.preferred_vendor}</td>
                                            <td>{value.image_of_item}</td>
                                            <td>
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

export default ViewItems