import React, { useEffect, useState } from 'react'
import ShipmentsListTable from '../Shipments/ShipmentsListTable'
import axios from 'axios';
import DeliveredIconsLabelLink from './DeliveredIconsLabelLink';
import { toast } from 'react-toastify';
import DeliveredItemsModal from './DeliveredItemsModal';
import DeliveredItemsListTable from './DeliveredItemsListTable';

const DeliveredItems = ({ deliveredItemsPage }) => {

    const [shipmentsData, setShipmentsData] = useState([]);
    const [deliveredItemsData, setDeliveredItemsData] = useState([]);
    const randomNum = Math.floor(Math.random() * 10000000000);
    const delivered_id = String(randomNum).padStart(10, '0');

    const getShipments = async () => {
        try {
            const response = await axios.get(`/shipments`);
            if (response && response.data.success) {
                setShipmentsData(response.data.success.filter(items => items.delivery_challans_id.package_id.order_id.order_status === "Shipped"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // mark a shipped items as delivered
    const markAsDelivered = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/delivered/items`, {
                delivery_date: new Date(),
                delivered_id,
                shipments_id: await value._id,
                order_id: await value.delivery_challans_id.package_id.order_id._id,
                delivery_status: 'Delivered'
            });
            if (response && response.data.success) {
                toast.success('Order Delivered !!!');
                await getShipments();
                await getDeliveredItemsData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // fetch delivered items data and set to deliveredItemsData
    const getDeliveredItemsData = async () => {
        try {
            const response = await axios.get(`/delivered/items`);
            if (response && response.data.success) {
                setDeliveredItemsData(response.data.success.filter(items => items.shipments_id.delivery_challans_id.package_id.order_id.order_status === "Delivered"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle sideeffects while fetching shipments
    useEffect(() => {
        getShipments();
        getDeliveredItemsData();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* delivered icon label component */}
                <DeliveredIconsLabelLink
                    deliveredItemsData={deliveredItemsData}
                />
            </div>


            <div className="card card-primary card-outline">
                {/* shipment items list table component */}
                <ShipmentsListTable
                    shipmentsData={shipmentsData}
                    deliveredItemsPage={deliveredItemsPage}
                    markAsDelivered={markAsDelivered}
                />
            </div>

            {/* delivvered item modal component */}
            <DeliveredItemsModal
                deliveredItemsListTable={
                    <DeliveredItemsListTable
                        deliveredItemsPage={deliveredItemsPage}
                        deliveredItemsData={deliveredItemsData}
                    />
                }
            />
        </>
    )
}

export default DeliveredItems