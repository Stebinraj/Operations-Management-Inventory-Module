import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import VendorCredit from '../components/Purchase/VendorCredit/VendorCredit';

const VendorCreditPage = () => {

    const vendorCredit = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        vendorCredit={
                            vendorCredit &&
                            <VendorCredit
                                vendorCreditPage={vendorCredit}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default VendorCreditPage