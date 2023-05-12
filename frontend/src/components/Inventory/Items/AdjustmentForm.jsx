import React from 'react'

const AdjustmentForm = ({ handleModeOfAdjustmentChange, setDescription, setQuantity, setReason, setValue, mode_of_adjustment, opening_stock, quantity, selling_price, value, reason, description }) => {
    return (
        <>
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
                            <input type="number" className="form-control" placeholder='Enter Quantity' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                        </div>
                    </>
                )}
                {mode_of_adjustment === "Value" && (
                    <>
                        <div className="mb-3 form-group col-12">
                            <span>Selling Price ({selling_price})</span>
                            <input type="number" className="form-control" placeholder='Enter Value' onChange={(e) => { setValue(e.target.value) }} value={value} />
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
        </>
    )
}

export default AdjustmentForm