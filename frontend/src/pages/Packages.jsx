import React from 'react'
import Layouts from '../components/Layouts/Layouts';

const Packages = () => {
    // pages to render
    const packages = true;

    return (
        <>
            {/* layouts components */}
            <Layouts packages={packages} />
        </>
    )
}

export default Packages