import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import Bills from '../components/Purchase/Bills/Bills';

const BillsPage = () => {

    const bills = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        bills={
                            bills &&
                            <Bills
                                billsPage={bills}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default BillsPage