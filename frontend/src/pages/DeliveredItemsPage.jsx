import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import DeliveredItems from '../components/Sales/DeliveredItems/DeliveredItems';

const DeliveredItemsPage = () => {

    const deliveredItems = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        deliveredItems={
                            deliveredItems && <DeliveredItems
                                deliveredItemsPage={deliveredItems}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default DeliveredItemsPage