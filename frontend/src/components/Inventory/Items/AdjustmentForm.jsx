import React from 'react'

const AdjustmentForm = ({ handleModeOfAdjustmentChange, setDescription, setQuantity, setReason, setValue, mode_of_adjustment, opening_stock, quantity, selling_price, value, reason, description }) => {
    return (
        <>
            <form className='row'>
                <div className="mb-3 form-group col-12">
                    <span>Mode of Adjustment</span>
                    <select className={mode_of_adjustment.class ? (`form-control ${mode_of_adjustment.class}`) : ('form-control')} value={mode_of_adjustment.mode_of_adjustment} onChange={handleModeOfAdjustmentChange}>
                        <option value="" disabled={true} className='text-secondary'>--Select--</option>
                        <option value={'Quantity'}>Quantity</option>
                        <option value={'Value'}>Value</option>
                    </select>
                    {mode_of_adjustment.feedback && (
                        <>
                            <small className="valid-feedback">{mode_of_adjustment.feedback}</small>
                            <small className="invalid-feedback">{mode_of_adjustment.feedback}</small>
                        </>
                    )}
                </div>
                {mode_of_adjustment.mode_of_adjustment === "Quantity" && (
                    <>
                        <div className="mb-3 form-group col-12">
                            <span>Opening Stock ({opening_stock})</span>
                            <input className={quantity.class ? (`form-control ${quantity.class}`) : ('form-control')} type="text" placeholder='Enter Quantity' onChange={(e) => { setQuantity({ ...quantity, quantity: e.target.value }) }} value={quantity.quantity} />
                            {quantity.feedback && (
                                <>
                                    <small className="valid-feedback">{quantity.feedback}</small>
                                    <small className="invalid-feedback">{quantity.feedback}</small>
                                </>
                            )}
                        </div>
                    </>
                )}
                {mode_of_adjustment.mode_of_adjustment === "Value" && (
                    <>
                        <div className="mb-3 form-group col-12">
                            <span>Selling Price ({selling_price})</span>
                            <input type="text" className={value.class ? (`form-control ${value.class}`) : ('form-control')} placeholder='Enter Value' onChange={(e) => { setValue({ ...value, value: e.target.value }) }} value={value.value} />
                            {value.feedback && (
                                <>
                                    <small className="valid-feedback">{value.feedback}</small>
                                    <small className="invalid-feedback">{value.feedback}</small>
                                </>
                            )}
                        </div>
                    </>
                )}
                <div className="mb-3 form-group col-12">
                    <span>Reason</span>
                    <input type="text" className={reason.class ? (`form-control ${reason.class}`) : ('form-control')} placeholder='Enter Reason' onChange={(e) => { setReason({ ...reason, reason: e.target.value }) }} value={reason.reason} />
                    {reason.feedback && (
                        <>
                            <small className="valid-feedback">{reason.feedback}</small>
                            <small className="invalid-feedback">{reason.feedback}</small>
                        </>
                    )}
                </div>
                <div className="mb-3 form-group col-12">
                    <span>Description</span>
                    <input type="text" className={description.class ? (`form-control ${description.class}`) : ('form-control')} placeholder='Enter Description' onChange={(e) => { setDescription({ ...description, description: e.target.value }) }} value={description.description} />
                    {description.feedback && (
                        <>
                            <small className="valid-feedback">{description.feedback}</small>
                            <small className="invalid-feedback">{description.feedback}</small>
                        </>
                    )}
                </div>
            </form>
        </>
    )
}

export default AdjustmentForm