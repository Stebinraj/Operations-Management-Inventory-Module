import React from 'react'

const AdjustmentModal = ({ handleAdjustClose, handleModeOfAdjustmentChange, setDescription, setQuantity, setReason, setValue, mode_of_adjustment, opening_stock, quantity, selling_price, value, reason, description, submitAdjustment }) => {
    return (
        <>
            <div className="modal fade" id="inventoryAdjustModal" tabIndex={-1} aria-labelledby="inventoryAdjustModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Inventory Adjustment</h1>
                        </div>
                        <div className="modal-body">
                            <form className='row'>
                                <div className="mb-3 form-group col-12">
                                    <span>Mode of Adjustment</span>
                                    <select className="form-control" value={mode_of_adjustment} onChange={handleModeOfAdjustmentChange}>
                                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                                        <option value={'Quantity'}>Quantity</option>
                                        <option value={'Value'}>Value</option>
                                    </select>
                                </div>
                                {mode_of_adjustment === "Quantity" && (
                                    <>
                                        <div className="mb-3 form-group col-12">
                                            <span>Opening Stock ({opening_stock})</span>
                                            <input type="number" className="form-control" placeholder='Enter Quantity' onChange={(e) => { setQuantity(e.target.value); setValue('') }} value={quantity} />
                                        </div>
                                    </>
                                )}
                                {mode_of_adjustment === "Value" && (
                                    <>
                                        <div className="mb-3 form-group col-12">
                                            <span>Selling Price ({selling_price})</span>
                                            <input type="number" className="form-control" placeholder='Enter Value' onChange={(e) => { setValue(e.target.value); setQuantity("") }} value={value} />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3 form-group col-12">
                                    <span>Reason</span>
                                    <input type="text" className="form-control" placeholder='Enter Reason' onChange={(e) => { setReason(e.target.value) }} value={reason} />
                                </div>
                                <div className="mb-3 form-group col-12">
                                    <span>Description</span>
                                    <input type="text" className="form-control" placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleAdjustClose}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { submitAdjustment(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdjustmentModal