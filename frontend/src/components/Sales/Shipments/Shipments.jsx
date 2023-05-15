import React, { useEffect, useState } from 'react'
import ShipmentsIconLabelLink from './ShipmentsIconLabelLink'
import ChallansListTable from '../DeliveryChallans/ChallansListTable'
import axios from 'axios';

const Shipments = () => {

    const [deliveryChallansData, setDeliveryChallansData] = useState([]);

    // fetch delivery challans and set to deliveryChallansData
    const getDeliveryChallans = async () => {
        const response = await axios.get(`http://localhost:5000/delivery-challans`);
        if (response && response.data.success) {
            setDeliveryChallansData(response.data.success.filter(items => items.package_id.order_id.order_status === "Challans Generated"))
        }
    }

    // handle sideeffects while fetching delivery challans
    useEffect(() => {
        getDeliveryChallans();
    }, []);

    return (
        <>
            <div className="col-12 d-flex justify-content-end mb-2">
                {/* shipments icon label component */}
                <ShipmentsIconLabelLink />
            </div>

            {/* Delivery challans list table component */}
            <div className="card card-primary card-outline">
                <ChallansListTable
                    deliveryChallansData={deliveryChallansData}
                />
            </div>
        </>
    )
}

export default Shipments