import React from 'react'

const PackedItemsModal = ({ packedItemsListTable }) => {
    return (
        <>
            {/* packed items modal */}
            <div className="modal fade" id="packedItems" tabIndex={-1} aria-labelledby="packedItemsLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog" style={{ maxWidth: '100%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Packed Items</h1>
                        </div>
                        <div className="modal-body">
                            <div className="card card-primary card-outline">
                                {/* Packed items list table Component */}
                                {packedItemsListTable}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { orderItems(e, cartItemsData) }}>Order</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* packed items modal */}
        </>
    )
}

export default PackedItemsModal