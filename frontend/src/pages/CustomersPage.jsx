import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import MainContent from '../components/Layouts/MainContent'
import Customers from '../components/Sales/Customers/Customers';

const CustomersPage = () => {

    // pages to render
    const customers = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        customers={
                            customers && <Customers />
                        }
                    />
                }
            />
        </>
    )
}

export default CustomersPage