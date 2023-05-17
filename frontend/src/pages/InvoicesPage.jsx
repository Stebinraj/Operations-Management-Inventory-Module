import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import Invoices from '../components/Sales/Invoices/Invoices';

const InvoicesPage = () => {

    const invoices = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        invoices={
                            invoices && <Invoices
                                invoicesPage={invoices}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default InvoicesPage