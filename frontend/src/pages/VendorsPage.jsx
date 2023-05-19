import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import Vendors from '../components/Purchase/Vendors/Vendors';

const VendorsPage = () => {

    const vendors = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        vendors={
                            vendors &&
                            <Vendors />
                        }
                    />
                }
            />
        </>
    )
}

export default VendorsPage