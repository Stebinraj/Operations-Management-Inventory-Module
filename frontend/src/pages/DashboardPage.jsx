import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = () => {

    // pages to render
    const dashboard = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        dashboard={
                            dashboard && <Dashboard
                                dashboardPage={dashboard}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default DashboardPage