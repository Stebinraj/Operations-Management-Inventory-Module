import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ViewItems = () => {

    const [itemsData, setItemsData] = useState([]);

    const [item_id, setItemId] = useState('');
    const [mode_of_adjustment, setModeOfAdjustment] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const randomNum = Math.floor(Math.random() * 10000000000);
    const reference_number = String(randomNum).padStart(10, '0');

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
        setSellingPrice(value.selling_price);
        setOpeningStock(value.opening_stock);
        setDescription(value.description);
    };

    const handleModeOfAdjustmentChange = (e) => {
        const selectedMode = e.target.value;
        setModeOfAdjustment(selectedMode);
        if (selectedMode === 'Quantity') {
            setQuantity('');
            setReason('');
        } else if (selectedMode === "Value") {
            setValue('');
            setReason('');
        }
    };

    const submitAdjustment = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`http://localhost:5000/adjust-items/${item_id}`, {
                item_id,
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
                toast.success('Items Adjusted Successfully !!!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    newestOnTop: false,
                    theme: "light",
                });
                setItemId('');
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

    const handleAdjustClose = async (e) => {
        e.preventDefault();
        setItemId('');
        setModeOfAdjustment('');
        setReason('');
        setDescription('');
        setSellingPrice('');
        setOpeningStock('');
        setQuantity('');
        setValue('');
    };

    useEffect(() => {
        getItems();
    }, []);

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
                                    <select className="form-control" value={mode_of_adjustment} onChange={handleModeOfAdjustmentChange}>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleAdjustClose}>Close</button>
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

export default ViewItems