import React from 'react'
import ItemsListTable from './ItemsListTable'

const ItemsList = ({ handleAdjust, itemsData, itemsPage, salesOrderPage, handleCart }) => {

    return (
        <>
            {/* view items list */}
            <div className="col-sm-12">
                <div className="card card-primary card-outline">
                    {/* items List Table Components */}
                    <ItemsListTable
                        handleAdjust={handleAdjust}
                        itemsData={itemsData}
                        itemsPage={itemsPage}
                        salesOrderPage={salesOrderPage}
                        handleCart={handleCart}
                    />
                </div>
            </div>
            {/* view items list */}
        </>
    )
}

export default ItemsList