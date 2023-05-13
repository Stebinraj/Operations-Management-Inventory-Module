import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ItemsList from '../../Inventory/Items/ItemsList';
import CartIconLabelLink from './CartIconLabelLink';
import ViewCartItemsModal from './ViewCartItemsModal';
import AddToCartFormModal from './AddToCartFormModal';
import OrdersIconLabelLink from './OrdersIconLabelLink';
import ViewOrdersModal from './ViewOrdersModal';
import ItemsListTable from '../../Inventory/Items/ItemsListTable';
import CartListTable from './CartListTable';
import OrdersListTable from './OrdersListTable';

const SalesOrders = ({ salesOrderPage }) => {

    // items data state variable
    const [itemsData, setItemsData] = useState([]);
    // customer data state variable
    const [customerData, setCustomerData] = useState([]);
    // cart items data state variable
    const [cartItemsData, setCartItemsData] = useState([]);
    // order items data state variable
    const [orderItemsData, setOrderItemsData] = useState([]);

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
    const ordered_id = String(randomNum).padStart(10, '0');

    // fetch items and set to setItemsData
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

    // before adding cart store the id, selling price, opening_stock to a state variable
    const handleCart = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setOpeningStock(value.opening_stock);
        setSellingPrice(value.selling_price);
    };

    // closing the cart form to reset the state to emptyy
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

    // fetch customer and set to setCustomerData
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

    // choosing customer then find the id, email, billing address, phone number to a state variable
    const handleCustomerChange = (e) => {
        const selectedCustomer = customerData.find(customer => customer._id === e.target.value);
        setCustomerId(selectedCustomer._id);
        setCustomerEmail(selectedCustomer.email);
        setCustomerBillingAddress(selectedCustomer.billing_address);
        setCustomerPhoneNumber(selectedCustomer.phone_number);
    };

    // add items to cart
    const addItemsToCart = async (e) => {
        try {
            e.preventDefault();
            // checking if customer_id, item_id, quantity exists
            if (!customer_id || !item_id || !quantity) {
                toast.error('All Fields Required !!!');
                return;
            }
            // checking quantity is greater than opening stock if true reset the state variable to empty and error appears
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
            // send cart items datas
            const response = await axios.post('http://localhost:5000/cart', {
                item_id,
                customer_id,
                quantity
            });

            // cart items send and save successfully then cart items and items data's fetched
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

    // order the cart items
    const orderItems = async (e, cartItemsData) => {
        e.preventDefault();
        // checking is there any items in cart if nothing there errors appears
        if (cartItemsData.length === 0) {
            toast.error('Nothing to Order !!!');
            return;
        }

        // map the array of cart items data
        const itemsToOrder = cartItemsData.map((items) => ({
            ordered_id,
            order_date: new Date(),
            customer_id: items.customer_id._id,
            item_id: items.item_id._id,
            quantity: items.quantity,
            total: items.quantity * items.item_id.selling_price,
            order_status: 'Confirmed',
            delete_cart_id: items._id,
            ordered_price_per_item: items.item_id.selling_price
        }));

        // send order details
        const response = await axios.post('http://localhost:5000/salesorders', itemsToOrder);
        if (response && response.data.success) {
            toast.success('Order Placed !!!')
            await getCartItems();
            await getItems();
            await getOrderItems();
        }
    }

    // fetch cart items data and set to setCartItemsData
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

    // delete cart items and fetch cartitems and items data
    const deleteCartItems = async (e, value) => {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:5000/cart`, { data: { id: value._id } });
        if (response && response.data.success) {
            toast.success('Deleted Successfully !!!')
            await getCartItems();
            await getItems();
        }
    }

    // fetch order items and set to orderItemsData
    const getOrderItems = async () => {
        const response = await axios.get(`http://localhost:5000/salesorders`);
        if (response && response.data.success) {
            setOrderItemsData(response.data.success)
        }
    }

    // handle sideeffects while fetching items data, customer data and carts items data
    useEffect(() => {
        getItems();
        getCustomer();
        getCartItems();
        getOrderItems();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* ordersicon with label link component */}
                <OrdersIconLabelLink
                    orderItemsData={orderItemsData}
                />

                {/* cart icons with label link component */}
                <CartIconLabelLink
                    cartItemsData={cartItemsData}
                />
            </div>

            {/* items list components */}
            <ItemsList
                itemsListTable={
                    <ItemsListTable
                        itemsData={itemsData}
                        salesOrderPage={salesOrderPage}
                        handleCart={handleCart}
                    />
                }
            />

            {/* view cart items modal components */}
            <ViewCartItemsModal
                handleCartClose={handleCartClose}
                orderItems={orderItems}
                cartListTable={
                    <CartListTable
                        deleteCartItems={deleteCartItems}
                        cartItemsData={cartItemsData}
                    />
                }
            />

            {/* view order modal components */}
            <ViewOrdersModal
                ordersListTable={
                    <OrdersListTable
                        orderItemsData={orderItemsData}
                    />
                }
            />

            {/* add to cart form modal component */}
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