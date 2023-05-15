import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import Packages from '../components/Sales/Packages/Packages';
import MainContent from '../components/Layouts/MainContent';

const PackagesPage = () => {

    // pages to render
    const packages = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        packages={
                            packages &&
                            <Packages />
                        }
                    />
                }
            />
        </>
    )
}

export default PackagesPage