import React from 'react'
import Layouts from '../components/Layouts/Layouts'

const Dashboard = () => {

    const dashboard = true;

    return (
        <>
            <Layouts dashboard={dashboard} />
        </>
    )
}

export default Dashboard