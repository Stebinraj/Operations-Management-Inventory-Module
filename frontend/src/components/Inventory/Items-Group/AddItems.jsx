import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddItems = (props) => {

    const [item_group_id, setItemGroupId] = useState('');
    const [itemGroupData, setItemGroupData] = useState([]);
    const [item_name, setItemName] = useState('');
    const [unit, setUnit] = useState('');
    const [dimensions, setDimensions] = useState({
        length: '',
        width: '',
        height: ''
    });
    const [weight, setWeight] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [brand, setBrand] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [description, setDescription] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [reorder_point, setReorderPoint] = useState('');
    const [preferred_vendor, setPreferredVendor] = useState('');
    const [image_of_item, setImageOfItem] = useState('');
    const navigate = useNavigate();

    const addItems = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/items', {
                item_group_id,
                item_name,
                unit,
                dimensions,
                weight,
                manufacturer,
                brand,
                selling_price,
                cost_price,
                description,
                opening_stock,
                reorder_point,
                preferred_vendor,
                image_of_item
            });
            if (response && response.data.success) {
                toast.success('Items Created Successfully !!!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    newestOnTop: false,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/view/items');
                }, 2500);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const getItemsGroup = async () => {
            const response = await axios.get('http://localhost:5000/items-group');
            if (response && response.data.success) {
                setItemGroupData(response.data.success);
            }
        }
        getItemsGroup();
    }, [props.reload]);

    return (
        <>
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
                            <input type="text" className="form-control" placeholder='Enter Item Name' onChange={(e) => { setItemName(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Unit</span>
                            <input type="text" className="form-control" placeholder='Enter Unit' onChange={(e) => { setUnit(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Weight</span>
                            <input type="number" className="form-control" placeholder='Enter Weight' onChange={(e) => { setWeight(e.target.value) }} />
                        </div>
                        <div className="form-group mb-3 col-12">
                            <span className="card-text">Dimensions</span>
                            <div className='d-flex'>
                                <input className="form-control text-right " type="number" placeholder='Length' onChange={(e) => { setDimensions({ length: e.target.value, width: dimensions.width, height: dimensions.height }) }} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Width' onChange={(e) => { setDimensions({ length: dimensions.length, width: e.target.value, height: dimensions.height }) }} />
                                <span className='m-auto text-secondary'>x</span>
                                <input className="form-control text-right" type="number" placeholder='Height' onChange={(e) => { setDimensions({ length: dimensions.length, width: dimensions.width, height: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Manufacturer</span>
                            <input type="text" className="form-control" placeholder='Enter Manufacturer' onChange={(e) => { setManufacturer(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Brand</span>
                            <input type="text" className="form-control" placeholder='Enter Brand' onChange={(e) => { setBrand(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Selling Price</span>
                            <input type="number" className="form-control" placeholder='Enter Selling Price' onChange={(e) => { setSellingPrice(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Cost Price</span>
                            <input type="number" className="form-control" placeholder='Enter Cost Price' onChange={(e) => { setCostPrice(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Description</span>
                            <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Opening Stock</span>
                            <input type="number" className="form-control" placeholder='Enter Opening Stock' onChange={(e) => { setOpeningStock(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Reorder Point</span>
                            <input type="number" className="form-control" placeholder='Enter Reorder Point' onChange={(e) => { setReorderPoint(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-md-6">
                            <span className="card-text">Preferred Vendor</span>
                            <input type="text" className="form-control" placeholder='Enter Preferred Vendor' onChange={(e) => { setPreferredVendor(e.target.value) }} />
                        </div>
                        <div className="mb-3 form-group col-12">
                            <span className="card-text">Image of Item</span>
                            <input type="file" className="form-control" onChange={(e) => { setImageOfItem(e.target.value) }} />
                        </div>
                        <button className="btn btn-primary w-100" onClick={(e) => { addItems(e) }}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddItems