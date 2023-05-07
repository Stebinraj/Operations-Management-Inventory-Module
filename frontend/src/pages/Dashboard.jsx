import React from 'react'
import Layouts from '../components/Layouts/Layouts'

const Dashboard = () => {

    // pages to render
    const dashboard = true;

    return (
        <>
            {/* layouts components */}
            <Layouts dashboard={dashboard} />
        </>
    )
}

export default Dashboard