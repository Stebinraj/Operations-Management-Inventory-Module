import React from 'react'
import Layouts from '../components/Layouts/Layouts';

const Customers = () => {

    // pages to render
    const customers = true;

    return (
        <>
            {/* layouts components */}
            <Layouts customers={customers} />
        </>
    )
}

export default Customers