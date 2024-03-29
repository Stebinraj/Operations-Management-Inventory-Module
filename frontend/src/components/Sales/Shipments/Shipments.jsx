import React, { useEffect, useState } from 'react'
import ShipmentsIconLabelLink from './ShipmentsIconLabelLink'
import ChallansListTable from '../DeliveryChallans/ChallansListTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import ShipmentsModal from './ShipmentsModal';
import ShipmentsListTable from './ShipmentsListTable';
import { v4 as uuidv4 } from 'uuid';

const Shipments = ({ shipmentsPage }) => {

    const [deliveryChallansData, setDeliveryChallansData] = useState([]);
    const [shipmentsData, setShipmentsData] = useState([]);

    // fetch delivery challans and set to deliveryChallansData
    const getDeliveryChallans = async () => {
        try {
            const response = await axios.get(`/delivery-challans`);
            if (response && response.data.success) {
                setDeliveryChallansData(response.data.success.filter(items => items.package_id.order_id.order_status === "Challans Generated"))
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // after challans generated these functions used in shipments page
    const markAsShipped = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/shipments`, {
                delivery_challans_id: await value._id,
                order_id: await value.package_id.order_id._id,
                shipment_date: new Date(),
                shipped_id:uuidv4().replace(/-/g, ''),
                shipping_status: 'Shipped'
            });
            if (response && response.data.success) {
                toast.success('Package Shipped !!!');
                await getDeliveryChallans();
                await getShipments();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const getShipments = async () => {
        try {
            const response = await axios.get(`/shipments`);
            if (response && response.data.success) {
                setShipmentsData(response.data.success.filter(items => items.delivery_challans_id.package_id.order_id.order_status === "Shipped"));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle sideeffects while fetching delivery challans
    useEffect(() => {
        getDeliveryChallans();
        getShipments();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* shipments icon label component */}
                <ShipmentsIconLabelLink
                    shipmentsData={shipmentsData}
                />
            </div>

            {/* Delivery challans list table component */}
            <div className="card card-primary card-outline">
                <ChallansListTable
                    deliveryChallansData={deliveryChallansData}
                    shipmentsPage={shipmentsPage}
                    markAsShipped={markAsShipped}
                />
            </div>

            {/* shipments modal component */}
            <ShipmentsModal
                shipmentsListTable={
                    <ShipmentsListTable
                        shipmentsData={shipmentsData}
                        shipmentsPage={shipmentsPage}
                    />
                }
            />
        </>
    )
}

export default Shipments