import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import Shipments from '../components/Sales/Shipments/Shipments';

const ShipmentsPage = () => {

    // pages to render
    const shipments = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        shipments={
                            shipments &&
                            <Shipments
                                shipmentsPage={shipments}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default ShipmentsPage