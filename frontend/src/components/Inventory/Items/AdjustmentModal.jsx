import React from 'react'

const AdjustmentModal = ({ handleAdjustClose, submitAdjustment, adjustmentForm }) => {
    return (
        <>
            {/* create inventory adjustment form modal*/}
            <div className="modal fade" id="inventoryAdjustModal" tabIndex={-1} aria-labelledby="inventoryAdjustModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Inventory Adjustment</h1>
                            <button type="button" id="closeAdjustmentModalButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleAdjustClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* Adjustment form component */}
                            {adjustmentForm}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleAdjustClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => { submitAdjustment(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* create inventory adjustment form modal*/}
        </>
    )
}

export default AdjustmentModal