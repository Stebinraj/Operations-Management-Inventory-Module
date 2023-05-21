import React, { useEffect, useState } from 'react'
import ItemsList from '../../Inventory/Items/ItemsList';
import ItemsListTable from '../../Inventory/Items/ItemsListTable';
import axios from 'axios';
import PurchaseOrdersFormModal from './PurchaseOrdersFormModal';
import { toast } from 'react-toastify';
import PurchaseCartIconsLabelLink from './PurchaseCartIconsLabelLink';
import PurchasedOrdersIconLabelLink from './PurchasedOrdersIconLabelLink';
import ViewPurchaseCartItemsModal from './ViewPurchaseCartItemsModal';
import PurchaseCartListTable from './PurchaseCartListTable';
import ViewPurchaseOrdersModal from './ViewPurchaseOrdersModal';
import PurchaseOrdersListTable from './PurchaseOrdersListTable';

const PurchaseOrders = ({ purchaseOrdersPage }) => {

    // State variables to view items
    const [itemsData, setItemsData] = useState([]);
    const [purchaseCartData, setPurchaseCartData] = useState([]);
    const [purchaseOrdersData, setPurchaseOrdersData] = useState([]);
    const [item_id, setItemId] = useState('');
    const [selling_price, setSellingPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [purchase_quantity, setPurchaseQuantity] = useState('');
    const total_price = selling_price * purchase_quantity;
    const randomNum = Math.floor(Math.random() * 10000000000);
    const purchase_id = String(randomNum).padStart(10, '0');

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

    // purchase the items
    const handlePurchaseCart = async (e, value) => {
        e.preventDefault();
        setItemId(value._id);
        setSellingPrice(value.selling_price);
        setVendor(value.preferred_vendor.name);
    }

    // handle purchase cart model while closing
    const handlePurchaseCartClose = async () => {
        setItemId('');
        setSellingPrice('');
        setVendor('');
        setPurchaseQuantity('');
    };

    // add the item to purchase cart for purchase
    const addItemsToPurchaseCart = async (e) => {
        try {
            e.preventDefault();
            // checking if item_id, quantity, vendor exists
            if (!item_id || !purchase_quantity || !vendor) {
                toast.error('All Fields Required !!!');
                await handlePurchaseCartClose();
                return;
            } else if (purchase_quantity <= 0) {
                toast.error('Invalid Value !!!');
                await handlePurchaseCartClose();
                return;
            }
            const response = await axios.post('http://localhost:5000/purchase/cart', {
                item_id,
                purchase_quantity,
                total_price
            });
            if (response && response.data.success) {
                toast.success('Items Added to Cart !!!');
                await handlePurchaseCartClose();
                await getPurchaseCart();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch purchase cart items and set to setPurchaseCartData
    const getPurchaseCart = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchase/cart');
            if (response && response.data.success) {
                setPurchaseCartData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // to delete puchase cart items
    const deletePurchaseCart = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.delete(`http://localhost:5000/purchase/cart`, { data: { id: value._id } });
            if (response && response.data.success) {
                toast.success('Deleted Successfully !!!')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // order the items from purchase cart items
    const orderPurchaseItems = async (e, purchaseCartData) => {
        try {
            e.preventDefault();
            // checking is there any items in cart if nothing there errors appears
            if (purchaseCartData.length === 0) {
                toast.error('Nothing to Purchase !!!');
                return;
            }

            // map the array of cart items data
            const itemsToPurchase = purchaseCartData.map((items) => ({
                purchase_id,
                purchase_date: new Date(),
                item_id: items.item_id._id,
                quantity: items.purchase_quantity,
                total: items.purchase_quantity * items.item_id.selling_price,
                purchase_status: 'Confirmed',
                purchased_price_per_item: items.item_id.selling_price,
                delete_purchase_cart_id: items._id
            }));

            // send purchase order details
            const response = await axios.post('http://localhost:5000/purchase/orders', itemsToPurchase);
            if (response && response.data.success) {
                toast.success('Order Placed !!!');
                await getPurchaseOrders();
                await getPurchaseCart();
            }

        } catch (error) {
            console.log(error);
        }
    };

    // fetch purchase orders and set to setPurchaseOrdersData
    const getPurchaseOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchase/orders');
            if (response && response.data.success) {
                setPurchaseOrdersData(response.data.success);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle side-effects while fetching items
    useEffect(() => {
        getItems();
        getPurchaseCart();
        getPurchaseOrders();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* purchase order icon with label link component */}
                <PurchasedOrdersIconLabelLink
                    purchaseOrdersData={purchaseOrdersData}
                />

                {/* purchase cart icons with label link component */}
                <PurchaseCartIconsLabelLink
                    purchaseCartData={purchaseCartData}
                />
            </div>


            {/* items list component */}
            <ItemsList
                itemsListTable={
                    <ItemsListTable
                        itemsData={itemsData}
                        purchaseOrdersPage={purchaseOrdersPage}
                        handlePurchaseCart={handlePurchaseCart}
                    />
                }
            />

            {/* purchase orders from modal component */}
            <PurchaseOrdersFormModal
                purchase_quantity={purchase_quantity}
                total_price={total_price}
                vendor={vendor}
                setPurchaseQuantity={setPurchaseQuantity}
                handlePurchaseCart={handlePurchaseCart}
                handlePurchaseCartClose={handlePurchaseCartClose}
                addItemsToPurchaseCart={addItemsToPurchaseCart}
            />

            {/* view purchase cart items modal component */}
            <ViewPurchaseCartItemsModal
                purchaseCartData={purchaseCartData}
                orderPurchaseItems={orderPurchaseItems}
                purchaseCartListTable={
                    <PurchaseCartListTable
                        purchaseCartData={purchaseCartData}
                        deletePurchaseCart={deletePurchaseCart}
                    />
                }
            />

            {/* view purchase orders model component */}
            <ViewPurchaseOrdersModal
                purchaseOrdersListTable={
                    <PurchaseOrdersListTable
                        purchaseOrdersData={purchaseOrdersData}
                        purchaseOrdersPage={purchaseOrdersPage}
                    />
                }
            />
        </>
    )
}

export default PurchaseOrders