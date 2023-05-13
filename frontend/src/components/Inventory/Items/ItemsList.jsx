import React from 'react'

const ItemsList = ({ itemsListTable }) => {

    return (
        <>
            {/* view items list */}
            <div className="col-sm-12">
                <div className="card card-primary card-outline">
                    {/* items List Table Components */}
                    {itemsListTable}
                </div>
            </div>
            {/* view items list */}
        </>
    )
}

export default ItemsList