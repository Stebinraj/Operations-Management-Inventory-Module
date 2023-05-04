import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SalesOrders = () => {

    const [itemsData, setItemsData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [cartItemsData, setCartItemsData] = useState([]);

    const [item_id, setItemId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [opening_stock, setOpeningStock] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [customerBillingAddress, setCustomerBillingAddress] = useState();
    const total_price = Number(selling_price) * Number(quantity);

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
        { headings: 'Cart' }
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

    const handleCart = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setOpeningStock(value.opening_stock);
        setSellingPrice(value.selling_price);
    };

    const handleCartClose = async (e) => {
        e.preventDefault();
        setItemId('');
        setOpeningStock('');
        setSellingPrice('');
        setCustomerId('');
        setCustomerEmail('');
        setCustomerPhoneNumber('');
        setCustomerBillingAddress('');
        setQuantity('');
    };

    const getCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customer');
            if (response && response.data.success) {
                setCustomerData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCustomerChange = (e) => {
        const selectedCustomer = customerData.find(customer => customer._id === e.target.value);
        setCustomerId(selectedCustomer._id);
        setCustomerEmail(selectedCustomer.email);
        setCustomerBillingAddress(selectedCustomer.billing_address);
        setCustomerPhoneNumber(selectedCustomer.phone_number);
    };

    const addItemsToCart = async (e) => {
        try {
            e.preventDefault();
            const data = {
                item_id: item_id,
                customer_id: customer_id,
                quantity: quantity
            };

            for (const cart of cartItemsData) {
                if (data.item_id === item_id) {
                    if (data.quantity > opening_stock - cart.quantity) {
                        console.log('greater');
                        console.log(`Choose between 0 to ${opening_stock - cart.quantity} rest of them taken in cart`);
                    } else {
                        console.log('lesser');
                    }
                    // setOpeningStock(a)
                }
            }


            // if (!customer_id || !item_id || !quantity) {
            //     toast.error('All Fields Required !!!', {
            //         position: "top-right",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: false,
            //         newestOnTop: false,
            //         theme: "light",
            //     });
            //     return;
            // }
            // else if (quantity > opening_stock) {
            //     toast.error('Invalid Quantity !!!', {
            //         position: "top-right",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: false,
            //         newestOnTop: false,
            //         theme: "light",
            //     });
            //     setItemId('');
            //     setOpeningStock('');
            //     setSellingPrice('');
            //     setCustomerId('');
            //     setCustomerEmail('');
            //     setCustomerPhoneNumber('');
            //     setCustomerBillingAddress('');
            //     setQuantity('');
            //     return;
            // }

            // const response = await axios.post('http://localhost:5000/cart', {
            //     item_id,
            //     customer_id,
            //     quantity
            // });

            // if (response && response.data.success) {
            //     await getCartItems();
            //     toast.success('Items Added to Cart !!!', {
            //         position: "top-right",
            //         autoClose: 1500,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: false,
            //         newestOnTop: false,
            //         theme: "light",
            //     });
            //     setItemId('');
            //     setOpeningStock('');
            //     setSellingPrice('');
            //     setCustomerId('');
            //     setCustomerEmail('');
            //     setCustomerPhoneNumber('');
            //     setCustomerBillingAddress('');
            //     setQuantity('');
            // }
        } catch (error) {
            console.error(error.message);
        }
    };

    const orderItems = async (e, cartItemsData) => {
        e.preventDefault();
        if (cartItemsData.length === 0) {
            toast.error('Nothing to Order !!!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                newestOnTop: false,
                theme: "light",
            });
            return;
        }

        const itemsToOrder = cartItemsData.map((items) => ({
            order_date: new Date(),
            customer_id: items.customer_id._id,
            item_id: items.item_id._id,
            quantity: items.quantity,
            total: items.quantity * items.item_id.selling_price,
            order_status: 'Confirmed',
            delete_cart_id: items._id
        }));

        const response = await axios.post('http://localhost:5000/salesorders', itemsToOrder);
        if (response && response.data.success) {
            alert('Order placed');
            await getCartItems();
            await getItems();
        }
    }

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cart');
            if (response && response.data.success) {
                setCartItemsData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteCartItems = async (e, value) => {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:5000/cart`, { data: { id: value._id } });
        if (response && response.data.success) {
            await getCartItems();
        }
    }

    useEffect(() => {
        getItems();
        getCustomer();
        getCartItems();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                <Link className="position-relative" data-bs-toggle="modal" data-bs-target="#cartItems">
                    <i className="bi bi-cart me-2" style={{ fontSize: '21px', color: 'blue' }}></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {cartItemsData.length}
                    </span>
                </Link>
            </div>

            <div className="modal fade" id="cartItems" tabIndex={-1} aria-labelledby="cartItemsLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cart Items</h1>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                <div className="card-body table-responsive">
                                    <table className="table table-bordered">
                                        <thead className='text-bg-primary'>
                                            <tr>
                                                <th scope="col" className='text-nowrap'>Email</th>
                                                <th scope="col" className='text-nowrap'>Item Group</th>
                                                <th scope="col" className='text-nowrap'>Item Name</th>
                                                <th scope="col" className='text-nowrap'>Image</th>
                                                <th scope="col" className='text-nowrap'>Quantity</th>
                                                <th scope="col" className='text-nowrap'>Total Price</th>
                                                <th scope="col" className='text-nowrap'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItemsData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='text-nowrap'>{value.customer_id.email}</td>
                                                        <td className='text-nowrap'>{value.item_id.item_group_id.item_group_label}</td>
                                                        <td className='text-nowrap'>{value.item_id.item_name}</td>
                                                        <td className='text-nowrap'>{value.item_id.image_of_item}</td>
                                                        <td className='text-nowrap'>{value.quantity}</td>
                                                        <td className='text-nowrap'>{value.quantity * value.item_id.selling_price}</td>
                                                        <td className='text-nowrap'>
                                                            <button className='btn btn-primary' onClick={(e) => { deleteCartItems(e, value) }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCartClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { orderItems(e, cartItemsData) }}>Order</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addToCart" tabIndex={-1} aria-labelledby="addToCartLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog" style={{ minWidth: '50%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add to Cart</h1>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-md-6">
                                    <span className="card-text">Select Customer</span>
                                    <select className="form-control" value={customer_id} onChange={handleCustomerChange}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        {customerData.map((value, index) => {
                                            return (
                                                <option key={index} value={value._id}>{value.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Email</span>
                                    <input className='form-control' disabled={true} defaultValue={customerEmail} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Phone Number</span>
                                    <input className='form-control' disabled={true} defaultValue={customerPhoneNumber} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Billing Address</span>
                                    <textarea className='form-control' disabled defaultValue={customerBillingAddress}></textarea>
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Quantity</span>
                                    <input className='form-control' type='number' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                                </div>
                                <div className="mb-3 form-group col-md-6">
                                    <span>Total Price</span>
                                    <input className='form-control' disabled={true} value={total_price} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCartClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItemsToCart}>Submit</button>
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
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addToCart" onClick={(e) => { handleCart(e, value) }}>Add to Cart</button>
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

export default SalesOrders