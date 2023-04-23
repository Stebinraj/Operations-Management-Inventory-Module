import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ItemsGroup from '../Inventory/Items-Group/ItemsGroup'
import ViewItems from '../Inventory/Items/ViewItems'

const MainContent = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {props.dashboard && (<Dashboard />)}
                    {props.itemGroup && (<ItemsGroup />)}
                    {props.items && (<ViewItems />)}
                </div>
            </div>
        </>
    )
}

export default MainContent