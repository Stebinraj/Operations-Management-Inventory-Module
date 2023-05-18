import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import SalesReturns from '../components/Sales/SalesReturns/SalesReturns';

const SalesReturnsPage = () => {

    const salesReturns = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        salesReturns={
                            salesReturns &&
                            <SalesReturns
                                salesReturnsPage={salesReturns}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default SalesReturnsPage