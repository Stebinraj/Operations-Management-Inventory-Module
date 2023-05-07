import React from 'react'
import Layouts from '../components/Layouts/Layouts'

const ItemsGroup = () => {

    // pages to render
    const itemGroup = true;

    return (
        <>
            {/* layouts components */}
            <Layouts itemGroup={itemGroup} />
        </>
    )
}

export default ItemsGroup