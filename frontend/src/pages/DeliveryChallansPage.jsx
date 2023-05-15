import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import MainContent from '../components/Layouts/MainContent'
import DeliveryChallans from '../components/Sales/DeliveryChallans/DeliveryChallans'

const DeliveryChallansPage = () => {

    const deliveryChallans = true

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        deliveryChallans={
                            deliveryChallans && <DeliveryChallans />
                        }
                    />
                }
            />
        </>
    )
}

export default DeliveryChallansPage