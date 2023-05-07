import React from 'react'
import Layouts from '../components/Layouts/Layouts';

const Items = () => {

    // pages to render
    const items = true;

    return (
        <>
            {/* layouts components */}
            <Layouts items={items} />
        </>
    )
}

export default Items