import React from 'react'
import ItemsGroup from '../components/Inventory/Items-Group/ItemsGroup';
import MainContent from '../components/Layouts/MainContent';
import Layouts from '../components/Layouts/Layouts';

const ItemGroupPage = () => {

    // pages to render
    const itemGroup = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        itemGroup={
                            itemGroup && <ItemsGroup />
                        }
                    />
                }
            />
        </>
    )
}

export default ItemGroupPage