import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import ReturnedItems from '../components/Sales/ReturnedItems/ReturnedItems';

const ReturnedItemsPage = () => {

    const returns = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        returns={
                            returns && <ReturnedItems
                                returnedItemsPage={returns}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default ReturnedItemsPage