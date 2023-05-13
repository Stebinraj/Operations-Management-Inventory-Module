import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import ViewItems from '../components/Inventory/Items/ViewItems';

const ItemsPage = () => {
    // pages to render
    const items = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        items={
                            items &&
                            <ViewItems
                                itemsPage={items}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default ItemsPage