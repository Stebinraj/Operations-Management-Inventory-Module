import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChallansListTable from './ChallansListTable';
import PackedItemsListTable from '../Packages/PackedItemsListTable';
import { toast } from 'react-toastify';
import DeliveryChallansIconLabelLink from './DeliveryChallansIconLabelLink';
import DeliveryChallansModal from './DeliveryChallansModal';
import { v4 as uuidv4 } from 'uuid';

const DeliveryChallans = ({ deliveryChallansPage }) => {

    const [deliveryChallansData, setDeliveryChallansData] = useState([]);
    const [packedItemsData, setPackedItemsData] = useState([]);

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

    const generateChallans = async (e, value) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/delivery-challans`, {
                order_id: value.order_id._id,
                package_id: value._id,
                challan_id: uuidv4().replace(/-/g, ''),
                challan_date: new Date(),
                challan_status: "Challans Generated"
            });
            if (response && response.data.success) {
                toast.success('Challans Generated');
                await getPackages();
                await getDeliveryChallans();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // handle sideeffects while fetching delivery challans
    useEffect(() => {
        getDeliveryChallans();
        getPackages();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* deliver challans icon label component */}
                <DeliveryChallansIconLabelLink
                    deliveryChallansData={deliveryChallansData}
                />
            </div>

            <div className="card card-primary card-outline">
                {/* packed items list table component */}
                <PackedItemsListTable
                    packedItemsData={packedItemsData}
                    deliveryChallansPage={deliveryChallansPage}
                    generateChallans={generateChallans}
                />
            </div>

            <DeliveryChallansModal
                deliveryChallansListTable={
                    <ChallansListTable
                        deliveryChallansData={deliveryChallansData}
                        deliveryChallansPage={deliveryChallansPage}
                    />
                }
            />
        </>
    )
}

export default DeliveryChallans