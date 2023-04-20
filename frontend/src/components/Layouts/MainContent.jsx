import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ItemsGroup from '../Inventory/Items-Group/ItemsGroup'

const MainContent = (props) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {props.dashboard && (<Dashboard />)}
                    {props.itemGroup && (<ItemsGroup />)}
                </div>
            </div>
        </>
    )
}

export default MainContent