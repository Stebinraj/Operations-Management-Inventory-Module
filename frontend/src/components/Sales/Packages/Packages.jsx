import React, { useEffect, useState } from 'react'
import PackedItemsIconLabelLink from './PackedItemsIconLabelLink'
import axios from 'axios'
import OrdersListTable from '../SalesOrders/OrdersListTable';
import { toast } from 'react-toastify';
import PackedItemsModal from './PackedItemsModal';
import PackedItemsListTable from './PackedItemsListTable';

const Packages = ({ packagesPage }) => {

    // order items data state variable
    const [orderItemsData, setOrderItemsData] = useState([]);
    const [packedItemsData, setPackedItemsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const packed_id = String(randomNum).padStart(10, '0');
    const challan_id = String(randomNum).padStart(10, '0');

    // fetch order items and set to orderItemsData
    const getOrderItems = async () => {
        const response = await axios.get(`http://localhost:5000/salesorders`);
        if (response && response.data.success) {
            setOrderItemsData(response.data.success.filter(items => items.order_status === "Confirmed"))
        }
    }

    // fetch packed items
    const getPackages = async () => {
        const response = await axios.get(`http://localhost:5000/packages`);
        if (response && response.data.success) {
            setPackedItemsData(response.data.success)
        }
    }

    const markAsPacked = async (e, value) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:5000/packages`, {
            package_date: new Date(),
            packed_id,
            order_id: value._id,
            package_status: "Packed"
        });
        if (response && response.data.success) {
            toast.success('Packed Successfully!!!')
            await getOrderItems();
            await getPackages();
        }
    }

    const generateChallans = async (e, value) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:5000/delivery-challans`, {
            order_id: value.order_id._id,
            package_id: value._id,
            challan_id,
            challan_date: new Date(),
            challan_status: "Challans Generated"
        });
        if (response && response.data.success) {
            toast.success('Challans Generated');
            await getPackages();
            await getOrderItems();
        }
    }

    // handle sideeffects while fetching items data, customer data and carts items data
    useEffect(() => {
        getOrderItems();
        getPackages();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* package icon label component */}
                <PackedItemsIconLabelLink
                    packedItemsData={packedItemsData}
                />
            </div>

            <div className="col-12">
                <div className="card card-primary card-outline">
                    {/* orders list table component */}
                    <OrdersListTable
                        orderItemsData={orderItemsData}
                        packagesPage={packagesPage}
                        markAsPacked={markAsPacked}
                    />
                </div>
            </div>

            <PackedItemsModal
                packedItemsListTable={
                    <PackedItemsListTable
                        packedItemsData={packedItemsData}
                        generateChallans={generateChallans}
                    />
                }
            />
        </>
    )
}

export default Packages