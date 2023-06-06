import React, { useEffect, useState } from 'react'
import PackedItemsIconLabelLink from './PackedItemsIconLabelLink'
import axios from 'axios'
import OrdersListTable from '../SalesOrders/OrdersListTable';
import { toast } from 'react-toastify';
import PackedItemsModal from './PackedItemsModal';
import PackedItemsListTable from './PackedItemsListTable';
import { v4 as uuidv4 } from 'uuid';

const Packages = ({ packagesPage }) => {

    // order items data state variable
    const [orderItemsData, setOrderItemsData] = useState([]);
    const [packedItemsData, setPackedItemsData] = useState([]);

    // fetch order items and set to orderItemsData
    const getOrderItems = async () => {
        try {
            const response = await axios.get(`/salesorders`);
            if (response && response.data.success) {
                setOrderItemsData(response.data.success.filter(items => items.order_status === "Confirmed"))
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch packed items
    const getPackages = async () => {
        try {
            const response = await axios.get(`/packages`);
            if (response && response.data.success) {
                setPackedItemsData(response.data.success.filter(items => items.order_id.order_status === "Packed"))
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const markAsPacked = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/packages`, {
                package_date: new Date(),
                packed_id:uuidv4().replace(/-/g, ''),
                order_id: value._id,
                package_status: "Packed"
            });
            if (response && response.data.success) {
                toast.success('Packed Successfully!!!')
                await getOrderItems();
                await getPackages();
            }
        } catch (error) {
            console.error(error.message);
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
                        packagesPage={packagesPage}
                        packedItemsData={packedItemsData}
                    />
                }
            />
        </>
    )
}

export default Packages