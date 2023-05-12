import React from 'react'
import AdjustmentForm from './AdjustmentForm'

const AdjustmentModal = ({ handleAdjustClose, handleModeOfAdjustmentChange, setDescription, setQuantity, setReason, setValue, mode_of_adjustment, opening_stock, quantity, selling_price, value, reason, description, submitAdjustment }) => {
    return (
        <>
            {/* create inventory adjustment form modal*/}
            <div className="modal fade" id="inventoryAdjustModal" tabIndex={-1} aria-labelledby="inventoryAdjustModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Inventory Adjustment</h1>
                        </div>
                        <div className="modal-body">
                            {/* Adjustment form component */}
                            <AdjustmentForm
                                handleModeOfAdjustmentChange={handleModeOfAdjustmentChange}
                                setDescription={setDescription}
                                setQuantity={setQuantity}
                                setReason={setReason}
                                setValue={setValue}
                                mode_of_adjustment={mode_of_adjustment}
                                opening_stock={opening_stock}
                                quantity={quantity}
                                selling_price={selling_price}
                                value={value}
                                reason={reason}
                                description={description}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleAdjustClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { submitAdjustment(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* create inventory adjustment form modal*/}
        </>
    )
}

export default AdjustmentModal