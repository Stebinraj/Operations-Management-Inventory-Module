import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ItemsList from '../../Inventory/Items/ItemsList';
import CartIconLabelLink from './CartIconLabelLink';
import ViewCartItemsModal from './ViewCartItemsModal';
import AddToCartFormModal from './AddToCartFormModal';
import OrdersLink from './OrdersLink';

const SalesOrders = ({ salesOrderPage }) => {

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
    const randomNum = Math.floor(Math.random() * 10000000000);
    const order_id = String(randomNum).padStart(10, '0');

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
            if (!customer_id || !item_id || !quantity) {
                toast.error('All Fields Required !!!');
                return;
            }
            else if (quantity > opening_stock) {
                toast.error('Invalid Quantity !!!');
                setItemId('');
                setOpeningStock('');
                setSellingPrice('');
                setCustomerId('');
                setCustomerEmail('');
                setCustomerPhoneNumber('');
                setCustomerBillingAddress('');
                setQuantity('');
                return;
            }

            const response = await axios.post('http://localhost:5000/cart', {
                item_id,
                customer_id,
                quantity
            });

            if (response && response.data.success) {
                await getCartItems();
                await getItems();
                toast.success('Items Added to Cart !!!');
                setItemId('');
                setOpeningStock('');
                setSellingPrice('');
                setCustomerId('');
                setCustomerEmail('');
                setCustomerPhoneNumber('');
                setCustomerBillingAddress('');
                setQuantity('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const orderItems = async (e, cartItemsData) => {
        e.preventDefault();
        if (cartItemsData.length === 0) {
            toast.error('Nothing to Order !!!');
            return;
        }

        const itemsToOrder = cartItemsData.map((items) => ({
            order_id,
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
            toast.success('Order Placed !!!')
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
            toast.success('Deleted Successfully !!!')
            await getCartItems();
            await getItems();
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
                <OrdersLink />

                <CartIconLabelLink
                    cartItemsData={cartItemsData}
                />
            </div>

            <ItemsList
                itemsData={itemsData}
                salesOrderPage={salesOrderPage}
                handleCart={handleCart}
            />

            <ViewCartItemsModal
                cartItemsData={cartItemsData}
                deleteCartItems={deleteCartItems}
                handleCartClose={handleCartClose}
                orderItems={orderItems}
            />

            <AddToCartFormModal
                customer_id={customer_id}
                handleCustomerChange={handleCustomerChange}
                customerData={customerData}
                customerEmail={customerEmail}
                customerPhoneNumber={customerPhoneNumber}
                customerBillingAddress={customerBillingAddress}
                setQuantity={setQuantity}
                quantity={quantity}
                total_price={total_price}
                handleCartClose={handleCartClose}
                addItemsToCart={addItemsToCart}
            />
        </>
    )
}

export default SalesOrders